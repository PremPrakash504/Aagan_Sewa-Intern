import { indexSlice } from "./indexSlice";

export const managerAPIs = indexSlice.injectEndpoints({
  endpoints: (bulider) => ({
    getbranchManager: bulider.query({
      query: (data) => ({
        url: "/auth/get-branchManager",
        method: "GET",
      }),
      providesTags: ["manager"],
    }),
    addBranchManager: bulider.mutation({
      query: (data) => ({
        url: "/auth/add-branchManager",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["manager"],
    }),
    deletebranchManager: bulider.mutation({
      query: (user_id) => ({
        url: `/auth/delete-branchManager/${user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["manager"],
    }),
  }),
});

export const {
  useGetbranchManagerQuery,
  useAddBranchManagerMutation,
  useDeletebranchManagerMutation,
} = managerAPIs;
