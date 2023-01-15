import s from "./targetTuning.module.scss";

import { CustomTitle, CustomButton, CustomTitleBase, CBtnStyled } from "../../BaseComponents/CustomComponents";

export const TargetTuning = (props) => {
    let { title, descr, img, workingParts, changeParams, paramValues, dataParams } = props;

    const comparisonParams = dataParams.map((item) => paramValues.some((itemComp) => item === itemComp));

    const [_, secondParm, thirdParm] = dataParams;
    const [first, second, third] = comparisonParams;

    if (!title) title = "Selected exersice";
    if (descr && descr.length > 300) descr = descr.slice(0, 301) + "...";

    return (
        <div className={`${s.targetTuning} bBlock `}>
            <div className={`${s.targetTuning__wrapper} bWrapperStyle bElement `}>
                <div className={`${s.targetTuning__trening} bFlex bAlignItems`}>
                    <div className={`${s.targetTuning__image} bElement`}>
                        <img className={`bImgCover bBorderRadius`} src={img} alt="imgTarget" />
                    </div>
                    <div className={`${""} bElement`}>
                        <div className={`${""} bElement`}>
                            <CustomTitleBase title={title} nameSvg={"gantel"} styleSvg={""} />
                        </div>
                        <div className={`${""} bElement bContent`}>{descr}</div>
                        <div className={`${""} bElement bContent`}>
                            <span className="bBold bContentBig">WORKING PARTS:</span> {workingParts}
                        </div>
                    </div>
                </div>
                <div className={`${""} bFlex bElement`}>
                    <CBtnStyled active={first} innerValue={"Certain weight"} />
                    <CBtnStyled
                        active={second}
                        funk={() => changeParams(secondParm)}
                        innerValue={"Time to reach the target"}
                    />
                    <CBtnStyled active={third} funk={() => changeParams(thirdParm)} innerValue={"Number of trenings"} />
                </div>
            </div>
        </div>
    );
};
