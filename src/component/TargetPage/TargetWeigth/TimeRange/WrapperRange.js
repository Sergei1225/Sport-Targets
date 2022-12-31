import s from "./WrapperRange.module.scss";

import { CustomTitle, CustomRange } from "../../../BaseComponents/CustomComponents";
import { TargetProgress } from "../../TargetProgress/TargetProgress";

import { useState, useEffect } from "react";

export const WrapperRange = (props) => {
    let { dataRange, saveResult, max, data } = props;

    const { id, title, subtile, paramRange, startState } = dataRange;

    if (!max) max = 500;

    useEffect(() => {
        if (data) setData(data);
    }, [data]);

    const [dataItem, setData] = useState(0);

    const changeValue = (value) => {
        const newValue = {
            paramProgress: dataItem.paramProgress,
            remainder: +value,
            target: +value,
            valueAbsolute: 0,
            valuePercent: 0,
        }
        setData(newValue);
        saveResult(newValue);
    };

    return (
        <div className={`${s.timeRange} basePositionBlock baseFlex`}>
            <div className={`${s.timeRange__info}`}>
                <CustomTitle title={title} subtile={subtile} />
                <CustomRange
                    getValue={changeValue}
                    max={max}
                    min={0}
                    {...paramRange}
                    startState={startState}
                />
            </div>
            <div className={`${s.timeRange__bar}`}>
                <div className={`${s.timeRange__bar_inner} baseFlexColumnCenter`}>
                    <TargetProgress
                        remainder={dataItem.remainder}
                        target={dataItem.target}
                        valueAbsolute={dataItem.valueAbsolute}
                        valuePercent={dataItem.valuePercent}
                        paramProgress={dataItem.paramProgress}
                        nameSvg={dataItem.paramProgress}
                    />
                </div>
            </div>
        </div>
    );
};
