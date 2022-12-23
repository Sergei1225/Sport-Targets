import s from "./SimpleRange.module.scss";

import { CustomTitle, CustomRange } from "../../../BaseComponents/CustomComponents";
import { TargetProgress } from "../../TargetProgress/TargetProgress";

import { workDataProgressBar } from "../../workDataProgressBar";

import { useState } from "react";

export const SimpleRange = (props) => {
    const { id, title, subtile, paramRange, targetProgress } = props;

    const [valueEnd, setValueEnd] = useState(0);

    const { weightRemainder, weightValue } = workDataProgressBar();

    const result = 0;
    // возвращает объект { remainder: rem, paramAchieved: "achieved" }
    const remainder = weightRemainder(+valueEnd, +result);
    const value = weightValue(+valueEnd, +result);

    return (
        <div className={`${s.simpleRange} basePositionBlock baseFlex`}>
            <div className={`${s.simpleRange__info}`}>
                <CustomTitle title={title} subtile={subtile} />
                <CustomRange getValue={setValueEnd} max={365} min={0} {...paramRange} />
            </div>
            <div className={`${s.simpleRange__bar}`}>
                <TargetProgress
                    value={value}
                    remainder={remainder}
                    endTarget={valueEnd}
                    result={result}
                    param={targetProgress.param}
                />
            </div>
        </div>
    );
};
