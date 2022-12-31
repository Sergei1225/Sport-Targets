import s from "./TargetTuning.module.scss";

import { CustomTitle, CustomButton } from "../../BaseComponents/CustomComponents";

export const TargetTuning = (props) => {
    const { name, descr, img, workingParts, changeParams, paramValues, dataParams } = props;

    const comparisonParams = dataParams.map(item => paramValues.some(itemComp => item === itemComp));

    const [ _, secondParm, thirdParm] = dataParams;
    const [first, second, third] = comparisonParams;

    return (
        <div className={`${""} basePositionBlock `}>
            <div className={`${""} baseFlex`}>
                <div style={{ minWidth: "300px" }} className={`${""} `}>
                    <img className={`${""} baseImgCover`} src={img} alt="imgTarget" />
                </div>
                <div className={`${""} basePositionElementNoMT`}>
                    <CustomTitle title={name} />
                    <div className={`${""} basePositionElement`}>{descr}</div>
                    <div className={`${""} basePositionElement`}>
                        workingParts : {workingParts}
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
