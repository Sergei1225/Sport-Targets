import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestBase } from "../../service/RequestBase";

export const setDataTrening = createAsyncThunk("dataBase/setDataTrening", async (action) => {
    const { simpleReqest } = RequestBase();
    return Promise.all(["dataBase", "dataAerobic"].map((item) => simpleReqest(item)));
});

const initialState = {
    dataBase: null,
    dataAerobic: null,
    statusLoading: "loading",
};

const sliceDataBase = createSlice({
    name: "dataBase",
    initialState: initialState,
    reducers: {
        setDataBase: (state, { payload }) => {
            state.dataBase = payload;
        },
        setDataAerobic: (state, { payload }) => {
            state.dataAerobic = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setDataTrening.pending, (state, action) => {
            //console.log(action);
        });
        builder.addCase(setDataTrening.fulfilled, (state, { payload }) => {
            const [base, aerobic] = payload;
            state.dataBase = base;
            state.dataAerobic = aerobic;
            state.statusLoading = "content";
        });
        builder.addCase(setDataTrening.rejected, (state, action) => {
            console.log(action.error.message);
            state.statusLoading = "error";
        });
    },
});

const { reducer, actions } = sliceDataBase;

export default reducer;

export const { setDataBase, setDataAerobic } = actions;
