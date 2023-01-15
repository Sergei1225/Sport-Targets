import { CBtnStyled, CustomTitleBase } from "../CustomComponents";

import { useState, useEffect } from "react";

export const CustomRange = (props) => {
    let {
        getValue,
        title,
        subtile,
        metering,
        btn,
        max,
        innerBtn,
        startState,
        min,
        nameSvg,
        styleRange,
        styleSvg,
        styleTitle,
    } = props;

    if (!title) title = "";
    if (!subtile) subtile = "";
    if (!metering) metering = "";
    if (!styleSvg) styleSvg = "";
    if (!btn) btn = "Add";
    if (!max) max = 500;
    if (!innerBtn) innerBtn = "Fix result";
    if (!nameSvg) nameSvg = "run";
    if (!startState) startState = 20;
    if (!min) min = 0;

    const [valueRange, setValueRange] = useState(startState);

    useEffect(() => {
        setValueRange(startState);
    }, [startState]);

    return (
        <div className={`${" "} `}>
            <div className={`${" bPaddingLeft0 bPaddingBottm0"} bContentBig bBold`}>
                {title ? (
                    <CustomTitleBase
                        title={title}
                        subtile={subtile}
                        nameSvg={nameSvg}
                        styleSvg={styleSvg}
                        styleTitle={styleTitle}
                    />
                ) : null}
            </div>
            <div className={`${"bElement bBorderSolid bBorderRadius bFlex"} ${styleRange}`}>
                <input
                    className="bFlexSizeAllWidth150"
                    onChange={(e) => setValueRange(+e.target.value)}
                    type="range"
                    min={min}
                    max={max}
                    value={valueRange}
                />

                <div className={`${"bContentBig bBold "}`}>
                    {valueRange} {metering}
                </div>
            </div>
            <div className={`${"bElement bPaddingLeft0"}`}>
                <CBtnStyled funk={() => getValue(valueRange)} innerValue={innerBtn} />
            </div>
        </div>
    );
};
