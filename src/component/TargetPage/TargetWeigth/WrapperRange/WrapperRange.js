import s from "./WrapperRange.module.scss";

import { CustomRange, CustomTitleBase } from "../../../BaseComponents/CustomComponents";
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
        };
        setData(newValue);
        saveResult(newValue);
    };


    const subtileItem = subtile.slice(0, 100);

    return (
        <div className={`${s.timeRange} bElement `}>
            <div className="bFlex bElement bWrapperStyleElem">
                <div className={`${s.timeRange__info} bElement`}>
                    <div className="bElement">
                        <CustomTitleBase title={title} subtile={subtileItem} nameSvg={"gantel"} styleSvg={""} />
                    </div>
                    <div className="bElement">
                        <CustomRange styleRange={s.timeRange__styleRange} styleTitle={"bContentBig"} getValue={changeValue} max={max} min={0} {...paramRange} startState={startState} />
                    </div>
                </div>
                <div className={`${s.timeRange__bar} `}>
                    <div className={`${s.timeRange__progress} bFlexColumnCenter `}>
                        <TargetProgress
                            remainder={dataItem.remainder}
                            target={dataItem.target}
                            valueAbsolute={dataItem.valueAbsolute}
                            valuePercent={dataItem.valuePercent}
                            paramProgress={dataItem.paramProgress}
                            nameSvg={dataItem.paramProgress}
                            styleSvg={" bSizeIconVeryBigFlex"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
