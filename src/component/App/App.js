import s from "./App.scss";

import { Layout } from "../Layout/Layout";
import {
    ChooseExercisePage,
    TreningsPage,
    EditorTreningPage,
    TargetPage,
} from "../../pages/pages.js";

import { setDataTrening } from "./sliceDataBase";

import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const NotFound = () => <h1>Not Found</h1>;

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDataTrening());
    }, []);

    return (
        <div className={s.main}>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<TreningsPage />} />
                    <Route path="/editorTrening" element={<EditorTreningPage />} />
                    <Route path="/createTarget" element={<TargetPage />} />
                    <Route path="/chooseExerciseTargetWeigth" element={<ChooseExercisePage />} />
                    <Route path="/chooseExercise" element={<ChooseExercisePage />} />
                    <Route path="/chooseEditor" element={<ChooseExercisePage />} />
                    <Route path="/three" element={<ChooseExercisePage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

const SliderEx = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const noo = document.querySelector(".slideItem__img");
        const yoo = window.getComputedStyle(noo).getPropertyValue("width");
        console.log(yoo);
    }, []);

    const data = [
        {
            id: "sdnsdjdsjds33434",
            inner: "One",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfyV1WLSaf3B5G7n__a3Mafp2ZhzOZWYIBNw&usqp=CAU",
        },
        {
            id: "1sdnsdjdsjds33434",
            inner: "Two",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXl7cfjz3f15O0SBJPVZqFvxvdSHviRebYUw&usqp=CAU",
        },
        {
            id: "2sdnsdjdsjds33434",
            inner: "Three",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe7dBc6ZZa1iM4YCqSm5C5BobLL0iUlIyi4A&usqp=CAU",
        },
        {
            id: "3sdnsdjdsjds33434",
            inner: "Four",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Z4_tWKwxFhX5ZK61UUt7pF-2q9noK-lArA&usqp=CAU",
        },
    ];

    const changeCount = () => {
        if (current === data.length - 1) setCurrent(0);
        else setCurrent((current) => current + 1);
    };

    return (
        <>
            <div className="slideItem">
                {data.map((item, i) => {
                    const styleActive = i === current ? "slideItem__active" : "";
                    return (
                        <div key={item.id} className={`slideItem__item `}>
                            <img
                                src={item.img}
                                alt="dsds"
                                className={`slideItem__img ${styleActive}`}
                            />
                            <div className={`slideItem__inner ${styleActive}`}>
                                {item.inner.split("").map((item, i) => {
                                    return (
                                        <div className={`slideItem__inner_item ${styleActive}`}>
                                            {item}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <button onClick={changeCount}>Change</button>
        </>
    );
};
