import { configureStore } from "@reduxjs/toolkit";
import twoFactorReducer from "./slices/twoFactorSlice";

export const store = configureStore({
  reducer: {
    twoFactor: twoFactorReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selecttwoFactorState = (state: RootState) => state.twoFactor;
