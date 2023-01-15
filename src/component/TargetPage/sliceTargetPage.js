import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RequestBase } from "../../service/RequestBase";

const { simpleReqest } = RequestBase();

export const setDataTrening = createAsyncThunk("targetPage/setDataTrening", async () => {
    return Promise.all(
        ["dataBase", "dataAerobic", "targetWeigth"].map((item) => simpleReqest(item))
    );
});

const initialState = {
    statusLoading: "loading",

};

const sliceTargetPage = createSlice({
    name: "targetPage",
    initialState: initialState,
    reducers: {
        changeParamTrening: (state, { payload }) => {
            const param = state.paramTrening;

            if (param.some((item) => item === payload)) {
                state.paramTrening = param.filter((item) => item !== payload);
            } else state.paramTrening = [...param, payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setDataTrening.pending, (state, action) => {
            //console.log(action);
        });
        builder.addCase(setDataTrening.fulfilled, (state, { payload }) => {

        });
        builder.addCase(setDataTrening.rejected, (state, action) => {

        });
    },
});

const { reducer, actions } = sliceTargetPage;

export default reducer;

export const { changeParamTrening } = actions;

export const treningWeigth = createSelector(
    (state) => state.targetPage.selectedExercise,
    (targetWeigth) => {
        if (!targetWeigth) return null;
        return targetWeigth;
    }
);