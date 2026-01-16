import { indexSlice } from "./indexSlice";

export const districtAPIs = indexSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getDistrict: bulider.query({
      query: (data) => ({
        url: "/branch/get-district",
        method: "GET",
      }),
      providesTags:["district"]
    }),
   
})
});

export const { useGetDistrictQuery } = districtAPIs;
