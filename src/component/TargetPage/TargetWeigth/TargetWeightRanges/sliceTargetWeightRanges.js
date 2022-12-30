import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RequestBase } from "../../../../service/RequestBase";

import { workDataProgressBar } from "../../workDataProgressBar";
import { randomId } from "../../../../service/RandomId";

const { simpleReqest } = RequestBase();

const { convertDayInMilisec, getDateFromMilisec, remainderStart, remainderNow } =
    workDataProgressBar();

export const getDataTarget = createAsyncThunk("targetWeigthRanges/getDataTarget", async () => {
    return simpleReqest("newTargetWeigth");
});

export const setDataTrening = createAsyncThunk("targetWeigthRanges/setDataTrening", async () => {
    return Promise.all(
        ["dataBase", "dataAerobic", "targetWeigth"].map((item) => simpleReqest(item))
    );
});

const initialState = {
    statusLoading: "loading",
    targetWeigth: {
        start: 0,
        end: 0,
    },
    timeToTarget: {
        start: 0,
        end: 0,
    },
    someTrenings: 0,
    weigthTarget: null,
    selectedExercise: null,
    someTreningsNew: null,
    timeToTargetNew: null,
    weight: null,
    targetAchievement: null,
};

const sliceTargetWeigth = createSlice({
    name: "targetWeigthRanges",
    initialState: initialState,
    reducers: {
        setDataBase: (state, { payload }) => {
            state.dataBase = payload;
        },
        setDataAerobic: (state, { payload }) => {
            state.dataAerobic = payload;
        },
        saveTargetWeigth: (state, { payload }) => {
            state.weight = { ...payload };
        },
        saveTargetTime: (state, { payload }) => {
            const milisecTarget = convertDayInMilisec(+payload.target);
            const nowMilisec = convertDayInMilisec();
            const item = {
                start: nowMilisec,
                end: milisecTarget,
                days: +payload.target,
                date: {
                    start: getDateFromMilisec(nowMilisec),
                    end: getDateFromMilisec(+milisecTarget),
                },
                parametrs: {
                    ...payload,
                },
            };
            state.timeToTargetNew = item;
        },
        saveTargetTrenings: (state, { payload }) => {
            state.someTreningsNew = { ...payload };
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
        builder.addCase(getDataTarget.fulfilled, (state, { payload }) => {
            state.selectedExercise = payload.selectedExercise;
            state.someTreningsNew = payload.someTrenings;
            state.timeToTargetNew = payload.timeToTarget;
            state.weight = payload.weight;
            state.targetAchievement = payload.targetAchievement;

            state.statusLoading = "content";
        });
        builder.addCase(getDataTarget.rejected, (state, action) => {
            console.log(action.error.message);
            state.statusLoading = "error";
        });
    },
});

const { reducer, actions } = sliceTargetWeigth;

export default reducer;

export const { setDataBase, setDataAerobic, saveTargetWeigth, saveTargetTime, saveTargetTrenings } =
    actions;

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

export const rangesTransformData = createSelector(
    (state) => state.dataBase.targetWeigth,
    (targetWeigth) => {
        if (!targetWeigth) return null;

        const { weight, someTrenings, timeToTarget, targetAchievement } = targetWeigth;

        const time = {
            target: remainderStart(+timeToTarget.end, +timeToTarget.start),
            remainder: remainderNow(+timeToTarget.end),
        };

        const trenings = {
            target: +someTrenings,
            remainder: +someTrenings - targetAchievement.length,
            result: +targetAchievement.length,
        };
        const mostResult = +Math.max(targetAchievement.map((i) => i.result));

        const weigthData = {
            target: +weight.end,
            result: +mostResult,
            startWeigth: +weight.start,
        };

        return { weigthData, trenings, time };
    }
);
