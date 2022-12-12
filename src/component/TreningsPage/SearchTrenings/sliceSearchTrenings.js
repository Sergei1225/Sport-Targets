import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
    param: "name",
    dataCheck: [
        { value: "name", id: "dffd67d46sdhsa8877" },
        { value: "date", id: "dffd-sd786323434d" },
    ]
};

const sliceSearchTrenings = createSlice({
    name: "searchTrenings",
    initialState,
    reducers: {
        changeSearchValue: (state, {payload}) => {
            state.searchValue = payload;
        },
        searchParam: (state, {payload}) => {
            state.param = payload;
        },
    },
});

const { actions, reducer } = sliceSearchTrenings;

export default reducer;

export const { changeSearchValue, searchParam } = actions;
