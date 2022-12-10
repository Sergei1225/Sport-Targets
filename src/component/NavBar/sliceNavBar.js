import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    dataTren: ['тест'],
};

const sliceNavBar = createSlice({
    name: "navBar",
    initialState,
    reducers: {
        getData: (state, action) => {
            ///console.log(...state.dataTren);
        },
    },
});

const { actions, reducer } = sliceNavBar;

export default reducer;

export const { getData } = actions;
