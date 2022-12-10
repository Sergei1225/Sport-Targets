import { createEntityAdapter, createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RequestBase } from "../../../service/RequestBase";

const { simpleReqest } = RequestBase();

const prepareItem = (itemData, order) => ({
    repeats: [],
    weight: [],
    forDelete: false,
    priority: false, 
    order: order,
    ...itemData
})

export const getAlllistTrenings = createAsyncThunk(
    "listCreateTrening/getAlllistTrenings",
    async () => {
        return await simpleReqest("listExersises")
    }
);

export const addTunigedTrening = createAsyncThunk(
    "listCreateTrening/addTunigedTrening",
    async (action, {getState}) => {
        const order = getState().listCreateTrening.ids.length;
        const newItem =  prepareItem(action, order);
        await simpleReqest("listExersises", "POST", newItem);
        return newItem;
    }
);

export const deleteOneTrening = createAsyncThunk(
    "listCreateTrening/deleteOneTrening",
    async (action) => {
        await simpleReqest(`listExersises/${action}`, "DELETE");
        return action;
    }
);

export const deleteSomeTrening = createAsyncThunk(
    "listCreateTrening/deleteSomeTrening",
    async ( _, { getState }) => {
        const ids = getState().listCreateTrening.listForDelete;
        if(!ids || ids.length === 0) return
        console.log(ids);
        await Promise.all(ids.map(id => simpleReqest(`listExersises/${id}`, "DELETE")))
        return ids;
    }
);

const listAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.order - a.order
});

const listSliceCreateTrening = createSlice({
    name: "listCreateTrening",
    initialState: listAdapter.getInitialState({
        loadingStatus: "idle",
        listForDelete: [],
        editElementId: "82era3273nsdnHkskiew"
    }),
    reducers: {
        treningsGetAll: listAdapter.setAll,
        addTrening: listAdapter.addOne,
        deleteTren: (state, { payload }) => {
            listAdapter.removeOne(state, payload)
        },
        deleteListTren: (state) => listAdapter.removeMany(state, [...state.listForDelete]),
        priorityTren: (state, { payload }) =>
            listAdapter.upsertOne(state, { id: payload.id, priority: !payload.priority }),
        addToDelete: (state, { payload }) => {
            const { id, forDelete } = payload;
            listAdapter.upsertOne(state, { id, forDelete: !forDelete });
            !forDelete
                ? state.listForDelete.push(id)
                : (state.listForDelete = state.listForDelete.filter((item) => item !== id));
            const foo = [...state.listForDelete]
            console.log(foo)
        },
        deleteAllTren: listAdapter.removeAll
    },
    extraReducers: (builder) => {
        builder.addCase(getAlllistTrenings.fulfilled, (state, { payload }) => {
            listAdapter.setAll(state, payload)
            console.log('данные получены')
        })
        builder.addCase(getAlllistTrenings.rejected, (state, action) => {
            console.log('произошла ошибка')
        });
        builder.addCase(addTunigedTrening.fulfilled, (state, { payload }) => {
            console.log(payload)
            listAdapter.addOne(state, payload)
            console.log('данные получены тюнингованный айтем')
        });
        builder.addCase(addTunigedTrening.rejected, (state, action) => {
            console.log('произошла ошибка тюнингованный айтем')
        });
        builder.addCase(deleteOneTrening.fulfilled, (state, { payload }) => {
            listAdapter.removeOne(state, payload)
            console.log('удалено одно упражнение')
        })
        builder.addCase(deleteOneTrening.rejected, (state, action) => {
            console.log('произошла ошибка удаления')
        });
        builder.addCase(deleteSomeTrening.fulfilled, (state, { payload }) => {
            console.log(payload);
            if(!payload || payload.length === 0) return
            listAdapter.removeMany(state, [...state.listForDelete]);
            state.listForDelete = [];
            console.log('удалено много упражнений')
        })
        builder.addCase(deleteSomeTrening.rejected, (state, action) => {
            console.log('произошла ошибка много удалений')
        });

    } 
});

const { actions, reducer } = listSliceCreateTrening;

export default reducer;

export const selectorsAdapter = listAdapter.getSelectors((state) => state.listCreateTrening);

export const {
    treningsGetAll,
    addTrening,
    deleteTren,
    priorityTren,
    deleteListTren,
    deleteAllTren,
    addToDelete,
} = actions;

