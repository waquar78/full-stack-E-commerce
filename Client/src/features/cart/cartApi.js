// features/cart/cartApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_CART_URL,
    credentials: "include",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({

    getCart: builder.query({
      query: () => "/my-cart", 
      providesTags: ["Cart"], 
    }),

    addToCart: builder.mutation({
      query: (data) => ({
        url: "/addToCart",       
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (data) => ({
        url: "/removeFromCart",   
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartQuantity: builder.mutation({
      query: (data) => ({
        url: "/updateQuantity",  
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    emptyCart: builder.mutation({
      query: () => ({
        url: "/empty",          
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    
    checkout: builder.mutation({
      query: () => ({
        url: "/checkout",      
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
 