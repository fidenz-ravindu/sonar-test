import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "User Details",
  initialState: {
    details: [],
    projects: [],
    people: [],
    archivements: [],
    feed: [],
    gallery: [],
    work: [],
    waiting: false,
  },
  reducers: {
    set: (state, { type, payload }) => {
      state[payload.key] = payload.value;
    },
  },
});

export const { set } = slice.actions;

export const store = configureStore({ reducer: slice.reducer });
