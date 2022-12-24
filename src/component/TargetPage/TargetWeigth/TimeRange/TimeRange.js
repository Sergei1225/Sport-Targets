import s from "./TimeRange.module.scss";

import { CustomTitle, CustomRange } from "../../../BaseComponents/CustomComponents";
import { TargetProgress } from "../../TargetProgress/TargetProgress";

import { workDataProgressBar } from "../../workDataProgressBar";
import { dataRanges } from "../dataRanges";

import { useState, useEffect } from "react";

export const TimeRange = (props) => {
    const { daysRemainderNow, daysRemainderStart, getPercentValue } = workDataProgressBar();

    const { dataTime } = props;

    const { id, title, subtile, paramRange, targetProgress, startState } = dataRanges[1];

    const createTimeObj = (data) => {
        // остаток remaider
        const remaiderDaysStart = daysRemainderNow(+data.end);
        // всего дней endTarget
        const endTargetDays = daysRemainderStart(+data.end, +data.start);
        // дней прошло или результат
        const resultDays = +endTargetDays - +remaiderDaysStart;
        // в процентах сколько дней прошло
        const percentComplited = getPercentValue(endTargetDays, resultDays);

        return {
            remaiderDaysStart: remaiderDaysStart,
            resultDays: resultDays,
            percentComplited: percentComplited,
        };
    };

    useEffect(() => {
        if (dataTime) {
            setValueEnd(daysRemainderStart(+dataTime?.end, +dataTime?.start));
            setTimeObj(createTimeObj(dataTime));
        }
    }, [dataTime]);

    const [valueEnd, setValueEnd] = useState(0);
    const [timeObj, setTimeObj] = useState({
        remaiderDaysStart: 0,
        resultDays: 0,
        percentComplited: 0,
    });

    const changeValue = (value) => {
        setValueEnd(value);
        if (timeObj.resultDays !== 0) {
            setTimeObj({
                remaiderDaysStart: 0,
                resultDays: 0,
                percentComplited: 0,
            });
        }
    };

    return (
        <div className={`${s.timeRange} basePositionBlock baseFlex`}>
            <div className={`${s.timeRange__info}`}>
                <CustomTitle title={title} subtile={subtile} />
                <CustomRange
                    getValue={changeValue}
                    max={365}
                    min={0}
                    {...paramRange}
                    startState={startState}
                />
            </div>
            <div className={`${s.timeRange__bar}`}>
                <TargetProgress
                    value={timeObj.percentComplited}
                    remainder={timeObj.remaiderDaysStart}
                    endTarget={valueEnd}
                    result={timeObj.resultDays}
                    param={targetProgress.param}
                />
            </div>
        </div>
    );
};
