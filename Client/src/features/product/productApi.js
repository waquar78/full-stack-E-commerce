// services/productApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1/product',
    credentials: 'include', // for cookies (JWT)
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // ========================= CREATE PRODUCT =========================
    createProduct: builder.mutation({
      query: (productData) => ({
        url: '/',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Product'],
    }),

    // ========================= GET ALL PRODUCTS =========================
    getAllProducts: builder.query({
      query: () => '/',
      providesTags: ['Product'],
    }),

    // ========================= GET MY PRODUCTS =========================
    getMyProducts: builder.query({
      query: () => '/my-products',
      providesTags: ['Product'],
    }),

    // ========================= GET SINGLE PRODUCT =========================
    getSingleProduct: builder.query({
      query: (id) => `/${id}`,
    }),

    // ========================= UPDATE PRODUCT =========================
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    // ========================= DELETE PRODUCT =========================
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    // ========================= GET FILTERED PRODUCTS =========================
    getFilteredProducts: builder.query({
      query: (params) => {
        const { keyword, category, minPrice, maxPrice, page, limit } = params;
        let url = `/filtered?`;
        if (keyword) url += `keyword=${keyword}&`;
        if (category) url += `category=${category}&`;
        if (minPrice) url += `minPrice=${minPrice}&`;
        if (maxPrice) url += `maxPrice=${maxPrice}&`;
        if (page) url += `page=${page}&`;
        if (limit) url += `limit=${limit}&`;
        return url;
      },
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetMyProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetFilteredProductsQuery,
} = productApi;
