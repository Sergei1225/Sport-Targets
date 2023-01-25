import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { simpleSortArrObj } from "../../../service/simpleSortArrObj";
import { RequestBase } from "../../../service/RequestBase";
import { randomId } from "../../../service/RandomId";

const { simpleReqest } = RequestBase();

/// для изменения массива с результатами
const compareResult = (arrResult, trenExer) => {
    if (arrResult.some((item) => item.id === trenExer.id)) {
        return arrResult.filter((item) => item.id !== trenExer.id);
    } else {
        return [...arrResult, { id: trenExer.id, result: Math.max(...trenExer.weight) }];
    }
};
/// для отправки на сервер изменения веса отягощения
const changeTargetWeigth = (target, result) => {
    return {
        targetWeigth: target,
        parametrs: {
            paramProgress: "kg",
            remainder: target - result,
            target: target,
            valueAbsolute: result,
            valuePercent: +((result / target) * 100).toFixed(2),
        },
    };
};
const changeSomeTrenings = (target, result) => {
    return {
        trenings: target,
        parametrs: {
            paramProgress: "trenings",
            remainder: target - result,
            target: target,
            valueAbsolute: result,
            valuePercent: +((result / target) * 100).toFixed(2),
        },
    };
};

export const getMyTreningItems = createAsyncThunk("listTrenings/getMyTreningItems", async () => {
    return await simpleReqest("listTrenings");
});

export const favoriteTrening = createAsyncThunk("listTrenings/favoriteTrening", async (action) => {
    await simpleReqest(`listTrenings/${action.id}`, "PATCH", { favorite: !action.favorite });
    return action;
});

export const statusTrenings = createAsyncThunk("listTrenings/statusTrenings", async (action, { getState }) => {
    const statusValue = action.status === "future" ? "past" : "future";
    /// в массив я добавляю цель для будущего тк  будет много целей
    const targets = [getState().showTargetWeigth.fullTarget];
    const trenObj = getState().listTrenings.entities[action.id].listExersises;

    // если среди таргетов есть упражнение которое есть в тренировке которой я меняю статус то получаю этот таргет
    const [target] = targets.filter((tar) => trenObj.some((exersice) => exersice.name === tar.selectedExercise.name));

    if (target) {
        // получаю массив с результатами и объектом для изменения
        const { targetAchievement: resultArr, weight, someTrenings } = target;
        /// получаю то упражнение и результат
        const [treningResult] = trenObj.filter((i) => i.name === target.selectedExercise.name);
        /// создание нового результата
        const newResult = compareResult(resultArr, treningResult);
        const upDateWeigth = changeTargetWeigth(weight.targetWeigth, Math.max(...newResult.map((i) => i.result)));
        const upDateSometrenings = changeSomeTrenings(+someTrenings.trenings, newResult.length);
        // // отправка на сервер нового результата
        await simpleReqest(`newTargetWeigth`, "PATCH", {
            weight: upDateWeigth,
            targetAchievement: newResult,
            someTrenings: upDateSometrenings,
        });
    }

    await simpleReqest(`listTrenings/${action.id}`, "PATCH", { status: statusValue });
    return { id: action.id, status: statusValue };
});

export const deleteOneTrening = createAsyncThunk("listTrenings/deleteOneTrening", async (action) => {
    await simpleReqest(`listTrenings/${action}`, "DELETE");
    return action;
});

export const deleteSomeTrening = createAsyncThunk("listTrenings/deleteSomeTrening", async (_, { getState }) => {
    const ids = getState().listTrenings.listForDelete;
    if (!ids || ids.length === 0) return;
    await Promise.all(ids.map((id) => simpleReqest(`listTrenings/${id}`, "DELETE")));
    return ids;
});

const listAdapter = createEntityAdapter();

const sliceListTrenings = createSlice({
    name: "listTrenings",
    initialState: listAdapter.getInitialState({
        loadingStatus: "loading",
        errorStatus: "",
        listForDelete: [],
        upDateItem: "",
        modalAction: ""
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
        changeStatusModal: (state, { payload }) => {
            state.modalAction = payload;
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(getMyTreningItems.fulfilled, (state, { payload }) => {
            listAdapter.setAll(state, payload);
            state.loadingStatus = "contentTransition";
            console.log("данные получены тренировок");
        });
        builder.addCase(getMyTreningItems.rejected, (state, {error}) => {
            console.log("произошла ошибка getMyTreningItems");
            state.loadingStatus = "error";
            state.errorStatus = {name: error.name, message: error.message}
        });
        builder.addCase(favoriteTrening.fulfilled, (state, { payload }) => {
            listAdapter.upsertOne(state, { id: payload.id, favorite: !payload.favorite });
            console.log("Изменение приоритетности тренировки");
        });
        builder.addCase(favoriteTrening.rejected, (state, {error}) => {
            state.loadingStatus = "error";
            state.errorStatus = {name: error.name, message: error.message}
            console.log("ошибка изменения приоритетности тренировки");
        });
        builder.addCase(statusTrenings.fulfilled, (state, { payload }) => {
            listAdapter.upsertOne(state, { id: payload.id, status: payload.status });
            if (payload.id === state.upDateItem) state.upDateItem = randomId();
            else state.upDateItem = payload.id;
            console.log("Изменение статуса тренировки");
        });
        builder.addCase(statusTrenings.rejected, (state, {error}) => {
            state.loadingStatus = "error";
            state.errorStatus = {name: error.name, message: error.message}
            console.log("ошибка изменения статуса тренировки");
        });
        builder.addCase(deleteOneTrening.fulfilled, (state, { payload }) => {
            listAdapter.removeOne(state, payload);
            console.log("удалено одна тренировка ");
        });
        builder.addCase(deleteOneTrening.rejected, (state, {error}) => {
            state.loadingStatus = "error";
            state.errorStatus = {name: error.name, message: error.message}
            console.log("произошла ошибка удаления тренировки");
        });
        builder.addCase(deleteSomeTrening.fulfilled, (state, { payload }) => {
            console.log(payload);
            if (!payload || payload.length === 0) return;
            listAdapter.removeMany(state, [...state.listForDelete]);
            state.listForDelete = [];
            console.log("удалено много тренировок");
        });
        builder.addCase(deleteSomeTrening.rejected, (state, {error}) => {
            state.loadingStatus = "error";
            state.errorStatus = {name: error.name, message: error.message}
            console.log("произошла ошибка много удалений тренировок");
        });
    },
});

const { actions, reducer } = sliceListTrenings;

export default reducer;

export const selectorsAdapter = listAdapter.getSelectors((state) => state.listTrenings);

const sortingList = (value, data) => {
    if (!value) return data;

    if (value === "date") {
        return simpleSortArrObj({ data });
    } else if (value === "name") {
        return simpleSortArrObj({
            data,
            value,
            typeValue: "string",
            param: "up",
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
    (state) => state.filterTrens.sortProp,
    (state) => state.filterTrens.filterValue,
    (state) => state.searchTrenings.searchValue,
    (state) => state.searchTrenings.param,

    (data, sort, filter, search, paramSearch) => {
        if (!data || data.length === 0) {
            return null;
        } else {
            let arrItems = [];

            for (let item in data) arrItems.push(data[item]);

            arrItems = sortingList(sort, arrItems);

            arrItems = filtredList(arrItems, filter);

            if (search) arrItems = arrItems.filter((item) => item[paramSearch].indexOf(search) > -1);

            return arrItems;
        }
    }
);

export const { addToDelete, changeStatusModal } = actions;
