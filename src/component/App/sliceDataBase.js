import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestBase } from "../../service/RequestBase";

const { simpleReqest } = RequestBase();

export const setDataTrening = createAsyncThunk("dataBase/setDataTrening", async () => {
    const dataRequsts = ["dataBase", "dataAerobic", "listTrenings"];
    return Promise.all(dataRequsts.map((item) => simpleReqest(item)));
});

const initialState = {
    dataBase: null,
    dataAerobic: null,
    trenings: null,
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
            const [base, aerobic, trenings ] = payload;
            state.dataBase = base;
            state.dataAerobic = aerobic;
            state.trenings = trenings;
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
