import s from "./TargetShow.module.scss";

import { TargetProgress } from "../TargetProgress/TargetProgress";

import { getDataTargetWeigth, setDataTargetShow } from "./sliceTargetShow";
import { SliderCarusel } from "../../../serviceComponents/Sliders/SliderCarusel";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const TargetShow = ({ stateSlider, loadingData, stateData }) => {
    if (!loadingData) loadingData = "local";

    const [activeLine, setActiveLine] = useState(stateSlider);

    const dataWeigth = useSelector((state) => state.showTargetWeigth.weigthTarget);
    const dispatch = useDispatch();

    const changeSize = () => {
        const widthWrapper = document.querySelector(`.${s.targetShow}`);
        const currenWidth = window.getComputedStyle(widthWrapper).getPropertyValue("width");
        if (currenWidth.slice(0, -2) <= 789) {
            setActiveLine(true);
        } else if (currenWidth.slice(0, -2) > 789) {
            setActiveLine(false);
        }
    };

    useEffect(() => {
        if (loadingData === "local") {
            dispatch(getDataTargetWeigth());
        } else if (loadingData === "global") {
            if (stateData) dispatch(setDataTargetShow(stateData));
        }
    }, [stateData]);

    useEffect(() => {
        if (!stateSlider) {
            window.addEventListener("resize", changeSize);
            return function () {
                window.removeEventListener("resize", changeSize);
            };
        }
    }, []);

    if (!dataWeigth) return <h3>Loading...</h3>;

    const createItemsWeigth = (data) => {
        if (!data) return null;
        return data.map((item) => {
            return (
                <div key={item.id} className={`${s.targetShow__item} `}>
                    <TargetProgress
                        remainder={item.remainder}
                        target={item.target}
                        valueAbsolute={item.valueAbsolute}
                        valuePercent={item.valuePercent}
                        paramProgress={item.paramProgress}
                        nameSvg={item.paramProgress}
                        styleSvg={" bSizeIconVeryBigFlex"}
                    />
                </div>
            );
        });
    };

    const itemsWeigth = createItemsWeigth(dataWeigth);

    return (
        <div className={`${s.targetShow}`}>
            {activeLine ? (
                <SliderCarusel sizeSlider={s.targetShow__slider}>{itemsWeigth}</SliderCarusel>
            ) : (
                <div className={`${s.targetShow__wrapper} bBlock bFlex bFlexJCSB`}>{itemsWeigth}</div>
            )}
        </div>
    );
};
