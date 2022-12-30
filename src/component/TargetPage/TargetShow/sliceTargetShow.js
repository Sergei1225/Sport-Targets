import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RequestBase } from "../../../service/RequestBase";

import { randomId } from "../../../service/RandomId";

const { simpleReqest } = RequestBase();

export const getDataTargetWeigth = createAsyncThunk(
    "showTargetWeigth/getDataTargetWeigth",
    async () => {
        return simpleReqest("newTargetWeigth");
    }
);

const initialState = {
    statusLoading: "loading",
    weigthTarget: null,
};

const sliceShowTargetWeigth = createSlice({
    name: "showTargetWeigth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDataTargetWeigth.fulfilled, (state, { payload }) => {
            state.weigthTarget = [
                { ...payload.someTrenings.parametrs, id: randomId() },
                { ...payload.timeToTarget.parametrs, id: randomId() },
                { ...payload.weight.parametrs, id: randomId() },
            ];
            state.statusLoading = "content";
        });
        builder.addCase(getDataTargetWeigth.rejected, (state, action) => {
            console.log(action.error.message);
            state.statusLoading = "error";
        });
    },
});

const { reducer, actions } = sliceShowTargetWeigth;

export default reducer;

export const {} = actions;

export const rangesData = createSelector(
    (state) => state.dataBase.targetWeigth,
    (targetWeigth) => {
        if (!targetWeigth) return null;

        console.log(targetWeigth);

        const {
            weight,
            someTrenings: trenings,
            timeToTarget: time,
            targetAchievement: resultTrenings,
        } = targetWeigth;

        return { weight, trenings, time, resultTrenings };
    }
);

