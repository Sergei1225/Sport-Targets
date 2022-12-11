import { useState, memo } from "react";

export const ViewAddTrening = memo(
    ({ getValue, title = "Repeats", metering = "", btn = "Add", max = 30 }) => {
        const [valueRange, setValueRange] = useState(20);

        return (
            <div className={`${"basePositionBlock baseFlexGapNoJC"}`}>
                <div className={`${"basePositionElement "}`}>{title}</div>
                <input
                    style={{ width: "300px" }}
                    onChange={(e) => setValueRange(e.target.value)}
                    type="range"
                    min={0}
                    max={max}
                    value={valueRange}
                />
                <div className={`${"basePositionElement "}`}>
                    {valueRange} {metering}
                </div>

                <button
                    onClick={() => getValue && getValue(+valueRange)}
                    className={`${"basePositionElement baseBtn"}`}
                >
                    {btn}
                </button>
            </div>
        );
    }
);
