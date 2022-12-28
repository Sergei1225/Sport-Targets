import s from "./WeightRange.module.scss";

import { CustomTitle, CustomRange, CustomButton } from "../../../BaseComponents/CustomComponents";

import { TargetProgress } from "../../TargetProgress/TargetProgress";

import { useState, useEffect } from "react";

export const WeightRange = ({ result, saveResult, target, startWeigth }) => {
    const [valueStart, setValueStart] = useState(0);
    const [valueEnd, setValueEnd] = useState(0);
    const [resultWeigth, setResultWeigth] = useState(0);
    const [nextStep, setNext] = useState(false);

    useEffect(() => {
        setValueStart(startWeigth);
        setValueEnd(target);
        setResultWeigth(+result);
    }, [startWeigth, target, result]);

    const getTargetWeigth = () => {
        if (!valueEnd || !valueStart) return 0;
        return +valueEnd - +valueStart;
    };
    const getWeigthResult = () => {
        if (!resultWeigth || !valueStart) return 0;
        return +resultWeigth - +valueStart;
    };
    const getRemainder = () => {
        if (!targetWeigth || !resultWeigth || !valueStart) return targetWeigth;
        return targetWeigth - (+resultWeigth - +valueStart);
    };
    const getValuePercent = () => {
        if (!weigthResult || !targetWeigth) return 0;
        return ((weigthResult / targetWeigth) * 100).toFixed(2);
    };
    
    const targetWeigth = getTargetWeigth();
    const weigthResult = getWeigthResult();
    const remainder = getRemainder();
    const valuePercent = getValuePercent();


    const changeRange = valueStart !== 0 && valueStart > valueEnd ? valueStart : valueEnd;

    const changeValue = (value) => {
        setValueStart(value);
        setValueEnd(0);
        setResultWeigth(0);
        setNext(true);
    };

    const saveResultWeigth = (valueEnd) => {
        saveResult({ end: +valueStart, start: +valueEnd });
        setValueEnd(+valueEnd);
    };

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
                    value={valuePercent}
                    remainder={remainder}
                    endTarget={targetWeigth}
                    result={weigthResult}
                    param={"kg"}
                />
                <div className={`${""} basePositionElement `}>
                    START WEIGTH: {valueStart}kg END WEIGTH: {valueEnd}kg
                </div>
            </div>
        </div>
    );
};
