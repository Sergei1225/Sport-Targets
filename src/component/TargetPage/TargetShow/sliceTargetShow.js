import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RequestBase } from "../../../service/RequestBase";

import { randomId } from "../../../service/RandomId";

const { simpleReqest } = RequestBase();

const changeTime = (left, target) => {
    return {
        paramProgress: "days",
        remainder: left,
        target: target,
        valueAbsolute: target - left,
        valuePercent: +(((target - left) / target) * 100).toFixed(2),
    };
};

const compareDates = (end, remainder) => {
    const timeNow = Date.now();
    const left = Math.floor((end - timeNow) / 86400000);
    // если количество дней равно то перезапись даты не нужна
    return remainder === left ? 0 : left;
};

export const getDataTargetWeigth = createAsyncThunk("showTargetWeigth/getDataTargetWeigth", async () => {
    const items = await simpleReqest("newTargetWeigth");
    const left = compareDates(+items.timeToTarget.end, +items.timeToTarget.parametrs.remainder);

    if (left) {
        const currentTime = changeTime(+left, +items.timeToTarget.parametrs.target);
        const changedTime = { ...items.timeToTarget, parametrs: { ...currentTime } };

        simpleReqest("newTargetWeigth", "PATCH", {timeToTarget: changedTime})

        return { ...items, timeToTarget: {...changedTime} } ;
    } else { 
        return items;
    }
});

const initialState = {
    statusLoading: "loadingTargets",
    errorStatus: '',
    weigthTarget: null,
    fullTarget: []
};

const sliceShowTargetWeigth = createSlice({
    name: "showTargetWeigth",
    initialState: initialState,
    reducers: {
        setDataTargetShow: (state, { payload }) => {
            state.weigthTarget = [
                { ...payload.weight.parametrs, id: randomId() },
                { ...payload.someTrenings.parametrs, id: randomId() },
                { ...payload.timeToTarget.parametrs, id: randomId() },
            ];
            state.statusLoading = "content";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getDataTargetWeigth.fulfilled, (state, { payload }) => {
            state.weigthTarget = [
                { ...payload.weight.parametrs, id: randomId() },
                { ...payload.someTrenings.parametrs, id: randomId() },
                { ...payload.timeToTarget.parametrs, id: randomId() },
            ];
            state.fullTarget = payload;
            state.statusLoading = "content";
            console.log("таргер шоу получены данные");
        });
        builder.addCase(getDataTargetWeigth.rejected, (state, {error}) => {
            state.statusLoading = "error";
            state.errorStatus = {name: error.name, message: error.message}
        });
    },
});

const { reducer, actions } = sliceShowTargetWeigth;

export default reducer;

export const { setDataTargetShow } = actions;

export const rangesData = createSelector(
    (state) => state.dataBase.targetWeigth,
    (targetWeigth) => {
        if (!targetWeigth) return null;

        console.log(targetWeigth);

        const { weight, someTrenings: trenings, timeToTarget: time, targetAchievement: resultTrenings } = targetWeigth;

        return { weight, trenings, time, resultTrenings };
    }
);
