import {
    createEntityAdapter,
    createSelector,
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import { RequestBase } from "../../../service/RequestBase";

const { simpleReqest } = RequestBase();

const prepareItem = (itemData, order) => ({
    forDelete: false,
    priority: false,
    order: itemData.order ? itemData.order : order,
    ...itemData,
});

export const getAlllistTrenings = createAsyncThunk(
    "listCreateExersice/getAlllistTrenings",
    async () => {
        return await simpleReqest("listExersises");
    }
);

export const addTunigedTrening = createAsyncThunk(
    "listCreateExersice/addTunigedTrening",
    async (action, { getState }) => {
        // let arrSort = [];
        // for (let item in data) arrSort.push(data[item]);
        let order;
        const orderList = getState().listCreateExersice.entities;
        const lastOrder = Object.entries(orderList);

        if (lastOrder.length === 0) order = 0;
        else order = +lastOrder[lastOrder.length - 1][1].order + 1;

        const newItem = prepareItem(action, order);
        await simpleReqest("listExersises", "POST", newItem);
        return newItem;
    }
);

export const addForEditor = createAsyncThunk(
    "listCreateExersice/addForEditor",
    async (action) => {
        console.log(action);
        await simpleReqest("selectedExercises", "POST", action);
        await simpleReqest(`listExersises/${action.id}`, "DELETE");
        return action.id;
    }
);

export const deleteOneTrening = createAsyncThunk(
    "listCreateExersice/deleteOneTrening",
    async (action) => {
        await simpleReqest(`listExersises/${action}`, "DELETE");
        return action;
    }
);

export const deleteSomeTrening = createAsyncThunk(
    "listCreateExersice/deleteSomeTrening",
    async (_, { getState }) => {
        const ids = getState().listCreateExersice.listForDelete;
        if (!ids || ids.length === 0) return;
        await Promise.all(ids.map((id) => simpleReqest(`listExersises/${id}`, "DELETE")));
        return ids;
    }
);

export const deleteAllTrening = createAsyncThunk(
    "listCreateExersice/deleteAllTrening",
    async (_, { getState }) => {
        const ids = getState().listCreateExersice.ids;
        console.log(ids);
        if (!ids || ids.length === 0) return;
        await Promise.all(ids.map((id) => simpleReqest(`listExersises/${id}`, "DELETE")));
        return ids;
    }
);

const listAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.order - a.order,
});

const sliceListCreateExersice = createSlice({
    name: "listCreateExersice",
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
            listAdapter.setAll(state, payload);
            console.log("данные получены");
        });
        builder.addCase(getAlllistTrenings.rejected, (state, action) => {
            console.log("произошла ошибка");
        });
        builder.addCase(addTunigedTrening.fulfilled, (state, { payload }) => {
            console.log(payload);
            listAdapter.addOne(state, payload);
            console.log("данные получены тюнингованный айтем");
        });
        builder.addCase(addTunigedTrening.rejected, (state, action) => {
            console.log("произошла ошибка тюнингованный айтем");
        });
        builder.addCase(deleteOneTrening.fulfilled, (state, { payload }) => {
            listAdapter.removeOne(state, payload);
            console.log("удалено одно упражнение");
        });
        builder.addCase(deleteOneTrening.rejected, (state, action) => {
            console.log("произошла ошибка удаления");
        });
        builder.addCase(deleteSomeTrening.fulfilled, (state, { payload }) => {
            console.log(payload);
            if (!payload || payload.length === 0) return;
            listAdapter.removeMany(state, [...state.listForDelete]);
            state.listForDelete = [];
            console.log("удалено много упражнений");
        });
        builder.addCase(deleteSomeTrening.rejected, (state, action) => {
            console.log("произошла ошибка много удалений");
        });
        builder.addCase(deleteAllTrening.fulfilled, (state) => {
            listAdapter.removeAll(state);
            console.log("удалены все");
        });
        builder.addCase(deleteAllTrening.rejected, (state, action) => {
            console.log("произошла ошибка удаление всех");
        });
        builder.addCase(addForEditor.fulfilled, (state, { payload }) => {
            listAdapter.removeOne(state, payload);
            console.log("добавлена для редактирования");
        });
        builder.addCase(addForEditor.rejected, (state, action) => {
            console.log("ошибка редактирования");
        });
    },
});

const { actions, reducer } = sliceListCreateExersice;

export default reducer;

export const selectorsAdapter = listAdapter.getSelectors((state) => state.listCreateExersice);

export const {
    treningsGetAll,
    addTrening,
    deleteTren,
    priorityTren,
    deleteListTren,
    deleteAllTren,
    addToDelete,
} = actions;
