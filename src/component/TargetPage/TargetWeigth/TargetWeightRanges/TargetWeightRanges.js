import { WeightRange } from "../WeightRange/WeightRange";
import { SimpleRange } from "../SimpleRange/SimpleRange";
import { WrapperRange } from "../TimeRange/WrapperRange";

import { dataRanges } from "../dataRanges";

import {
    rangesData,
    saveTargetWeigth,
    saveTargetTime,
    saveTargetTrenings,
    rangesTransformData,
} from "./sliceTargetWeightRanges";

import { useSelector, useDispatch } from "react-redux";
import { CustomButton } from "../../../BaseComponents/CustomComponents";
import { TargetShow } from "../../TargetShow/TargetShow";

export const TargetWeightRanges = () => {
    const dispatch = useDispatch();

    const paramValues = useSelector((state) => state.treningWeigth.paramTrening);
    const transformData = useSelector(rangesTransformData);
    const dataY = useSelector((state) => state.targetWeigthRanges);

    console.log(dataY);

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

    const saveTargetWeigthValue = (value) => {
        dispatch(saveTargetWeigth(value));
    };

    const saveTargetTimeValue = (value) => {
        dispatch(saveTargetTime(value));
    };

    const saveTargetTreningsValue = (value) => {
        dispatch(saveTargetTrenings(value));
    };

    return (
        <div>
            <TargetShow/>
            <div className={`basePositionBlock baseFlex`}>
                <CustomButton
                    //funk={deleteAllTunnings}
                    innerValue={"Save target"}
                />
            </div>
            <WeightRange
                saveResult={saveTargetWeigthValue}
                target={weigthTransform.target}
                startWeigth={weigthTransform.startWeigth}
                result={weigthTransform.result}
            />
            {paramValues.some((i) => i === "time") ? (
                <WrapperRange
                    saveResult={saveTargetTimeValue}
                    remainder={timeTransform.remainder}
                    target={timeTransform.target}
                    paramTime={"milisec"}
                    paramProgress={" days"}
                    dataRange={dataRanges[1]}
                />
            ) : null}
            {paramValues.some((i) => i === "trenings") ? (
                <WrapperRange
                    saveResult={saveTargetTreningsValue}
                    remainder={treningsTransform.remainder}
                    target={treningsTransform.target}
                    paramTime={"trenings"}
                    result={treningsTransform.result}
                    paramProgress={" trenings"}
                    dataRange={dataRanges[1]}
                />
            ) : null}
        </div>
    );
};
