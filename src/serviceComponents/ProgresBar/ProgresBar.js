import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "./ProgresBar.scss";
import { useState, useEffect } from "react";

import gant from "../../img/png/gant.png";

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
    const [value, setValue] = useState(valueStart);

    useEffect(() => {
        setValue(valueEnd);
    }, [valueEnd]);

    return children(value);
};

// value проценты выполнения - число
// min начальная  точка - число
// max 
// param единица измерения - строка кг и пр.
// remainder остаток - число
// srcImg картинка внутри - строка

export const ProgresBar = (props) => {
    let { 
        value, 
        min,
        max, 
        param, 
        remainder, 
        srcImg,
    } = props;

    console.log("рендер прогрессбара");
    // minmax
    if (!min) min = 0;
    if (!max) max = 100;
    // cample
    if (!value) value = 0;
    // inner value
    if (!param) param = "kg";
    if (!remainder) remainder = 0;
    
    if (!srcImg) srcImg = gant;

    const mark = value > 100 ? 'above' : 'left';

    return (
            <div style={{ width: "280px", height: "280px" }} className="CircularInner">
                <ProgressProvider valueStart={min} valueEnd={value}>
                    {(value) => (
                        <CircularProgressbarWithChildren value={value}>
                            <img
                                style={{ width: 120, marginTop: -35 }}
                                src={gant}
                                alt="imgProgressBar"
                            />
                            <div style={{ fontSize: 32, marginTop: -5 }}>
                                {mark} <strong>{`${remainder}${param}`}</strong>
                            </div>
                        </CircularProgressbarWithChildren>
                    )}
                </ProgressProvider>
            </div>
    );
};