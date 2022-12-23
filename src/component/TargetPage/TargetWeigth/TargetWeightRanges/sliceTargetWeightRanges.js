import { createSlice, createAsyncThunk, createSelector} from "@reduxjs/toolkit";
import { RequestBase } from "../../../../service/RequestBase";

const { simpleReqest } = RequestBase();

export const setDataTrening = createAsyncThunk("targetWeigthRanges/setDataTrening", async () => {
    return Promise.all(
        ["dataBase", "dataAerobic", "targetWeigth"].map((item) => simpleReqest(item))
    );
});

const initialState = {
    weiggthRange: null,
    statusLoading: "loading",
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

export const { setDataBase, setDataAerobic } = actions;

export const rangesData = createSelector(
    (state) => state.dataBase.targetWeigth,
    (targetWeigth) => {
        if(!targetWeigth) return null;
        
        return targetWeigth;
    }
);
