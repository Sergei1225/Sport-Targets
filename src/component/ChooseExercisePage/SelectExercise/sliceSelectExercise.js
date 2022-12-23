import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";

import { dataChoose } from "../dataForChoose";

import { randomId } from "../../../service/RandomId";
import { RequestBase } from "../../../service/RequestBase";

const { simpleReqest } = RequestBase();

export const saveExercise = createAsyncThunk("selectExercise/saveExercise", async (action) => {
    const {data, path} = action;
    const changeObj = data.map((item) => ({ ...item, id: randomId() }));
    await Promise.all(changeObj.map(item => simpleReqest(path, "POST", item)))
});

export const saveExerciseTarget = createAsyncThunk("selectExercise/saveExerciseTarget", async (action) => {
    const {data, path} = action;
    const changeObj = {selectedExercise: {...data[0], id: randomId() }}
    console.log(changeObj);
    await simpleReqest(path, "PATCH", changeObj)
});

const initialState = {
    dataList: dataChoose,
    selectedItems: [],
    countSelect: 0,
    multi: false,
    base: "basic",
    detail: "all",
};

const sliceSelectExercise = createSlice({
    name: "selectExercise",
    initialState: initialState,
    reducers: {
        setDataChoise: (state, { payload }) => {
            state.dataList = payload;
        },
        changeMulti: (state, { payload }) => {
            state.multi = payload;
        },
        changeBase: (state, { payload }) => {
            state.base = payload;
        },
        changeDetail: (state, { payload }) => {
            state.detail = payload;
        },
        addSelectedItem: (state, { payload }) => {
            if (Array.isArray(payload)) {
                state.selectedItems = [...state.selectedItems, ...payload];
            } else {
                state.selectedItems = [...state.selectedItems, payload];
            }
        },
        addSelectedItemOnlyOne: (state, { payload }) => {
            state.selectedItems = [ payload ];
        },
        deleteSelectItem: (state, { payload }) => {
            state.selectedItems = state.selectedItems.filter((item) => item !== payload);
        },
        deleteAllSelectItems: (state) => {
            state.selectedItems = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveExercise.pending, (state, action) => {});
        builder.addCase(saveExercise.fulfilled, (state, action) => {
            console.log("отправка завершена");
            state.selectedItems = [];
        });
        builder.addCase(saveExercise.rejected, (state, action) => {});
        builder.addCase(saveExerciseTarget.fulfilled, (state, action) => {
            console.log("отправка завершена target");
            state.selectedItems = [];
        });
        builder.addCase(saveExerciseTarget.rejected, (state, action) => {});
    },
});

const { actions, reducer } = sliceSelectExercise;

export default reducer;

export const {
    setDataChoise,
    deleteSelectItem,
    addSelectedItem,
    addSomeSelectedItem,
    changeMulti,
    changeBase,
    changeDetail,
    deleteAllSelectItems,
    addSelectedItemOnlyOne
} = actions;

export const listItems = createSelector(
    (state) => state.selectExercise.selectedItems,
    (state) => state.dataBase.dataBase,
    (state) => state.dataBase.dataAerobic,
    (state) => state.selectExercise.base,
    (state) => state.selectExercise.detail,
    (selected, base, aerobic, valueCheck, detail) => {
        if (!base || !aerobic) return null;
        if (valueCheck === "basic") {
            const filterDetail =
                detail !== "all"
                    ? base.filter((item) =>
                          item.workingParts.some((itemPart) => itemPart === detail)
                      )
                    : base;
            return selected.length === 0
                ? filterDetail
                : filterDetail.filter(
                      (item) => !selected.some((itemSelect) => itemSelect === item.id)
                  );
        } else if (valueCheck === "aerobic") {
            return selected.length === 0
                ? aerobic
                : aerobic.filter((item) => !selected.some((itemSelect) => itemSelect === item.id));
        }
    }
);

export const dataDetail = createSelector(
    (state) => state.dataBase.dataBase,
    (base) => {
        if (!base) return null;
        let filterData = [];
        base.forEach((item) => {
            if (filterData.length === 0) filterData = ["all", ...item.workingParts];
            else {
                const notRepetitive = item.workingParts.filter(
                    (itemPath) => !filterData.some((itemData) => itemData === itemPath)
                );
                if (notRepetitive.length !== 0) filterData = [...filterData, ...notRepetitive];
            }
        });
        return filterData.map((item) => ({ id: randomId(), value: item }));
    }
);

export const selectedItems = createSelector(
    (state) => state.selectExercise.selectedItems,
    (state) => state.dataBase.dataBase,
    (state) => state.dataBase.dataAerobic,
    (selected, base, aerobic) => {
        if (!base || !aerobic) return null;
        if (selected.length === 0) return null;
        const baseItems = base.filter((item) =>
            selected.some((itemSelect) => itemSelect === item.id)
        );
        const baseAerobic = aerobic.filter((item) =>
            selected.some((itemSelect) => itemSelect === item.id)
        );
        return selected.map((item) => {
            return (
                baseItems.find((itemFind) => itemFind.id === item) ??
                baseAerobic.find((itemFind) => itemFind.id === item)
            );
        });
    }
);
