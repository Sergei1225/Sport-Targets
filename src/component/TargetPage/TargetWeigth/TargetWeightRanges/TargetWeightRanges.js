import { WeightRange } from "../WeightRange/WeightRange";
import { SimpleRange } from "../SimpleRange/SimpleRange";
import { TimeRange } from "../TimeRange/TimeRange";

import { dataRanges } from "../dataRanges";
import { workDataProgressBar } from "../../workDataProgressBar";

import { rangesData } from "./sliceTargetWeightRanges";

import { useSelector } from "react-redux";

export const TargetWeightRanges = () => {
    const data = useSelector(rangesData);

    const { daysRemainderNow, daysRemainderStart } = workDataProgressBar();

    const paramValues = useSelector((state) => state.treningWeigth.paramTrening);
    const weightParam = data?.weight ? data?.weight : { start: 0, end: 0 };
    const timeParam = data?.time ? data.time : 0;
    const treningsParam = data?.trenings ? data?.trenings : 0;

    const timeRemaider = daysRemainderNow(timeParam);
    const result = data?.resultWeigth ? data.resultWeigth.map(item => item.result) : 0;

    return (
        <div>
            <TimeRange dataTime={timeParam} />
            <WeightRange start={weightParam.start} end={weightParam.end} result={result} />
        </div>
    );
};
