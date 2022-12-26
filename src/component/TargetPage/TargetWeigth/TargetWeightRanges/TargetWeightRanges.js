import { WeightRange } from "../WeightRange/WeightRange";
import { SimpleRange } from "../SimpleRange/SimpleRange";
import { TimeRange } from "../TimeRange/TimeRange";

import { dataRanges } from "../dataRanges";

import { rangesData, saveTargetWeigth, saveTargetTime, saveTargetTrenings } from "./sliceTargetWeightRanges";

import { useSelector, useDispatch } from "react-redux";
import { CustomButton } from "../../../BaseComponents/CustomComponents";

export const TargetWeightRanges = () => {
    const data = useSelector(rangesData);

    const dispatch = useDispatch();

    const paramValues = useSelector((state) => state.treningWeigth.paramTrening);
    const dataY = useSelector((state) => state.targetWeigthRanges);

    console.log(dataY);

    /// данные для прогрессбара с днями
    const timeParam = data?.time ? data.time : 0;

    /// данные для прогрессбара с весом
    const resultWeigth = data?.resultTrenings
        ? Math.max(data.resultTrenings.map((item) => item.result))
        : 0;
    const weightParam = data?.weight ? data?.weight : { start: 0, end: 0 };

    /// данные для прогрессбара с тренировками
    const valueTrenings = data?.trenings ? data.trenings : 0;
    const resultTrenings = data?.resultTrenings.length ? data?.resultTrenings.length : 0;

    const saveTargetWeigthValue = (value) => {
        dispatch(saveTargetWeigth(value));
    };

    const saveTargetTimeValue = (value) => {
        dispatch(saveTargetTime(value));
    };

    const saveTargetTreningsValue = (value) => {
        console.log(value);
        dispatch(saveTargetTrenings(value));
    };

    return (
        <div>
            <div className={`basePositionBlock baseFlex`}>
                <CustomButton
                    //funk={deleteAllTunnings}
                    innerValue={"Save target"}
                />
            </div>
            <WeightRange
                saveResult={saveTargetWeigthValue}
                start={weightParam.start}
                end={weightParam.end}
                result={resultWeigth}
            />
            {paramValues.some((i) => i === "time") ? (
                <TimeRange
                    saveResult={saveTargetTimeValue}
                    start={timeParam.start}
                    end={timeParam.end}
                    paramTime={"milisec"}
                    paramProgress={" days"}
                    dataRange={dataRanges[1]}
                />
            ) : null}
            {paramValues.some((i) => i === "trenings") ? (
                <TimeRange
                    saveResult={saveTargetTreningsValue}
                    start={0}
                    end={valueTrenings}
                    paramTime={"days"}
                    result={resultTrenings}
                    paramProgress={" trenings"}
                    dataRange={dataRanges[1]}
                />
            ) : null}
        </div>
    );
};
