import { configureStore } from "@reduxjs/toolkit";

import navBar from "../component/NavBar/sliceNavBar";
import listCreateExersice from "../component/CreateTreningPage/ListTrening/sliceListCreateExersice";
import selectExercise from "../component/ChooseExercisePage/SelectExercise/sliceSelectExercise";
import dataBase from "../component/App/sliceDataBase";
import listExercise from "../component/ChooseExercisePage/ListExercise/sliceListExercise";
import constrTrening from "../component/CreateTreningPage/ConstrTrening/sliceConstrTrening";
import headerTrenings from "../component/TreningsPage/HeaderTrening/sliceHeaderTrenings";
import searchTrenings from "../component/TreningsPage/SearchTrenings/sliceSearchTrenings";
import filterTrens from "../component/TreningsPage/FiltersTren/sliceFilterTren";
import listTrenings from "../component/TreningsPage/ListTrenings/sliceListTrenings";

/// univer
import listEditorTrening from "../component/EditorTreningPage/ListEditorTrening/sliceListEditorTrening";
import constrEditorTrening from "../component/EditorTreningPage/ConstrEditorTrening/sliceConstrEditorTrenings";

const stringMiddleware = () => (next) => (action) => {
    return typeof action === "string" ? next({ type: action }) : next(action);
};

const store = configureStore({
    reducer: {
        dataBase,
        navBar,
        listCreateExersice,
        selectExercise,
        listExercise,
        constrTrening,
        listTrenings,
        headerTrenings,
        searchTrenings,
        filterTrens,
        listEditorTrening,
        constrEditorTrening,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
