import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RequestBase } from "../../service/RequestBase";

import { emptyTragetWeigth } from "./TargetWeigth/dataRanges";

const { simpleReqest } = RequestBase();

// перевод из дней в милисекунды 
const convertDayInMilisec = (someDays) => {
    const valueNow = Date.now();
    const days = +someDays * 86400000;
    if(!someDays) return valueNow;
    return valueNow + days;
}
// из милисекунд в дату строку
const getDateFromMilisec = (milisec) => {
    const objDate = new Date(+milisec);
    return `${objDate.getMonth() + 1}.${objDate.getDate()}.${objDate.getFullYear()}`;
}

export const setDataTargets = createAsyncThunk("targetPage/setDataTrening", async () => {
    return await simpleReqest("newTargetWeigth")
});

export const deleteTargetWeigth = createAsyncThunk("targetPage/setDataTrening", async () => {
    return await simpleReqest("newTargetWeigth", "PUT", emptyTragetWeigth)
});

export const saveTargetWeigthEnd = createAsyncThunk(
    "targetPage/saveTargetWeigthEnd",
    async (action, { getState }) => {
        const {someTrenings, timeToTarget, weight} = action;

        const selectedExercise = getState().targetPage.selectedExercise;

        const targetAchievement = [];

        const endObj = {selectedExercise, someTrenings, timeToTarget, weight, targetAchievement}

        return simpleReqest("newTargetWeigth", "PATCH", endObj);
    }
);

const initialState = {
    statusLoading: "loading",
    selectedExercise: null,
    someTrenings: null,
    timeToTarget: null,
    weight: null,
    targetAchievement: null,
    paramTrening: [],
    dataParams: [ "time", "trenings"],
    fullTargetState: null
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
        saveTargetWeigth: (state, { payload }) => {
            state.weight = {targetWeigth: payload.target, parametrs: {...payload}};
            state.fullTargetState.weight = {targetWeigth: payload.target, parametrs: {...payload}};
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
                parametrs: payload,
            };
            state.timeToTarget = item;
            state.fullTargetState.timeToTarget = item;
        },
        saveTargetTrenings: (state, { payload }) => {
            state.someTrenings = {trenings: payload.target, parametrs: {...payload}};
            state.fullTargetState.someTrenings = {trenings: payload.target, parametrs: {...payload}};
        },
        changeStatusPage: (state, { payload }) => {
            state.statusLoading = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setDataTargets.pending, (state, action) => {
            //console.log(action);
        });
        builder.addCase(setDataTargets.fulfilled, (state, { payload: targetWeigth }) => {

            state.fullTargetState = targetWeigth;

            state.selectedExercise = targetWeigth.selectedExercise;
            state.someTrenings = targetWeigth.someTrenings;
            state.timeToTarget = targetWeigth.timeToTarget;
            state.weight = targetWeigth.weight;
            state.targetAchievement = targetWeigth.targetAchievement;
            console.log( targetWeigth.targetAchievement)

            if(!targetWeigth.selectedExercise.id){
                state.statusLoading = "create";
            } else {
                state.statusLoading = "editor";
            }
            console.log('данные для целей получены');
        });
        builder.addCase(setDataTargets.rejected, (state, action) => {
            console.log('ошибка при получении данных для целей ');
        });
        builder.addCase(saveTargetWeigthEnd.fulfilled, (state, { payload }) => {
            console.log('цель сохранена')
        });
        builder.addCase(saveTargetWeigthEnd.rejected, (state, action) => {
            console.log('ошибка сохранения цели')
            state.statusLoading = "error";
        });
    },
});

const { reducer, actions } = sliceTargetPage;

export default reducer;

export const { changeParamTrening, saveTargetWeigth, saveTargetTime, saveTargetTrenings, changeStatusPage } = actions;

export const treningWeigth = createSelector(
    (state) => state.targetPage.selectedExercise,
    (targetWeigth) => {
        if (!targetWeigth) return null;
        return targetWeigth;
    }
);