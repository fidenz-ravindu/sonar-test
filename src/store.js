import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "User Details",
  initialState: {
    details: [],
    projects: [],
    people: [],
    archivements: [],
    posts: {},
    gallery: [],
    work: [],
    waiting: false,
    feedPage: 1,
  },
  reducers: {
    set: (state, { type, payload }) => {
      state[payload.key] = payload.value;
    },
    setPosts: (state, { type, payload }) => {
      let t = (payload.page - 1) * 6,
        i = 0;
      state.posts[payload.page] = payload.posts.map((elm) => {
        elm["key"] = t + i++;
        elm["t"] = t;
        return elm;
      });
      state.feedPage = payload.page + 1;
    },
  },
});

export const { set, setPosts } = slice.actions;

export const store = configureStore({ reducer: slice.reducer });
