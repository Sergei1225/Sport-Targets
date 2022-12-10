import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    limit: 10,
};

const sliceListExercise = createSlice({
    name: "listExercise",
    initialState: initialState,
    reducers: {
        setDataLimit: (state, { payload }) => {
            state.dataList = payload;
        },
    },
});

const { actions, reducer } = sliceListExercise;

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
} = actions;

export const listMainItems = createSelector(
    (state) => state.selectExercise.selectedItems,
    (state) => state.dataBase.dataBase,
    (state) => state.dataBase.dataAerobic,
    (state) => state.selectExercise.base,
    (state) => state.selectExercise.detail,
    (state) => state.listExercise.limit,
    (selected, base, aerobic, valueCheck, detail, limit) => {
        if (!base || !aerobic) return null;
        if (valueCheck === "basic") {
            const filterDetail =
                detail !== "all"
                    ? base.filter((item) =>
                          item.workingParts.some((itemPart) => itemPart === detail)
                      )
                    : base;
            return selected.length === 0
                ? filterDetail.slice(0, limit)
                : filterDetail
                      .filter((item) => !selected.some((itemSelect) => itemSelect === item.id))
                      .slice(0, limit);
        } else if (valueCheck === "aerobic") {
            return selected.length === 0
                ? aerobic.slice(0, limit)
                : aerobic
                      .filter((item) => !selected.some((itemSelect) => itemSelect === item.id))
                      .slice(0, limit);
        }
    }
);

export const listAllItems = createSelector(
    (state) => state.dataBase.dataBase,
    (state) => state.dataBase.dataAerobic,
    (state) => state.selectExercise.base,
    (state) => state.selectExercise.detail,
    (state) => state.listExercise.limit,
    (base, aerobic, valueCheck, detail, limit) => {
        if (!base || !aerobic) return null;
        if (valueCheck === "basic") {
            const filterDetail =
                detail !== "all"
                    ? base.filter((item) =>
                          item.workingParts.some((itemPart) => itemPart === detail)
                      )
                    : base;
            return filterDetail.slice(0, limit);
        } else if (valueCheck === "aerobic") {
            return aerobic.slice(0, limit);
        }
    }
);
