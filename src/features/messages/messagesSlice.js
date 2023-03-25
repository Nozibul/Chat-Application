import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messagesSlice = createSlice({
   name: "messages",
   initialState,
   reducers: {},
});

export const { name } = messagesSlice.actions;
export default messagesSlice.reducer ;