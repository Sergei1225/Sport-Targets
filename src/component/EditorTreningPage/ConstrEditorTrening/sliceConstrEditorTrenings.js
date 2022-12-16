import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";

//import { randomId } from "../../../service/RandomId";
import { RequestBase } from "../../../service/RequestBase";

export const getSelectedItems = createAsyncThunk("constrTrenings/getSelectedItems", async (action) => {
    const { simpleReqest } = RequestBase();
    return await simpleReqest(action);
});

const initialState = {
    loadingStatusSelected: "loading",
    loadingStatusTuninged: "loading",
    dataSelectedItems: [],
    dataSelectedItemsIds: [],
    dataTuninged: [],
    dataTuningedId: [],
};

const sliceConstrEditorTrening = createSlice({
    name: "constrEditorTrening",
    initialState: initialState,
    reducers: {
        setDataForTuning: (state, { payload }) => {
            state.dataSelectedItems = payload;
        },
        deleteAllSelected: (state) => {
            state.dataSelectedItems = [];
            state.dataSelectedItemsIds = [];
        },
        setOneTrening: (state, { payload }) => {
            state.dataSelectedItems = [...state.dataSelectedItems, payload];
            state.dataSelectedItemsIds = [...state.dataSelectedItemsIds, payload.id];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSelectedItems.pending, (state, action) => {});
        builder.addCase(getSelectedItems.fulfilled, (state, { payload }) => {
            console.log("получено");
            console.log(payload);
            state.dataSelectedItems = payload;
            state.dataSelectedItemsIds = payload.map((item) => item.id);
        });
        builder.addCase(getSelectedItems.rejected, (state, action) => {
            console.log("произошла ошибка");
        });
    },
});

const { actions, reducer } = sliceConstrEditorTrening;

export default reducer;

export const { setDataForTuning, deleteAllSelected, setOneTrening } = actions;

export const listItems = createSelector(
    (state) => state.sliceSelectExercise.selectedItems,
    (state) => state.dataBase.dataBase,
    (state) => state.dataBase.dataAerobic,
    (state) => state.sliceSelectExercise.base,
    (state) => state.sliceSelectExercise.detail,
    (selected, base, aerobic, valueCheck, detail) => {}
);
