import { CustomButton } from "../CustomComponents";

import { useState, useEffect } from "react";

export const CustomRange = (props) => {
    let { getValue, title, metering, btn, max, innerBtn, startState, min } = props;

    if (!title) title = "Title";
    if (!metering) metering = "";
    if (!btn) btn = "Add";
    if (!max) max = 500;
    if (!innerBtn) innerBtn = "Fix result";
    if (!startState) startState = 20;
    if (!min) min = 0;

    const [valueRange, setValueRange] = useState(startState);

    useEffect(() => {
        setValueRange(startState)
    }, [startState]);

    return (
        <>
            <div className={`${"basePositionElement "} baseFontContentBold`}>{title}</div>
            <div className={`${"basePositionBlock baseFlexGapNoJC"}`}>
                <input
                    style={{ width: "250px" }}
                    onChange={(e) => setValueRange(e.target.value)}
                    type="range"
                    min={min}
                    max={max}
                    value={valueRange}
                />
                <div className={`${"basePositionElement "}`}>
                    {valueRange} {metering}
                </div>
            </div>
            <CustomButton funk={() => getValue(valueRange)} innerValue={innerBtn} />
        </>
    );
};
