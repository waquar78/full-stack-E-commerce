import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_WISH_URL,
    credentials: "include",
  }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "/",
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: "/add",
        method: "POST", 
        body: { productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: "/remove",
        method: "DELETE",
        body: { productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
 