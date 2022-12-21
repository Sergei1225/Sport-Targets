import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";

//import { randomId } from "../../../service/RandomId";
import { RequestBase } from "../../../service/RequestBase";

const { simpleReqest } = RequestBase();

export const getSelectedItems = createAsyncThunk("constrTrenings/getSelectedItems", async (action) => {
    return await simpleReqest(action);
});

export const deleteSelectedItem = createAsyncThunk(
    "constrEditorTrening/delSelectedItem",
    async (action) => {
        await simpleReqest(`${action.path}/${action.id}`, "DELETE")
        return action.id;
    }
);

export const deleteAllSelectedItem = createAsyncThunk(
    "constrEditorTrening/deleteAllSelectedItem",
    async (action, { getState }) => {
        const ids = getState().constrEditorTrening.dataSelectedItemsIds;
        await Promise.all(ids.map(id => simpleReqest(`${action}/${id}`, "DELETE")))
    }
);

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
        builder.addCase(deleteSelectedItem.fulfilled, (state, {payload}) => {
            console.log('удаление')
            state.dataSelectedItems = state.dataSelectedItems.filter(item => item.id !== payload);
            state.dataSelectedItemsIds = state.dataSelectedItemsIds.filter(item => item !== payload);
        });
        builder.addCase(deleteSelectedItem.rejected, (state, {payload}) => {
            console.log('ошибка удаление')
        });
        builder.addCase(deleteAllSelectedItem.fulfilled, (state, {payload}) => {
            console.log('удаление всех')
            state.dataSelectedItems = [];
            state.dataSelectedItemsIds = [];
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
