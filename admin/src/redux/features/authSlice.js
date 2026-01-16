import { indexSlice } from "./indexSlice";

export const authAPIs = indexSlice.injectEndpoints({
  endpoints: (bulider) => ({
    login: bulider.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    signout: bulider.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    verifyToken: bulider.query({
      query: () => ({
        url: "/auth/verifyToken",
        method: "GET",
      }),
      invalidatesTags: ["auth"],
    }),
    
  }),
});

export const { useLoginMutation, useSignoutMutation, useVerifyTokenQuery } =
  authAPIs;
