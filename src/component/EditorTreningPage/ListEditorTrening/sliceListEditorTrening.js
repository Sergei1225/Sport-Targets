import {
    createEntityAdapter,
    createSelector,
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import { RequestBase } from "../../../service/RequestBase";

const { simpleReqest } = RequestBase();

export const getAlllistTrenings = createAsyncThunk(
    "listCreateExersices/getAlllistTrenings",
    async (action) => {
        return await simpleReqest(action);
    }
);


const listAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.order - a.order,
});

const sliceListEditorTrening = createSlice({
    name: "listEditorTrening",
    initialState: listAdapter.getInitialState({
        loadingStatus: "idle",
        listForDelete: [],
        editElementId: "82era3273nsdnHkskiew",
    }),
    reducers: {
        priorityTren: (state, { payload }) =>
            listAdapter.upsertOne(state, { id: payload.id, priority: !payload.priority }),
        addToDelete: (state, { payload }) => { 
            const { id, forDelete } = payload;
            listAdapter.upsertOne(state, { id, forDelete: !forDelete });
            !forDelete
                ? state.listForDelete.push(id)
                : (state.listForDelete = state.listForDelete.filter((item) => item !== id));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAlllistTrenings.fulfilled, (state, { payload }) => {
            listAdapter.setAll(state, payload.listExersises);
            console.log("данные получены");
        });
        builder.addCase(getAlllistTrenings.rejected, (state, action) => {
            console.log("произошла ошибка");
        });
    },
});

const { actions, reducer } = sliceListEditorTrening;

export default reducer;

export const selectorsAdapter = listAdapter.getSelectors((state) => state.listEditorTrening);

export const {
    treningsGetAll,
    addTrening,
    deleteTren,
    priorityTren,
    deleteListTren,
    deleteAllTren,
    addToDelete,
} = actions;
