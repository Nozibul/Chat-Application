import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const conversations = createSlice({
    name: "conversation",
    initialState,
    reducers: {

    },
});

export const {name} = conversations.actions;
export default conversations.reducer ;
