import { useState } from "react";
import Select from "../../components/shared/Select";
import {
  useAddBranchManagerMutation,
  useDeletebranchManagerMutation,
  useGetbranchManagerQuery,
} from "../../redux/features/managerSlice";
import DetailsModal from "../../components/shared/Modal";
import { useGetProvinceQuery } from "../../redux/features/provinceSlice";
import { useGetDistrictQuery } from "../../redux/features/districtSlice";
import Input from "../../components/shared/Input";
import { useGetPDBQuery } from "../../redux/features/branchSlice";
import { toast } from "react-toastify";
const ManagerManagement = () => {
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [editingManager, setEditingManager] = useState(null);
  const [deletingManager, setDeletingManager] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);

  const { data: manager, isLoading } = useGetbranchManagerQuery();

  const { data: provinces } = useGetProvinceQuery();
  const [addBranchManager] = useAddBranchManagerMutation();
  const [deletebranchManager] = useDeletebranchManagerMutation();
  const { data: districts } = useGetPDBQuery(
    { province_id: selectedProvince },
    { skip: !selectedProvince }
  );

  const { data: branch } = useGetPDBQuery(
    { district_id: selectedDistrict },
    { skip: !selectedDistrict }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const provinceOptions =
    provinces?.data?.map((p) => ({
      value: p.province_id,
      label: p.province_name,
    })) || [];

  const districtOptions =
    districts?.data?.map((d) => ({
      value: d.district_id,
      label: d.district_name,
    })) || [];

  const branchOptions =
    branch?.data?.map((b) => ({
      value: b.branch_id,
      label: b.branch_name,
    })) || [];

  const managers = manager?.data || [];

  const actionOptions = [
    { value: "Delete", label: "Delete" },
    { value: "Edit", label: "Edit" },
  ];
  const handleEdit = (manager) => {
    setShowModal(true);
    setEditingManager(manager);
    setFormData({
      email: manager.email,
    });
    setSelectedProvince(manager.province_id);
    setSelectedDistrict(manager.district_id);
    setSelectedBranch(manager.branch_id);
  };
  const handleActionChange = (e, manager) => {
    const action = e.target.value;
    if (action == "Edit") {
      handleEdit(manager);
    } else if (action == "Delete") {
      setShowDeleteModal(true);
      setDeletingManager(manager);
    }
    e.target.value = "";
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBranchManager({
        branch_id: selectedBranch,
        email: formData.email,
        password: formData.password,
      }).unwrap();
      setShowModal(false);
      setFormData({
        email: "",
        password: "",
      });
      setSelectedProvince(null);
      setSelectedDistrict(null);
      setSelectedBranch(null);
    } catch (error) {
      console.error("Failed to add manager:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const result = await deletebranchManager(
        deletingManager.user_id
      ).unwrap();
      toast.success(result.message || "Manager delete successfully");
      setShowDeleteModal(false);
      setDeletingManager(null);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete manager");
    }
  };

  return (
    <>
      <div>
        <div className="w-full bg-white shadow rounded-lg overflow-hidden">
          <div className="text-xl pb-7 font-bold flex justify-between">
            <h1>Managers List</h1>
            <button
              onClick={() => {
                setShowModal(true);
                setEditingManager(null);
                setFormData({
                  email: "",
                  password: "",
                });
                setSelectedProvince("");
                setSelectedDistrict("");
                setSelectedBranch("");
              }}
              className="bg-blue-600 text-white px-2 py-1 text-xs rounded-lg hover:bg-blue-700 ml-4 mr-4"
            >
              Add New Manager
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  S.N
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Branch ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {managers.map((item, index) => (
                <tr
                  key={item.manager_id || `manager-${index}`}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {item.branch_id}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {item.email}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Select
                      options={actionOptions}
                      placeholder="Action"
                      onChange={(e) => handleActionChange(e, item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={editingManager ? "Edit Manager" : "Add Branch Manager"}
        size="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-3">
                  Province
                </label>
                <div className="w-full">
                  <Select
                    options={provinceOptions}
                    value={selectedProvince}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      setSelectedBranch("");
                    }}
                    placeholder="Select Province"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  District
                </label>
                <div className="w-full">
                  <Select
                    options={districtOptions}
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedBranch("");
                    }}
                    placeholder="Select District"
                    disabled={!selectedProvince}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Branch</label>
                <div className="w-full">
                  <Select
                    options={branchOptions}
                    value={selectedBranch}
                    onChange={(e) => {
                      setSelectedBranch(e.target.value);
                    }}
                    placeholder="Select Branch"
                    disabled={!selectedDistrict}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input
                  label="Email"
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Input
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Add Manager
              </button>
            </div>
          </div>
        </form>
      </DetailsModal>
      <DetailsModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Manager"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure wants to delete manager?{""}
            <strong>{deletingManager?.email}</strong>
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded  hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </DetailsModal>
    </>
  );
};

export default ManagerManagement;
