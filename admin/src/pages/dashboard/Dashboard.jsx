import { useGetProvinceQuery } from "../../redux/features/provinceSlice";
import { useGetDistrictQuery } from "../../redux/features/districtSlice";
import { useGetBranchQuery } from "../../redux/features/branchSlice";
import { useGetbranchManagerQuery } from "../../redux/features/managerSlice";

const DashboardManagement = () => {
  const { data: provinces } = useGetProvinceQuery();
  const { data: districts } = useGetDistrictQuery();
  const { data: branches } = useGetBranchQuery();
  const { data: managers } = useGetbranchManagerQuery();

  const provinceCount = provinces?.data?.length || 0;
  const districtCount = districts?.data?.length || 0;
  const branchCount = branches?.data?.length || 0;
  const managerCount = managers?.data?.length || 0;
  return (
    <div className="w-full">

      {/* Container lai max-width rakheko */}
      <div className="max-w-5xl mx-auto px-0">
        
        

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

          {/* Province */}
          <div className="bg-blue-500 text-white rounded-xl px-6 py-12 shadow-md
                          transform transition duration-300 hover:-translate-y-1 hover:scale-105">
            <p className="text-base opacity-80">Total Provinces</p>
            <h2 className="text-4xl font-bold mt-6">{provinceCount}</h2>
          </div>

          {/* District */}
          <div className="bg-green-500 text-white rounded-xl px-6 py-12 shadow-md
                          transform transition duration-300 hover:-translate-y-1 hover:scale-105">
            <p className="text-base opacity-80">Total Districts</p>
            <h2 className="text-4xl font-bold mt-6">{districtCount}</h2>
          </div>

          {/* Branch */}
          <div className="bg-purple-500 text-white rounded-xl px-6 py-12 shadow-md
                          transform transition duration-300 hover:-translate-y-1 hover:scale-105">
            <p className="text-base opacity-80">Total Branches</p>
            <h2 className="text-4xl font-bold mt-6">{branchCount}</h2>
          </div>

          {/* Manager */}
          <div className="bg-orange-500 text-white rounded-xl px-6 py-12 shadow-md
                          transform transition duration-300 hover:-translate-y-1 hover:scale-105">
            <p className="text-base opacity-80">Total Managers</p>
            <h2 className="text-4xl font-bold mt-6">{managerCount}</h2>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardManagement;
