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
        headerChangeProp: (state, {payload}) => {
            state.sortProp = payload;
        },
    },
});

const { actions, reducer } = sliceHeaderTrenings;

export default reducer;

export const { headerChangeProp } = actions;
