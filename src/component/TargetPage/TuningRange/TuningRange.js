import s from './TuningRange.module.scss';

import { CustomTitle, CustomRange } from "../../BaseComponents/CustomComponents";

import { workDataProgressBar } from "../workDataProgressBar";
import { TargetProgress } from "../TargetProgress/TargetProgress";

import { useState } from "react";


export const TuningRange = () => {
    const [valueStart, setValueStart] = useState(0);
    const [valueEnd, setValueEnd] = useState(0);

    const { weightRemainder, weightValue } = workDataProgressBar();

    const result = 0;
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
                <CustomRange getValue={setValueStart} title={"Start weight"} />
                <CustomRange
                    max={+valueStart + 500}
                    getValue={setValueEnd}
                    min={valueStart}
                    title={"Certain weight"}
                />
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