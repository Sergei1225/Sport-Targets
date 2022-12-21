import s from "./TargetTuning.module.scss";

import { ProgresBar } from "../../../serviceComponents/ProgresBar/ProgresBar";
import { CustomTitle, CustomButton } from "../../BaseComponents/CustomComponents";

import { workDataProgressBar } from "../workDataProgressBar";

import { useState, useEffect } from "react";


const dataItem = {
    order: 10,
    id: "VbgFh12323267K1k-Ztlz6T60-5k4C30zm-y8",
    name: "Shrugs",
    img: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThSfVMp65XvyxJXG1mx6nmTJqFtyabjVh_CQ&usqp=CAU",
    ],
    descr: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum placeat culpa, at eum maiores inventore mollitia amet ullam rem fuga laboriosam necessitatibus sit? Nesciunt quos alias ipsam quasi dicta hic. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum placeat culpa, at eum maiores inventore mollitia amet ullam rem fuga laboriosam necessitatibus sit? Nesciunt quos alias ipsam quasi dicta hic.",
    workingParts: ["trapezoid"],
    typeOfExercise: "base",
};

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

const TargetProgress = (props) => {
    const { value, remainder, endTarget, result, param } = props;


    return (
        <>
            <ProgresBar value={value} remainder={remainder.remainder} />
            <div style={{ color: "grey" }} className={`${""} basePositionElement`}>
                {remainder.paramAchieved} {result}
                {param} from {endTarget}
                {param}
            </div>
            <div className={`${""} basePositionElement baseFontContentBold`}>
                COMPLITED {value}%
            </div>
        </>
    );
};

const TuningRange = () => {
    const [valueStart, setValueStart] = useState(0);
    const [valueEnd, setValueEnd] = useState(0);

    const { weightRemainder, weightValue } = workDataProgressBar();

    const result = 50;
    const remainder = weightRemainder(+valueEnd, +result);
    const value = weightValue(+valueEnd, +result);

    return (
        <div className={`${s.targetTuning} basePositionBlock baseFlex`}>
            <div className={`${s.targetTuning__info}`}>
                <CustomTitle
                    title={"Tuning certain weigth"}
                    subtile={
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore doloribus officiis neque tempora a quasi iste dignissimos aspernatur illum."
                    }
                />
                <CustomRange getValue={setValueStart} title={"Start weight"} />
                <CustomRange
                    max={+valueStart + 500}
                    getValue={setValueEnd}
                    min={valueStart}
                    title={"Certain weight"}
                />
            </div>
            <div className={`${s.targetTuning__bar}`}>
                <TargetProgress
                    value={value}
                    remainder={remainder}
                    endTarget={valueEnd}
                    result={result}
                    param={"kg"}
                />
            </div>
        </div>
    );
};

export const TargetTuning = () => {
    const { name, descr, img, workingParts } = dataItem;

    const [params, setParams] = useState(["weight"]);

    const changeParams = (value) => {
        if (params.some((item) => item === value)) {
            setParams((params) => params.filter((item) => item !== value));
        } else setParams((params) => [...params, value]);
    };

    const weigth = params.some((item) => item === "weight");
    const time = params.some((item) => item === "time");
    const trenings = params.some((item) => item === "trenings");

    return (
        <>
            <div className={`${""} basePositionBlock `}>
                <div className={`${""} baseFlex`}>
                    <div style={{ minWidth: "300px" }} className={`${""} `}>
                        <img className={`${""} baseImgCover`} src={img[0]} alt="imgTarget" />
                    </div>
                    <div className={`${""} basePositionElementNoMT`}>
                        <CustomTitle title={name} />
                        <div className={`${""} basePositionElement`}>{descr}</div>
                        <div className={`${""} basePositionElement`}>
                            workingParts : {workingParts.join(", ")}{" "}
                        </div>
                    </div>
                </div>
                <div className={`${""} baseFlex`}>
                    <CustomButton active={weigth} innerValue={"Certain weight"} />
                    <CustomButton
                        active={time}
                        funk={() => changeParams("time")}
                        innerValue={"Time to reach the target"}
                    />
                    <CustomButton
                        active={trenings}
                        funk={() => changeParams("trenings")}
                        innerValue={"Number of trenings"}
                    />
                </div>
            </div>
            <TuningRange />
        </>
    );
};
