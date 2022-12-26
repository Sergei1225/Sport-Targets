import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RequestBase } from "../../../../service/RequestBase";

import { workDataProgressBar } from "../../workDataProgressBar";

const { simpleReqest } = RequestBase();

const { convertDayInMilisec, nowMilisec } = workDataProgressBar();

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
            state.targetWeigth = { start: payload.start, end: payload.end };
        },
        saveTargetTime: (state, { payload }) => {
            const convert = {
                start: nowMilisec(),
                end: convertDayInMilisec(+payload),
            };
            state.timeToTarget = { ...convert };
        },
        saveTargetTrenings: (state, { payload }) => {
            state.someTrenings = +payload;
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

const { reducer, actions } = sliceTargetWeigth;

export default reducer;

export const { setDataBase, setDataAerobic, saveTargetWeigth, saveTargetTime, saveTargetTrenings } =
    actions;

export const rangesData = createSelector(
    (state) => state.dataBase.targetWeigth,
    (targetWeigth) => {
        if (!targetWeigth) return null;

        const {
            weight,
            someTrenings: trenings,
            timeToTarget: time,
            targetAchievement: resultTrenings,
        } = targetWeigth;

        return { weight, trenings, time, resultTrenings };
    }
);
