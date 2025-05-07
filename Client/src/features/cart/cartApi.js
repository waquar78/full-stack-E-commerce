// features/cart/cartApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/cart",
    credentials: "include",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({

    getCart: builder.query({
      query: () => "/my-cart",  // ✅ as per backend
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (data) => ({
        url: "/addToCart",       // ✅ match backend
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (data) => ({
        url: "/removeFromCart",   // ✅ match backend
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartQuantity: builder.mutation({
      query: (data) => ({
        url: "/updateQuantity",  // ✅ match backend
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    emptyCart: builder.mutation({
      query: () => ({
        url: "/empty",          // ✅ match backend
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Optional: agar tum checkout feature implement karoge
    checkout: builder.mutation({
      query: () => ({
        url: "/checkout",      // ✅ only if you create this route in backend
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),

  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useEmptyCartMutation,
  useCheckoutMutation,
} = cartApi;
