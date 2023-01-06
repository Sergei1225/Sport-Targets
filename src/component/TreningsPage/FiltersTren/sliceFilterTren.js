import { createSlice } from "@reduxjs/toolkit";

const dataFilters = [
    {
        text: "All",
        value: "all",
        id: "gVbds5743nFGjsdmdhHYU8989"
    },
    {
        text: "Future trenings",
        value: "future",
        id: "83ndmsdkshHJsmdYU8989"
    },
    {
        text: "Past trenings",
        value: "past",
        id: "8300nmdksjsdmdhHYU8989"
    },
    {
        text: "Favorite trenings",
        value: "favorite",
        id: "993849ddsJJfdsdmdhHYU8989"
    },
];

const initialState = {
    filterValue: 'all',
    dataFilters: dataFilters,
    sortProp: "",
    dataOption: [
        { value: "date", inner: "Date" },
        { value: "name", inner: "Name" },
        { value: "", inner: "Sorting" },
    ]
};

const sliceFilterTren = createSlice({
    name: "filterTrens",
    initialState,
    reducers: {
        changeFilterTren: (state, {payload}) => {
            state.filterValue = payload;
        },
        changeSort: (state, {payload}) => {
            state.sortProp = payload;
        },
    }
});

const { reducer, actions } = sliceFilterTren;

export default reducer;

export const { changeFilterTren, changeSort } = actions;
