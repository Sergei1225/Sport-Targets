import { CBtnStyled, CustomTitleBase } from "../CustomComponents";

import { useState, useEffect } from "react";

export const CustomRange = (props) => {
    let { getValue, title, subtile, metering, btn, max, innerBtn, startState, min } = props;

    if (!title) title = "Title";
    if (!subtile) subtile = "";
    if (!metering) metering = "";
    if (!btn) btn = "Add";
    if (!max) max = 500;
    if (!innerBtn) innerBtn = "Fix result";
    if (!startState) startState = 20;
    if (!min) min = 0;

    const [valueRange, setValueRange] = useState(startState);

    useEffect(() => {
        setValueRange(startState);
    }, [startState]);

    return (
            <div className={`${"bElement "} `}>
                <div className={`${"bElement bPaddingLeft0"} bContentBig bBold`}>
                    <CustomTitleBase
                        title={title}
                        subtile={subtile}
                        nameSvg={"run"}
                        styleSvg={""}
                    />
                </div>
                <div className={`${"bElement bBorderSolid bBorderRadius bFlex"}`}>
                    <input
                        className="bFlexSizeAllWidth150"
                        onChange={(e) => setValueRange(e.target.value)}
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
