import s from "./SliderCarusel.module.scss";

import { randomId } from "../../service/RandomId";

import { useState, useEffect } from "react";

export const SliderCarusel = ({ children }) => {
    const initialState = children ? children.length - 1 : 0;
    const [slide, setSlide] = useState(0);
    const [activeLine, setActiveLine] = useState(false);

    const changeSize = () => {
        const widthWrapper = document.querySelector(`.${s.sliderCarusel__wrapper}`);
        const currenWidth = window.getComputedStyle(widthWrapper).getPropertyValue("width");
        if(currenWidth.slice(0, -2) <= 769){
            setActiveLine(true)
        } else if (currenWidth.slice(0, -2) > 769){
            setActiveLine(false)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', changeSize)
        return function () {
            window.removeEventListener('resize', changeSize) 
        }
    }, [])

    const changeSlide = (param) => {
        if(!activeLine) return;
        if (slide === 0) {
            param === "+" ? setSlide((slide) => slide + 1) : setSlide(initialState);
        } else if (slide === initialState) {
            param === "-" ? setSlide((slide) => slide - 1) : setSlide(0);
        } else {
            param === "+" ? setSlide((slide) => slide + 1) : setSlide((slide) => slide - 1);
        }
    };

    const createItems = (data) => {
        if (!data) return null;
        return data.map((item) => {
            return (
                <div key={randomId()} className={`${s.sliderCarusel__item}`}>
                    {item}
                </div>
            );
        });
    };

    const items = createItems(children);

    return (
        <>
            <div className={`${s.sliderCarusel} bBlock `}>
                <div className={`${s.sliderCarusel__wrapper}`}>
                    <div
                        style={{ transform: `translateX(-${100 * slide}%)` }}
                        className={`${s.sliderCarusel__line} ${activeLine && s.sliderCarusel__line_active}`}
                    >
                        {/* <div className={`${s.sliderCarusel__item} ${s.sliderCarusel__item_red}`}>1</div>
                        <div className={`${s.sliderCarusel__item} ${s.sliderCarusel__item_green}`}>2</div>
                        <div className={`${s.sliderCarusel__item} ${s.sliderCarusel__item_blue}`}>3</div> */}
                        {items}
                    </div>
                </div>
            </div>
            <button onClick={() => changeSlide("+")}>вперед</button>
            <button onClick={() => changeSlide("-")}>назад</button>
        </>
    );
};
