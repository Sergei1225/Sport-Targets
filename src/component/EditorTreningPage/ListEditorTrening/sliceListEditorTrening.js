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

export const treningsCompare = createAsyncThunk(
    "listEditorTrening/treningsCompare",
    async (action) => {
        const { pathList, pathTrening, currentItemId } = action;
        const dataRequests = [pathTrening, pathList, `listTrenings/${currentItemId}`];
        const [dataTening, dataList, currentTren] = await Promise.all(dataRequests.map((item) => simpleReqest(item)));

        if (dataTening.id === currentItemId) {
            return dataList;
        } else {
            const { listExersises } = currentTren;
            console.log('не совпадает')
            simpleReqest(pathTrening, "PUT", currentTren);
            await Promise.all(dataList.map((item) => simpleReqest(`${pathList}/${item.id}`, "DELETE")));
            await Promise.all(listExersises.map((item) => simpleReqest(`${pathList}`, "POST", item)));
        
            return listExersises;
        }
    }
);

export const getListTrenings = createAsyncThunk(
    "listEditorTrening/getListTrenings",
    async (action) => {
        return await simpleReqest(action);
    }
);

export const deleteOneTrening = createAsyncThunk(
    "listEditorTrening/deleteOneTrening",
    async (action) => {
        await simpleReqest(`${action.path}/${action.id}`, "DELETE");
        return action.id;
    }
);
export const deleteSomeTrening = createAsyncThunk(
    "listEditorTrening/deleteSomeTrening",
    async (action, { getState }) => {
        const ids = getState().listEditorTrening.listForDelete;
        if (!ids || ids.length === 0) return;
        await Promise.all(ids.map((id) => simpleReqest(`${action}/${id}`, "DELETE")));
        return ids;
    }
);

export const deleteAllTrening = createAsyncThunk(
    "listEditorTrening/deleteAllTrening",
    async (action, { getState }) => {
        const ids = getState().listEditorTrening.ids;
        console.log(ids);
        if (!ids || ids.length === 0) return;
        await Promise.all(ids.map((id) => simpleReqest(`${action}/${id}`, "DELETE")));
        return ids;
    }
);

export const addTunigedTrening = createAsyncThunk(
    "listEditorTrening/addTunigedTrening",
    async (action, { getState }) => {
        const orderList = getState().listEditorTrening.entities;
        const order = Object.keys(orderList).length;

        const newItem = prepareItem(action.data, order);
        await simpleReqest(action.path, "POST", newItem);
        return newItem;
    }
);

export const addForEditor = createAsyncThunk(
    "listEditorTrening/addForEditor",
    async (action) => {
        const {data, pathList, pathConstr } = action;
        console.log(action);
        await simpleReqest(pathConstr, "POST", data);
        await simpleReqest(`${pathList}/${data.id}`, "DELETE");
        return data.id;
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
        compareValue: true,
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
        },
    },
    extraReducers: (builder) => {
        builder.addCase(treningsCompare.fulfilled, (state, { payload }) => {
            console.log(payload);
            listAdapter.setAll(state, payload);
            console.log("данные получены");
        });
        builder.addCase(treningsCompare.rejected, (state, action) => {
            console.log("произошла ошибка");
        });
        builder.addCase(getListTrenings.fulfilled, (state, { payload }) => {
            console.log(payload);
            listAdapter.setAll(state, payload);
            console.log("данные получены");
        });
        builder.addCase(getListTrenings.rejected, (state, action) => {
            console.log("произошла ошибка");
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
        builder.addCase(addTunigedTrening.fulfilled, (state, { payload }) => {
            console.log(payload);
            listAdapter.addOne(state, payload);
            console.log("данные получены тюнингованный айтем");
        });
        builder.addCase(addTunigedTrening.rejected, (state, action) => {
            console.log("произошла ошибка тюнингованный айтем");
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
