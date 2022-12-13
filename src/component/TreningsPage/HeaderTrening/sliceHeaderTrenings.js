import { createSlice } from "@reduxjs/toolkit";
// {value: 'favorites', inner: 'Избранные'},
const initialState = {
    sortProp: "",
    dataOption: [
        { value: "date", inner: "Date" },
        { value: "name", inner: "Name" },
        { value: "", inner: "Sorting" },
    ],
};

const sliceHeaderTrenings = createSlice({
    name: "headerTrenings",
    initialState,
    reducers: {
        headerChangeProp: (state, action) => {
            state.sortProp = action.payload;
        },
        deleteAllHead: (state, action) => {
            action.payload = 200;
        },
    },
});

const { actions, reducer } = sliceHeaderTrenings;

export default reducer;

export const { headerChangeProp, deleteAllHead } = actions;
