import { CustomButton } from "../CustomComponents";

import { useState, useEffect } from "react";

export const CustomRange = ({
    getValue,
    title = "Title",
    metering = "",
    btn = "Add",
    max = 500,
    min = 0,
    innerBtn = "Fix result",
}) => {
    const [valueRange, setValueRange] = useState(20);

    useEffect(() => {
        if (min && min !== valueRange) {
            setValueRange(min);
        }
    }, [min]);

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