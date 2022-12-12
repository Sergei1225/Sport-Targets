import { createSlice } from "@reduxjs/toolkit";
// {value: 'favorites', inner: 'Избранные'},
const initialState = {
    sortProp: "",
    dataOption: [
        { value: "date", inner: "Дате" },
        { value: "name", inner: "По названию" },
        { value: "", inner: "Сортировать по" },
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
