import { configureStore } from "@reduxjs/toolkit";
import menuSliceReducer from "./features/MenuSlice";
import cartSliceReucer from "./features/CartSlice"

 const store = configureStore({
  reducer: {
    menu : menuSliceReducer,
    cart : cartSliceReucer
  },
});

export default store