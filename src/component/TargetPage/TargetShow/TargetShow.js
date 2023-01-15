import s from "./TargetShow.module.scss";

import { TargetProgress } from "../TargetProgress/TargetProgress";

import { getDataTargetWeigth } from "./sliceTargetShow";
import { SliderCarusel } from "../../../serviceComponents/Sliders/SliderCarusel";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const TargetShow = ({ stateSlider }) => {
    const [activeLine, setActiveLine] = useState(stateSlider);

    const dataWeigth = useSelector((state) => state.showTargetWeigth.weigthTarget);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataTargetWeigth());
    }, []);

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
