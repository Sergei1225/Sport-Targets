import s from "./TargetShow.module.scss";

import { FilledTargetProgress } from "../FilledTargetProgress/FilledTargetProgress";
import { TargetProgress } from "../TargetProgress/TargetProgress";

import { rangesTransformData } from "../TargetWeigth/TargetWeightRanges/sliceTargetWeightRanges";

import { useSelector, useDispatch } from "react-redux";

export const TargetShow = () => {
    const transformData = useSelector(rangesTransformData);

    let timeTransform;
    let treningsTransform;
    let weigthTransform;

    if (transformData) {
        /// трансформированная дата времени
        timeTransform = transformData?.time ? transformData.time : 0;
        /// трансформированная дата тренировок
        treningsTransform = transformData?.trenings ? transformData.trenings : 0;
        /// трансформированная дата тренировок
        weigthTransform = transformData?.weigthData ? transformData.weigthData : 0;
    } else {
        timeTransform = { target: 0, remainder: 0 };
        treningsTransform = { target: 0, remainder: 0, result: 0 };
        weigthTransform = { target: 0, result: 0, startWeigth: 0 };
    }

    const getTargetWeigth = () => {
        if (!weigthTransform.target || !weigthTransform.startWeigth) return 0;
        return +weigthTransform.target - +weigthTransform.startWeigth;
    };
    const getWeigthResult = () => {
        if (!weigthTransform.result || !weigthTransform.startWeigth) return 0;
        return +weigthTransform.result - +weigthTransform.startWeigth;
    };
    const getRemainder = () => {
        if (!targetWeigth || !weigthTransform.result || !weigthTransform.startWeigth){
            return targetWeigth;
        }
        return targetWeigth - (+weigthTransform.result - +weigthTransform.startWeigth);
    };
    const getValuePercent = () => {
        if (!weigthResult || !targetWeigth) return 0;
        return ((weigthResult / targetWeigth) * 100).toFixed(2);
    };

    const targetWeigth = getTargetWeigth();
    const weigthResult = getWeigthResult();
    const remainderA = getRemainder();
    const valuePercent = getValuePercent();

    return (
        <div className={"basePositionBlock baseFlex"}>
            <div className={s.targetShow__item}>
                <TargetProgress
                    value={valuePercent}
                    remainder={remainderA}
                    endTarget={targetWeigth}
                    result={weigthResult}
                    param={"kg"}
                />
            </div>
            <div className={s.targetShow__item}>
                <FilledTargetProgress
                    remainder={treningsTransform.remainder}
                    target={treningsTransform.target}
                    paramTime={"trenings"}
                    result={treningsTransform.result}
                    paramProgress={" trenings"}
                />
            </div>
            <div className={s.targetShow__item}>
                <FilledTargetProgress
                    paramTime={"milisec"}
                    target={timeTransform.target}
                    remainder={timeTransform.remainder}
                    paramProgress={" days"}
                />
            </div>
        </div>
    );
};
