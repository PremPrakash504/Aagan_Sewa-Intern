import { indexSlice } from "./indexSlice";
export const districtAPIs = indexSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getDistrict: bulider.query({
      query: () => ({
        url: "/branch/get-district",
        method: "GET",
      }),
      providesTags: ["district"],
    }),
    getBranchesByDistrict: bulider.query({
      query: (district_id) => ({
        url: `/branch/get-branches/${district_id}`,
        method: "GET",
      }),
      providesTags: ["branches"],
    }),
  }),
});

export const { useGetDistrictQuery, useGetBranchesByDistrictQuery } =
  districtAPIs;
