import { dataItems } from "./dataListSample";

import { randomId } from "../../../service/RandomId";

import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

const listAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.order - a.order
});

const booksAdapter = createEntityAdapter({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (book) => book.bookId,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.title.localeCompare(b.title),
  })
  

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
            console.log(state.ids.length)
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
        },
        deleteAllTren: listAdapter.removeAll,
        addChoosedTren: (state, { payload }) => {
            const newItem = {
                ...payload,
                id: randomId(),
                repeats: [],
                weight: [],
                forDelete: false,
                priority: false
            }
            console.log(newItem);
            listAdapter.addOne(state, newItem);
        }
    },
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
    addChoosedTren
} = actions;

