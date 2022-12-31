import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RequestBase } from "../../../service/RequestBase";

const { simpleReqest } = RequestBase();

export const setDataTrening = createAsyncThunk("treningWeigth/setDataTrening", async () => {
    return Promise.all(
        ["dataBase", "dataAerobic", "targetWeigth"].map((item) => simpleReqest(item))
    );
});

const initialState = {
    weighthRange: null,
    statusLoading: "loading",
    paramTrening: ["weight"],
    dataParams: ["weight", "time", "trenings"],
};

const sliceTreningWeigth = createSlice({
    name: "treningWeigth",
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
            const [base, aerobic, targetWeigth] = payload;
            state.dataBase = base;
            state.dataAerobic = aerobic;
            state.targetWeigth = targetWeigth;
            state.statusLoading = "content";
        });
        builder.addCase(setDataTrening.rejected, (state, action) => {
            console.log(action.error.message);
            state.statusLoading = "error";
        });
    },
});

const { reducer, actions } = sliceTreningWeigth;

export default reducer;

export const { changeParamTrening } = actions;

export const treningWeigth = createSelector(
    (state) => state.targetWeigthRanges.selectedExercise,
    (targetWeigth) => {
        if (!targetWeigth) return null;
        return targetWeigth;
    }
);
