import s from "./TimeRange.module.scss";

import { CustomTitle, CustomRange } from "../../../BaseComponents/CustomComponents";
import { FilledTargetProgress } from "../../FilledTargetProgress/FilledTargetProgress";

import { useState, useEffect } from "react";

export const WrapperRange = (props) => {

    const { paramTime, result, paramProgress, dataRange, saveResult, target, remainder, max } = props;

    const { id, title, subtile, paramRange, startState } = dataRange;
    
    useEffect(() => {
        if(target){
            setValueEnd(target);
            setValueNow(remainder);
        }
    }, [target, remainder]);

    const [valueTarget, setValueEnd] = useState(0);
    const [valueRemainder, setValueNow] = useState(0);

    const changeValue = (value) => {
        setValueEnd(+value);
        setValueNow(0);
        saveResult(+value)
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
                <FilledTargetProgress
                    paramTime={paramTime}
                    target={valueTarget}
                    remainder={valueRemainder}
                    result={result}
                    paramProgress={paramProgress}
                />
            </div>
        </div>
    );
};
