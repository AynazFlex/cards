import { configureStore } from "@reduxjs/toolkit";
import cards from "./reducers/card-reducer";

export const store = configureStore({
  reducer: {
    cards,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
