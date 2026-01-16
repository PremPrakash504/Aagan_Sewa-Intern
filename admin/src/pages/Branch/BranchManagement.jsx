import { useState } from "react";
import Select from "../../components/shared/Select";
import { useGetBranchQuery } from "../../redux/features/branchSlice";
import DetailsModal from "../../components/shared/Modal";



const BranchManagement = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const{data:branch, isLoading} = useGetBranchQuery();
  console.log(branch);
  if(isLoading){
    return <div>Loading...</div>;
  }
  const data = branch.data || [];
  const actionOptions = [
    { value: "Delete-Branch", label: "Delete-Branch" },
    { value: "view-Services", label: "View-Services" },
  ];
   const handleActionChange = (e, branch) => {
    const action = e.target.value;
    if (action == "view-Services") {
      setSelectedBranch(branch.branch_id);
      setShowModel(true);
    }
    e.target.value = "";
  };
  return (
    <>
    <div className="w-full bg-white shadow rounded-lg overflow-hidden">
      <div className="text-xl pb-7 font-bold">
        <h1>Branches List</h1>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              S.N
            </th>
            
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              District Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Branch Id
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Branch Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.branch_id} className="border-b hover:bg-gray-50">
    
              <td className="px-4 py-3 text-sm text-slate-600">{index + 1}</td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.district_name}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.branch_id}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.branch_name}
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
       
       >

      </DetailsModal>
    </>
  );
};

export default BranchManagement;