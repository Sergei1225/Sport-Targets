import s from "./WeightRange.module.scss";

import { CustomTitle, CustomRange } from "../../../BaseComponents/CustomComponents";

import { workDataProgressBar } from "../../workDataProgressBar";
import { TargetProgress } from "../../TargetProgress/TargetProgress";

import { useState, useEffect } from "react";

export const WeightRange = ({ start, end, result }) => {
    const [valueStart, setValueStart] = useState(0);
    const [valueEnd, setValueEnd] = useState(0);
    const [resultWeigth, setResultWeigth] = useState(0);

    useEffect(() => {
        setValueStart(start);
        setValueEnd(end);
        if(Array.isArray(result)){
            setResultWeigth(Math.max(...result));
        }
    }, [start, end, result]);
    

    const { weightRemainder, weightValue } = workDataProgressBar();

    const remainder = weightRemainder(+valueEnd, +result);

    const value = weightValue(+valueEnd, +result);

    const changeRange = valueStart !== 0 && valueStart > valueEnd ? valueStart : valueEnd;

    console.log(resultWeigth);

    const changeValue = (value) => {
        setValueStart(value)
        setValueEnd(value)
        setResultWeigth(0)
    }

    return (
        <div className={`${s.targetRange} basePositionBlock baseFlex`}>
            <div className={`${s.targetRange__info}`}>
                <CustomTitle
                    title={"Tuning certain weigth"}
                    subtile={
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore doloribus officiis neque tempora a quasi iste dignissimos aspernatur illum."
                    }
                />
                <CustomRange
                    startState={valueStart}
                    getValue={changeValue}
                    title={"Start weight"}
                    metering={"kg"}
                />
                <CustomRange
                    startState={changeRange}
                    min={valueStart}
                    max={+valueStart + 1000}
                    getValue={setValueEnd}
                    currentValue={valueStart}
                    title={"Certain weight"}
                    metering={"kg"}
                />
            </div>
            <div className={`${s.targetRange__bar}`}>
                <TargetProgress
                    value={value}
                    remainder={remainder}
                    endTarget={valueEnd}
                    result={resultWeigth}
                    param={"kg"}
                />
            </div>
        </div>
    );
};
