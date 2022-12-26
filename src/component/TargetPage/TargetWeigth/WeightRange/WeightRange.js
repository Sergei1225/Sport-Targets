import s from "./WeightRange.module.scss";

import { CustomTitle, CustomRange, CustomButton } from "../../../BaseComponents/CustomComponents";

import { workDataProgressBar } from "../../workDataProgressBar";
import { TargetProgress } from "../../TargetProgress/TargetProgress";

import { useState, useEffect } from "react";

export const WeightRange = ({ start, end, result, saveResult }) => {
    const [valueStart, setValueStart] = useState(0);
    const [valueEnd, setValueEnd] = useState(0);
    const [resultWeigth, setResultWeigth] = useState(0);
    const [nextStep, setNext] = useState(false);

    const { weightRemainder, weightValue, weightTargetAbsolute, getResultWeigth } =
        workDataProgressBar();

    useEffect(() => {
        setValueStart(start);
        setValueEnd(end);
        setResultWeigth(getResultWeigth(result, +start));
    }, [start, end, result]);

    // сколько нужно достичь кг
    const weightTarget = weightTargetAbsolute(+valueEnd, +valueStart);
    // остаток
    const remainder = weightRemainder(+valueEnd, +valueStart, +resultWeigth);
    // выполнение в процентах
    const value = weightValue(+valueEnd, +valueStart, +resultWeigth);

    const changeRange = valueStart !== 0 && valueStart > valueEnd ? valueStart : valueEnd;

    const changeValue = (value) => {
        setValueStart(value);
        setValueEnd(value);
        setResultWeigth(0);
        setNext(true);
    };

    const saveResultWeigth = (valueEnd) => {
        saveResult({end: +valueEnd, start: +valueStart})
        setValueEnd(+valueEnd)
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
                {!nextStep ? (
                    <CustomRange
                        startState={valueStart}
                        getValue={changeValue}
                        title={"Start weight"}
                        metering={"kg"}
                    />
                ) : null}

                {nextStep ? (
                    <CustomRange
                        startState={changeRange}
                        min={valueStart}
                        max={+valueStart + 500}
                        getValue={saveResultWeigth}
                        currentValue={valueStart}
                        title={"Certain weight"}
                        metering={"kg"}
                        innerBtn={"Save result"}
                    />
                ) : null}

                {nextStep ? (
                    <div>
                        <CustomButton funk={() => setNext(false)} innerValue={"Previous stage"} />
                    </div>
                ) : null}
            </div>
            <div className={`${s.targetRange__bar}`}>
                <TargetProgress
                    value={value}
                    remainder={remainder}
                    endTarget={weightTarget}
                    result={resultWeigth}
                    param={"kg"}
                />
            </div>
        </div>
    );
};
