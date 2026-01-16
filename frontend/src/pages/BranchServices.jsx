import { useLocation } from "react-router-dom";
const BranchServices = () => {
  const { state } = useLocation();
  const branchId = state.branchId;
  console.log(branchId);



  /// useGetServicesbyBranchId(branchId)
  

  return <div>Branch Services will show here </div>;
};
export default BranchServices;
