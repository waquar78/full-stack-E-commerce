import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/features/auth/authApi";
import authReducer from "../redux/slices/AuthSlice.js"
import { productApi } from "@/features/product/productApi.js";
import { uploadApi } from "@/features/upload/uploadApi.js";
import { cartApi } from "@/features/cart/cartApi.js";
import { wishlistApi } from "@/features/wishlist/wishlistApi.js";
export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]:productApi.reducer,
    [uploadApi.reducerPath]:uploadApi.reducer,
    [cartApi.reducerPath]:cartApi.reducer,
    [wishlistApi.reducerPath]:wishlistApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware,uploadApi.middleware,cartApi.middleware,wishlistApi.middleware),
});

const initializeApp=async()=>{
  await store.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();