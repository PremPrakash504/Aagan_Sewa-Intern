import { indexSlice } from "./indexSlice";

export const branchAPIs = indexSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getBranch: bulider.query({
      query: (data) => ({
        url: "/branch/get-branch",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),

    getPDB: bulider.query({
      query: ({ province_id, district_id }) => ({
        url: `/branch/pdb?${province_id ? `province_id=${province_id}` : ""}${
          district_id ? `district_id=${district_id}` : ""
        }`,
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
  }),
});

export const { useGetBranchQuery, useGetPDBQuery } = branchAPIs;
