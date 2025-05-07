import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1/upload",
    credentials:"include"
   }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadApi;
