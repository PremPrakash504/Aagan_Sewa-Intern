import { useState } from "react";
import DetailsModal from "../../components/shared/Modal";
import Select from "../../components/shared/Select";
import { useGetDistrictQuery } from "../../redux/features/districtSlice";


const DistrictManagement = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const{data:district, isLoading} = useGetDistrictQuery();
  if(isLoading){
    return <div>Loading...</div>;
  }
  const data = district.data || [];
  
  const actionOptions = [
    { value: "Delete-District", label: "Delete-District" },
    { value: "View-Branch", label: "View-Branch" },
  ];
    const handleActionChange = (e, district) => {
    const action = e.target.value;
    if (action == "View-Branch") {
      setSelectedDistrict(district);
      setShowModel(true);
    }
    e.target.value = "";
  };
  return (
    <>
    <div className="w-full bg-white shadow rounded-lg overflow-hidden">
      <div className="text-xl pb-7 font-bold">
        <h1>Districts List</h1>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              S.N
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              District ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              District Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.district_id} className="border-b hover:bg-gray-50">
    
              <td className="px-4 py-3 text-sm text-slate-600">{index + 1}</td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.district_id}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.district_name}
              </td>
              <td className="px-4 py-3 text-sm">
                <Select
                  options={actionOptions}
                  placeholder="Action"
                  onChange={(e) => handleActionChange(e,item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <DetailsModal
       show={showModel}
       onClose={()=>setShowModel(false)}
        title={`Branch in ${selectedDistrict?.district_name}`}
        size="lg"
      >
        <div className="space-y-2">
          {selectedDistrict?.branch_name ? (
            selectedDistrict.branch_name
              .split(",")
              .map((branch, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded">
                  <span className="font-medium">{branch}</span>
                </div>
              ))
          ) : (
            <div>No branch Found</div>
          )}
        </div>
      </DetailsModal>
    </>
  );
};

export default DistrictManagement;