import { configureStore } from "@reduxjs/toolkit";
import  navBar  from "../component/NavBar/sliceNavBar";
import listCreateTrening from '../component/CreateTreningPage/ListTrening/listSliceCreateTrening';
import selectExercise from '../component/ChooseExercisePage/SelectExercise/sliceSelectExercise';
import dataBase from "../component/App/sliceDataBase";
import listExercise from '../component/ChooseExercisePage/ListExercise/sliceListExercise';
import constrTrening from '../component/CreateTreningPage/ConstrTrening/sliceConstrTrening';

const stringMiddleware = () => (next) => (action) => {
    return typeof action === 'string' ? next({ type: action }) : next(action);
};

const store = configureStore({
    reducer: {
        dataBase,
        navBar,
        listCreateTrening,
        selectExercise, 
        listExercise,
        constrTrening
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
