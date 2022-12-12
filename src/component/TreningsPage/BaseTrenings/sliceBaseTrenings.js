import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import useRequest from "../../services/hookRequest";
import { ResponseInfo } from "../../services/Request";

export const dataTrenFetching = createAsyncThunk("base/traningsFetching", async () => {
    const { request } = useRequest();
    return await request("http://localhost:3001/dataTren");
});

const initialState = {
    dataTren: [],
    loadingStatus: "idle",
    visibleView: "list",
    forDeleteItems: ''
};

const sliceBaseTrenings = createSlice({
    name: "base",
    initialState,
    reducers: {
        baseDeleteItem: (state, action) => {
            state.dataTren = state.dataTren.filter((item) => item.id !== action.payload);
            const { response } = ResponseInfo();
            const urlDelete = `http://localhost:3001/dataTren/${action.payload}`;

            response(urlDelete, "DELETE")
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        },
        changeView: (state, action) => {
            state.visibleView = action.payload;
        },
        changeForDelete: (state, action) => {

        },
        baseChangeProp: {
            reducer: (state, {payload}) => {
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

const { actions, reducer } = sliceBaseTrenings;

export default reducer;

const sortData = (data, sortProp) => {
    let sortedArr = null;

    switch (sortProp) {
        case "name":
            const collatore = new Intl.Collator("ru-Ru");
            sortedArr = data
                .slice()
                .sort((a, b) => collatore.compare(a["treningsName"], b["treningsName"]));
            return sortedArr;
        case "date":
            sortedArr = data.slice().sort((a, b) => (a[sortProp] > b[sortProp] ? 1 : -1));
            return sortedArr;
        default:
            return data;
    }
};

const filterData = (data, filterValue) => {
    switch (filterValue) {
        case "all":
            return data;
        case "favorite":
            return data.filter((item) => item.favorite);
        case "full":
            return data.filter((item) => item.full);
        default:
            return data;
    }
};

const searchData = (data, searchValue, searchParameter) => {
    if (searchValue === "") {
        return data;
    } else {
        return data.filter(
            (item) =>
                item[searchParameter].toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) >
                -1
        );
    }
};

export const filtredItems = createSelector(
    (state) => state.base.dataTren,
    (state) => state.headerMyTren.sortProp,
    (state) => state.filterTrens.filterValue,
    (state) => state.searchTrenings.searchValue,
    (state) => state.searchTrenings.searchParameter,

    (data, sortProp, filter, searchValue, searchParameter) => {
        const sortedData = sortData(data, sortProp);
        const filtredData = filterData(sortedData, filter);
        const serchedData = searchData(filtredData, searchValue, searchParameter);

        return serchedData;
    }
);

export const { baseDeleteItem, baseChangeProp, changeView, changeForDelete } = actions;
