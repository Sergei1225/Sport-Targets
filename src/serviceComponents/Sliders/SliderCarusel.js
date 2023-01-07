import s from "./SliderCarusel.module.scss";

import { randomId } from "../../service/RandomId";
import { GetSvg } from "../GetSvg/GetSvg";

import { useState, useMemo } from "react";

export const SliderCarusel = ({ children, sizeSlider }) => {
    const initialState = children ? children.length - 1 : 0;
    const [slide, setSlide] = useState(0);

    const changeSlide = (param) => {
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

    const createIdsNavigate = (data) => {
        const arrItems = [];
        for (let i = 0; i < data.length; i++) {
            arrItems.push(randomId());
        }
        return arrItems;
    };

    const idsNavigate = useMemo(() => createIdsNavigate(children), [children]);

    const creteNavigateItems = (data, current) => {
        const arrItems = [];
        for (let i = 0; i < data.length; i++) {
            if (current === i) {
                arrItems.push(
                    <div
                        key={idsNavigate[i]}
                        onClick={() => setSlide(i)}
                        className={`${s.sliderCarusel__index} ${s.sliderCarusel__index_active}`}
                    ></div>
                );
            } else {
                arrItems.push(
                    <div key={idsNavigate[i]} onClick={() => setSlide(i)} className={`${s.sliderCarusel__index}`}></div>
                );
            }
        }
        return arrItems;
    };

    const items = useMemo(() => createItems(children), [children]);
    const itemsNavigate = useMemo(() => creteNavigateItems(children, +slide), [children, slide]);

    return (
        <div className={`${s.sliderCarusel} bBlock ${sizeSlider}`}>
            <div className={`${s.sliderCarusel__wrapper}`}>
                <div
                    style={{ transform: `translateX(-${100 * slide}%)` }}
                    className={`${s.sliderCarusel__line} ${s.sliderCarusel__line_active}`}
                >
                    {items}
                </div>
                <div
                    onClick={() => changeSlide("+")}
                    className={`${s.sliderCarusel__arrow} ${s.sliderCarusel__arrow_rigth} ${s.sliderCarusel__arrow_active} bSizeIconSmall`}
                >
                    <GetSvg nameSvg={"arrow"} />
                </div>
                <div
                    onClick={() => changeSlide("-")}
                    className={`${s.sliderCarusel__arrow} ${s.sliderCarusel__arrow_left} ${s.sliderCarusel__arrow_active} bSizeIconSmall `}
                >
                    <GetSvg nameSvg={"arrow"} />
                </div>
            </div>
            <div className={`${s.sliderCarusel__navigate}  ${s.sliderCarusel__navigate_active} bElement`}>
                {itemsNavigate}
            </div>
        </div>
    );
};
