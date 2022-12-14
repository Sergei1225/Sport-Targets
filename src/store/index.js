import { configureStore } from "@reduxjs/toolkit";


// база данных с тренировками
import dataBase from "../component/App/sliceDataBase";

import navBar from "../component/NavBar/sliceNavBar";
import listCreateExersice from "../component/CreateTreningPage/ListTrening/sliceListCreateExersice";
import selectExercise from "../component/ChooseExercisePage/SelectExercise/sliceSelectExercise";
import listExercise from "../component/ChooseExercisePage/ListExercise/sliceListExercise";
import constrTrening from "../component/CreateTreningPage/ConstrTrening/sliceConstrTrening";
// страница отбражения тренировок
import searchTrenings from "../component/TreningsPage/SearchTrenings/sliceSearchTrenings";
import filterTrens from "../component/TreningsPage/FiltersTren/sliceFilterTren";
import listTrenings from "../component/TreningsPage/ListTrenings/sliceListTrenings";
// страница с целью
import treningWeigth from "../component/TargetPage/TreningTarget/sliceTreningTarget";
import targetWeigthRanges from "../component/TargetPage/TargetWeigth/TargetWeightRanges/sliceTargetWeightRanges";
import showTargetWeigth from "../component/TargetPage/TargetShow/sliceTargetShow";
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
        searchTrenings,
        filterTrens,
        listEditorTrening,
        constrEditorTrening,
        treningWeigth,
        targetWeigthRanges,
        showTargetWeigth
    },

    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
    // devTools: process.env.NODE_ENV !== "production",
});

export default store;
