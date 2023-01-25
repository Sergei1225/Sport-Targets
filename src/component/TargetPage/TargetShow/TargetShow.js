import s from "./TargetShow.module.scss";

import { TargetProgress } from "../TargetProgress/TargetProgress";

import { getDataTargetWeigth, setDataTargetShow } from "./sliceTargetShow";
import { SliderCarusel } from "../../../serviceComponents/Sliders/SliderCarusel";
import { ContentLoading } from "../../../serviceComponents/ContentLoading/ContentLoading";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const TargetShow = ({ stateSlider, loadingData = "local", stateData }) => {
    const [activeLine, setActiveLine] = useState(stateSlider);

    const dataWeigth = useSelector((state) => state.showTargetWeigth.weigthTarget);
    const statusLoading = useSelector((state) => state.showTargetWeigth.statusLoading);
    const errorStatus = useSelector((state) => state.showTargetWeigth.errorStatus);
    const updateItems = useSelector((state) => state.listTrenings.upDateItem);
    const dispatch = useDispatch();

    const changeSize = () => {
        const widthWrapper = document.querySelector(`.${s.targetShow}`);
        const currenWidth = window.getComputedStyle(widthWrapper).getPropertyValue("width");
        if (currenWidth.slice(0, -2) <= 870) {
            setActiveLine(true);
        } else if (currenWidth.slice(0, -2) > 870) {
            setActiveLine(false);
        }
    };

    useEffect(() => {
        if (loadingData === "local") {
            dispatch(getDataTargetWeigth());
        } else if (loadingData === "global") {
            if (stateData) dispatch(setDataTargetShow(stateData));
        }
    }, [stateData, updateItems]);

    useEffect(() => {
        if (!stateSlider) {
            window.addEventListener("resize", changeSize);
            return function () {
                window.removeEventListener("resize", changeSize);
            };
        }
    }, []);

    const createItemsWeigth = (data, activeLine) => {
        if (!data) return null;
        const items = data.map((item) => {
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

        if (activeLine) {
            return <SliderCarusel sizeSlider={s.targetShow__slider}>{items}</SliderCarusel>;
        } else {
            return <div className={`${s.targetShow__wrapper} bBlock bFlex bFlexJCSB`}>{items}</div>;
        }
    };

    const itemsWeigth = createItemsWeigth(dataWeigth, activeLine);

    return (
        <div className={`${s.targetShow}`}>
            <ContentLoading
                loadingStatus={statusLoading}
                itemsTrening={itemsWeigth}
                errorStatus={errorStatus}
                textLoading={"Loading targets..."}
            />
        </div>
    );
};
