import s from "./TimeRange.module.scss";

import { CustomTitle, CustomRange } from "../../../BaseComponents/CustomComponents";
import { TargetProgress } from "../../TargetProgress/TargetProgress";

import { workDataProgressBar } from "../../workDataProgressBar";

import { useState, useEffect } from "react";

export const TimeRange = (props) => {
    const { remainderNow, remainderStart, resultValueAbsolute, resultValuePercent } =
        workDataProgressBar();

    const { paramTime, start, end, result, paramProgress, dataRange, saveResult } = props;

    const { id, title, subtile, paramRange, targetProgress, startState } = dataRange;
    
    useEffect(() => {
        let targetValue;
        let resultValue;
        if (end) {
            if (paramTime === "days") {
                targetValue = +end;
                resultValue = +end - +result;
            } else {
                targetValue = remainderStart(+end, +start);
                resultValue = remainderNow(+end);
            }
            /// записал в стейт и перевел из милисек в дни
            setValueEnd(targetValue);
            setValueNow(resultValue);
        }
    }, [start, end]);

    const [valueEnd, setValueEnd] = useState(0);
    const [valueNow, setValueNow] = useState(0);

    // дней прошло или результат
    const resultDays = resultValueAbsolute(+valueEnd, +valueNow);
    // результат в процентах
    const resultDayPercent = resultValuePercent(+valueEnd, +valueNow);

    const changeValue = (value) => {
        setValueEnd(+value);
        setValueNow(0);
        saveResult(value)
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
                    value={resultDayPercent}
                    remainder={valueNow}
                    endTarget={valueEnd}
                    result={resultDays}
                    param={paramProgress}
                />
            </div>
        </div>
    );
};
