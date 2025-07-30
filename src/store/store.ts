import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../store/slices/loadingSlice";
import themeReducer from "../store/slices/themeSlice";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
