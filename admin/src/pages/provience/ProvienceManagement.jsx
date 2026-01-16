import { use } from "react";
import Select from "../../components/shared/Select";
import { useGetProvinceQuery } from "../../redux/features/provinceSlice";
import { useState } from "react";
import DetailsModal from "../../components/shared/Modal";

const ProvinceManagement = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [showModel, setShowModel] = useState(false);

  const { data: province, isLoading } = useGetProvinceQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const data = province.data || [];
  

  const actionOptions = [
    { value: "Delete-Province", label: "Delete-Province" },
    { value: "View-Districts", label: "View-Districts" },
  ];
  const handleActionChange = (e, province) => {
    const action = e.target.value;
    if (action == "View-Districts") {
      setSelectedProvince(province);
      setShowModel(true);
    }
    e.target.value = "";
  };

  return (
    <>
      <div className="w-full bg-white shadow rounded-lg overflow-hidden">
        <div className="text-xl pb-7 font-bold">
          <h1>Provinces List</h1>
        </div>
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                S.N
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.province_id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-slate-600">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {item.province_id}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {item.province_name}
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
      <DetailsModal
        show={showModel}
        onClose={() => setShowModel(false)}
        title={`Districts in ${selectedProvince?.province_name}`}
        size="lg"
      >
        <div className="space-y-2">
          {selectedProvince?.district_name ? (
            selectedProvince.district_name
              .split(",")
              .map((district, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded">
                  <span className="font-medium">{district}</span>
                </div>
              ))
          ) : (
            <div>No district Found</div>
          )}
        </div>
      </DetailsModal>
    </>
  );
};

export default ProvinceManagement;
