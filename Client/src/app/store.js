import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/features/auth/authApi";
import authReducer from "../redux/slices/AuthSlice.js";
import { productApi } from "@/features/product/productApi.js";
import { uploadApi } from "@/features/upload/uploadApi.js";
import { cartApi } from "@/features/cart/cartApi.js";
import { wishlistApi } from "@/features/wishlist/wishlistApi.js";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";  // localStorage ke liye

//  persist config sirf auth slice ke liye (ya jo chaho)
const authPersistConfig = {
  key: "auth",
  storage,
};

//  persistReducer se authReducer ko wrap karo
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

//  Store setup
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,  // persisted auth
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // persist ke liye yeh disable karna hota hai
    }).concat(
      authApi.middleware,
      productApi.middleware,
      uploadApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware
    ),
});

//  Persistor create karo
export const persistor = persistStore(store);

//  Load user jab store ready ho
const initializeApp = async () => {
  await store.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
