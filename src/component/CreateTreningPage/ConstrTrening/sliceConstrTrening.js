import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";

//import { randomId } from "../../../service/RandomId";
import { RequestBase } from "../../../service/RequestBase";

export const getSelectedItems = createAsyncThunk(
    "constrTrening/getSelectedItems",
    async () => {
        const { simpleReqest } = RequestBase();
        return await simpleReqest("selectedExercises")
    }
);

export const deleteSelectedItem = createAsyncThunk(
    "constrTrening/delSelectedItem",
    async (action) => {
        const { simpleReqest } = RequestBase();
        await simpleReqest(`selectedExercises/${action}`, "DELETE")
        return action;
    }
);

export const deleteAllSelectedItem = createAsyncThunk(
    "constrTrening/deleteAllSelectedItem",
    async (_, {getState}) => {
        const { simpleReqest } = RequestBase();
        const ids = getState().constrTrening.dataSelectedItemsIds;
        await Promise.all(ids.map(id => simpleReqest(`selectedExercises/${id}`, "DELETE")))
    }
);

const initialState = {
    loadingStatusSelected: 'loading',
    loadingStatusTuninged: 'loading',
    dataSelectedItems: [],
    dataSelectedItemsIds: [],
    dataTuninged: [],
    dataTuningedId: [],
};

const sliceConstrTrening = createSlice({
    name: "constrTrening",
    initialState: initialState,
    reducers: {
        setDataForTuning: (state, { payload }) => {
            state.dataSelectedItems = payload;
        },
        deleteAllSelected: (state) => {
            state.dataSelectedItems = [];
            state.dataSelectedItemsIds = [];
        },
    },
    extraReducers: (builder) => { 
        builder.addCase(getSelectedItems.pending, (state, action) => {});
        builder.addCase(getSelectedItems.fulfilled, (state, {payload}) => {
            console.log('получено')
            state.dataSelectedItems = payload;
            state.dataSelectedItemsIds = payload.map(item => item.id);
        });
        builder.addCase(getSelectedItems.rejected, (state, action) => {
            console.log('произошла ошибка')
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
    }
});

const { actions, reducer } = sliceConstrTrening;

export default reducer;

export const {
    setDataForTuning,
    deleteAllSelected
} = actions;

export const listItems = createSelector(
    (state) => state.sliceSelectExercise.selectedItems,
    (state) => state.dataBase.dataBase,
    (state) => state.dataBase.dataAerobic,
    (state) => state.sliceSelectExercise.base,
    (state) => state.sliceSelectExercise.detail,
    (selected, base, aerobic, valueCheck, detail) => {

    }
);