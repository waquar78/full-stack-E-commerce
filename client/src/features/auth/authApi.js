//  UPDATED authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser, userLogout } from '@/redux/slices/AuthSlice';

const USER_API = import.meta.env.VITE_AUTH_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: 'include',
  }),
  tagTypes: ['User'], // Add tagTypes
  endpoints: (builder) => ({ 

    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      }
    }),

    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      }
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET"
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLogout());
        } catch (error) {
          console.log(error);
        }
      }
    }),

    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET"
      }),
      providesTags: ['User'], //  Provide tag to allow invalidation
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      }
    }),

    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData
      })
    }),

    becomeSeller: builder.mutation({
      query: () => ({
        url: '/seller',
        method: 'POST',
      }),
      invalidatesTags: ['User'], //  Invalidate user to trigger refetch
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(authApi.util.invalidateTags(['User'])); // optional extra safety
        } catch (err) {
          console.error("Become seller error:", err);
        }
      },
    }),

  })
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useBecomeSellerMutation
} 
 
