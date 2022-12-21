import s from "./TargetTuning.module.scss";

import { TuningRange } from "../TuningRange/TuningRange";
import { CustomTitle, CustomButton } from "../../BaseComponents/CustomComponents";

import { useState } from "react";

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
