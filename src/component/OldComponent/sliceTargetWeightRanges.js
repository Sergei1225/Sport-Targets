import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestBase } from "../../service/RequestBase";

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

export const getDataTarget = createAsyncThunk("targetWeigthRanges/getDataTarget", async () => {
    return simpleReqest("newTargetWeigth");
});

export const saveTargetWeigthEnd = createAsyncThunk(
    "targetWeigthRanges/saveTargetWeigthEnd",
    async (action, { getState }) => {
        const {someTrenings, timeToTarget, weight} = action;

        const selectedExercise = getState().targetWeigthRanges.selectedExercise;
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
};

const sliceTargetWeigth = createSlice({
    name: "targetWeigthRanges",
    initialState: initialState,
    reducers: {
        saveTargetWeigth: (state, { payload }) => {
            state.weight = {targetWeigth: payload.target, parametrs: {...payload}};
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
        },
        saveTargetTrenings: (state, { payload }) => {
            state.someTrenings = {trenings: payload.target, parametrs: {...payload}};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getDataTarget.fulfilled, (state, { payload }) => {
            state.selectedExercise = payload.selectedExercise;
            state.someTrenings = payload.someTrenings;
            state.timeToTarget = payload.timeToTarget;
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
