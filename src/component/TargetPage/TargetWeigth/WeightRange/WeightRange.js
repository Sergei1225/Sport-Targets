import s from './WeightRange.module.scss';

import { CustomTitle, CustomRange } from "../../../BaseComponents/CustomComponents";

import { workDataProgressBar } from "../../workDataProgressBar";
import { TargetProgress } from "../../TargetProgress/TargetProgress";

import { useState, useEffect } from "react";

const CustomWeightRange = (props) => {

    let { startState, min } = props;

    useEffect(() => {
        if (!min && min > startState) {
            startState = min;
        } 
    }, [min]);

    return (
        <CustomRange
            min={min}
            startState={startState}
            {...props}
        />
    )
}


export const WeightRange = ({start, end}) => {

    const [valueStart, setValueStart] = useState(start ? start : 0);
    const [valueEnd, setValueEnd] = useState(end ? end : 0);

    //console.log(valueStart)

    const { weightRemainder, weightValue } = workDataProgressBar();

    const result = 0;
    // возвращает объект { remainder: rem, paramAchieved: "achieved" }
    const remainder = weightRemainder(+valueEnd, +result);
    const value = weightValue(+valueEnd, +result);

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
                    getValue={setValueStart} 
                    title={"Start weight"} 
                />
                <CustomRange
                    startState={valueEnd}
                    min={valueStart}
                    max={+valueStart + 500}
                    getValue={setValueEnd}
                    currentValue={valueStart}
                    title={"Certain weight"}
                />
                {/* <CustomWeightRange
                    startState={valueEnd}
                    min={valueStart}
                    max={+valueStart + 500}
                    getValue={setValueEnd}
                    currentValue={valueStart}
                    title={"Certain weight"}
                
                /> */}
            </div>
            <div className={`${s.targetRange__bar}`}>
                <TargetProgress
                    value={value}
                    remainder={remainder}
                    endTarget={valueEnd}
                    result={result}
                    param={"kg"}
                />
            </div>
        </div>
    );
};