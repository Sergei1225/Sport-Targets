import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import { dataTreningsItems } from "./dataTreningsItems";

import { simpleSortArrObj } from "../../../service/simpleSortArrObj";

export const dataTrenFetching = createAsyncThunk("base/traningsFetching", async () => {});

const listAdapter = createEntityAdapter();

const sliceListTrenings = createSlice({
    name: "listTrenings",
    initialState: listAdapter.getInitialState({
        loadingStatus: "loading",
        forDeleteItems: [],
    }),
    reducers: {
        setTrenings: listAdapter.setAll,
        baseDeleteItem: (state, action) => {
            state.dataTren = state.dataTren.filter((item) => item.id !== action.payload);
        },
        changeView: (state, action) => {
            state.visibleView = action.payload;
        },
        changeForDelete: (state, action) => {},
        baseChangeProp: {
            reducer: (state, { payload }) => {
                state.dataTren = state.dataTren.map((item) => {
                    return item.id === payload.id
                        ? {
                              ...item,
                              [payload.prop]: !item[payload.prop],
                          }
                        : item;
                });
            },
            prepare: (id, prop) => ({
                payload: { id, prop },
            }),
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataTrenFetching.pending, (state) => {
                state.loadingStatus = "loading";
            })
            .addCase(dataTrenFetching.fulfilled, (state, action) => {
                state.loadingStatus = "content";
                state.dataTren = action.payload;
            })
            .addCase(dataTrenFetching.rejected, (state) => {
                state.loadingStatus = "error";
            });
    },
});

const { actions, reducer } = sliceListTrenings;

export default reducer;

export const selectorsAdapter = listAdapter.getSelectors((state) => state.listTrenings);

const sortingList = (sort, data, param = "up") => {
    if(!sort || !data || data.length === 0) return;
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

export const filtredItems = createSelector(
    (state) => state.listTrenings.entities,
    (state) => state.headerTrenings.sortProp,
    (state) => state.filterTrens.filterValue,

    (data, sort, filter) => {
        let arrSort = [];
        for (let item in data) arrSort.push(data[item]);
        
        if (sort) arrSort = sortingList(sort, arrSort);

        if(filter !== 'all'){
            console.log(arrSort);
            if(filter === 'future') arrSort = arrSort.filter(i => i.status === 'future')
            else if(filter === 'past') arrSort = arrSort.filter(i => i.status === 'past')
            else if(filter === 'favorite') arrSort = arrSort.filter(i => i.favorite)
        }
        console.log(arrSort);
        return arrSort;
    }
);
// export const filtredItems = createSelector(
//     (state) => state.listTrenings.dataTren,
//     (state) => state.headerMyTren.sortProp,
//     (state) => state.filterTrens.filterValue,
//     (state) => state.searchTrenings.searchValue,
//     (state) => state.searchTrenings.searchParameter,

//     (data, sortProp, filter, searchValue, searchParameter) => {
//         const sortedData = sortData(data, sortProp);
//         const filtredData = filterData(sortedData, filter);
//         const serchedData = searchData(filtredData, searchValue, searchParameter);

//         return serchedData;
//     }
// );

export const { baseDeleteItem, baseChangeProp, changeView, changeForDelete, setTrenings } = actions;
