import { indexSlice } from "./indexSlice";

export const provinceAPIs = indexSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getProvince: bulider.query({
      query: (data) => ({
        url: "/branch/get-province",
        method: "GET",
      }),
      providesTags:["province"]
    }),
   
})
});

export const { useGetProvinceQuery } = provinceAPIs;