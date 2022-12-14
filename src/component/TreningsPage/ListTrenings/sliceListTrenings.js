import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
} from "@reduxjs/toolkit";

import { simpleSortArrObj } from "../../../service/simpleSortArrObj";
import { RequestBase } from "../../../service/RequestBase";

const { simpleReqest } = RequestBase();

export const getMyTreningItems = createAsyncThunk("listTrenings/getMyTreningItems", async () => {
    return await simpleReqest("listTrenings");
});

export const favoriteTrening = createAsyncThunk("listTrenings/favoriteTrening", async (action) => {
    await simpleReqest(`listTrenings/${action.id}`, "PATCH", { favorite: !action.favorite });
    return action;
});
export const statusTrenings = createAsyncThunk("listTrenings/statusTrenings", async (action) => {
    const statusValue = action.status === "future" ? "past" : "future";
    await simpleReqest(`listTrenings/${action.id}`, "PATCH", { status: statusValue });
    return { id: action.id, status: statusValue };
});

export const deleteOneTrening = createAsyncThunk(
    "listTrenings/deleteOneTrening",
    async (action) => {
        await simpleReqest(`listTrenings/${action}`, "DELETE");
        return action;
    }
);

export const deleteSomeTrening = createAsyncThunk(
    "listTrenings/deleteSomeTrening",
    async (_, { getState }) => {
        const ids = getState().listTrenings.listForDelete;
        if (!ids || ids.length === 0) return;
        await Promise.all(ids.map((id) => simpleReqest(`listTrenings/${id}`, "DELETE")));
        return ids;
    }
);

const listAdapter = createEntityAdapter();

const sliceListTrenings = createSlice({
    name: "listTrenings",
    initialState: listAdapter.getInitialState({
        loadingStatus: "loading",
        listForDelete: [],
    }),
    reducers: {
        addToDelete: {
            reducer: (state, { payload }) => {
                const { id, forDelete } = payload;
                listAdapter.upsertOne(state, { id, forDelete: !forDelete });
                !forDelete
                    ? state.listForDelete.push(id)
                    : (state.listForDelete = state.listForDelete.filter((item) => item !== id));
            },
            prepare: (id, forDelete) => ({ payload: { id, forDelete } }),
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMyTreningItems.fulfilled, (state, { payload }) => {
            listAdapter.setAll(state, payload);
            console.log("данные получены тренировок");
        });
        builder.addCase(getMyTreningItems.rejected, (state, action) => {
            console.log("произошла ошибка getMyTreningItems");
        });
        builder.addCase(favoriteTrening.fulfilled, (state, { payload }) => {
            listAdapter.upsertOne(state, { id: payload.id, favorite: !payload.favorite });
            console.log("Изменение приоритетности тренировки");
        });
        builder.addCase(favoriteTrening.rejected, (state, action) => {
            console.log("ошибка изменения приоритетности тренировки");
        });
        builder.addCase(statusTrenings.fulfilled, (state, { payload }) => {
            listAdapter.upsertOne(state, { id: payload.id, status: payload.status });
            console.log("Изменение статуса тренировки");
        });
        builder.addCase(statusTrenings.rejected, (state, action) => {
            console.log("ошибка изменения статуса тренировки");
        });
        builder.addCase(deleteOneTrening.fulfilled, (state, { payload }) => {
            listAdapter.removeOne(state, payload);
            console.log("удалено одна тренировка ");
        });
        builder.addCase(deleteOneTrening.rejected, (state, action) => {
            console.log("произошла ошибка удаления тренировки");
        });
        builder.addCase(deleteSomeTrening.fulfilled, (state, { payload }) => {
            console.log(payload);
            if (!payload || payload.length === 0) return;
            listAdapter.removeMany(state, [...state.listForDelete]);
            state.listForDelete = [];
            console.log("удалено много тренировок");
        });
        builder.addCase(deleteSomeTrening.rejected, (state, action) => {
            console.log("произошла ошибка много удалений тренировок");
        });
    },
});

const { actions, reducer } = sliceListTrenings;

export default reducer;

export const selectorsAdapter = listAdapter.getSelectors((state) => state.listTrenings);

const sortingList = (sort, data, param = "up") => {
    if (!sort || !data || data.length === 0) return;
    if (sort === "date") {
        return simpleSortArrObj({
            data: data,
            value: sort,
            typeValue: "number",
            param: "down",
        });
    } else if (sort === "name") {
        return simpleSortArrObj({
            data: data,
            value: sort,
            typeValue: "string",
            param: param,
        });
    }
};

const filtredList = (data, filter) => {
    if (filter === "all") return data;
    else if (filter === "favorite") {
        return data.filter((i) => i.favorite);
    } else {
        return data.filter((i) => i.status === filter);
    }
};

export const filtredItems = createSelector(
    (state) => state.listTrenings.entities,
    (state) => state.headerTrenings.sortProp,
    (state) => state.filterTrens.filterValue,
    (state) => state.searchTrenings.searchValue,
    (state) => state.searchTrenings.param,

    (data, sort, filter, search, paramSearch) => {
        if (!data || data.length === 0) {
            console.log(data);
            return null;
        }
        let arrSort = [];
        for (let item in data) arrSort.push(data[item]);

        if (sort) arrSort = sortingList(sort, arrSort);

        arrSort = filtredList(arrSort, filter);

        if (search) arrSort = arrSort.filter((item) => item[paramSearch].indexOf(search) > -1);

        return arrSort;
    }
);

export const { addToDelete } = actions;
