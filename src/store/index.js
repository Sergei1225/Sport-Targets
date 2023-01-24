import { configureStore } from "@reduxjs/toolkit";


// база данных с тренировками
import dataBase from "../component/App/sliceDataBase";

import navBar from "../component/NavBar/sliceNavBar";
import selectExercise from "../component/ChooseExercisePage/SelectExercise/sliceSelectExercise";
import listExercise from "../component/ChooseExercisePage/ListExercise/sliceListExercise";

// страница отбражения тренировок
import searchTrenings from "../component/TreningsPage/SearchTrenings/sliceSearchTrenings";
import filterTrens from "../component/TreningsPage/FiltersTren/sliceFilterTren";
import listTrenings from "../component/TreningsPage/ListTrenings/sliceListTrenings";
// страница с целью
import showTargetWeigth from "../component/TargetPage/TargetShow/sliceTargetShow";
import targetPage from "../component/TargetPage/sliceTargetPage";
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
        selectExercise,
        listExercise,
        listTrenings,
        searchTrenings,
        filterTrens,
        listEditorTrening,
        constrEditorTrening,
        showTargetWeigth,
        targetPage
    },

    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
    // devTools: process.env.NODE_ENV !== "production",
});

export default store;
