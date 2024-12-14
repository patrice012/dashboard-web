import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for our state
interface TwoFactorState {
  email: string;
  password: string;
  twoFactorCode: string;
}

// Initial state
const initialState: TwoFactorState = {
  email: "",
  password: "",
  twoFactorCode: "",
};

// Create the slice
const twoFactorSlice = createSlice({
  name: "twoFactor",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setTwoFactorCode: (state, action: PayloadAction<string>) => {
      state.twoFactorCode = action.payload;
    },
    resetTwoFactor: (state) => {
      state.email = "";
      state.password = "";
      state.twoFactorCode = "";
    },
  },
});

// Export actions
export const { setEmail, setPassword, setTwoFactorCode, resetTwoFactor } =
  twoFactorSlice.actions;

// Export reducer
export default twoFactorSlice.reducer;
