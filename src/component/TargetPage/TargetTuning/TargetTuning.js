import s from "./TargetTuning.module.scss";

import { CustomTitle, CustomButton } from "../../BaseComponents/CustomComponents";

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

export const TargetTuning = (props) => {
    const { name, descr, img, workingParts, changeParams, paramValues, dataParams } = props;

    const comparisonParams = dataParams.map(item => paramValues.some(itemComp => item === itemComp));
    const [ _, secondParm, thirdParm] = dataParams;
    const [first, second, third] = comparisonParams;

    return (
        <div className={`${""} basePositionBlock `}>
            <div className={`${""} baseFlex`}>
                <div style={{ minWidth: "300px" }} className={`${""} `}>
                    <img className={`${""} baseImgCover`} src={img[0]} alt="imgTarget" />
                </div>
                <div className={`${""} basePositionElementNoMT`}>
                    <CustomTitle title={name} />
                    <div className={`${""} basePositionElement`}>{descr}</div>
                    <div className={`${""} basePositionElement`}>
                        workingParts : {workingParts.join(" | ")}{" "}
                    </div>
                </div>
            </div>
            <div className={`${""} baseFlex`}>
                <CustomButton active={first} innerValue={"Certain weight"} />
                <CustomButton
                    active={second}
                    funk={() => changeParams(secondParm)}
                    innerValue={"Time to reach the target"}
                />
                <CustomButton
                    active={third}
                    funk={() => changeParams(thirdParm)}
                    innerValue={"Number of trenings"}
                />
            </div>
        </div>
    );
};
