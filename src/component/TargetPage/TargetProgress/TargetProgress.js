import { ProgresBar } from "../../../serviceComponents/ProgresBar/ProgresBar";

/// можно удалять 
export const TargetProgressA = (props) => {
    const { value, remainder, endTarget, result, param, srcImg, paramAchieved, nameSvg } = props;



    return (
        <>
            <ProgresBar nameSvg={nameSvg} srcImg={srcImg} value={value} remainder={remainder} param={param}/>
            <div style={{ color: "grey" }} className={`${""} basePositionElement`}>
                {paramAchieved} {result}
                {param} from {endTarget}
                {param}
            </div>
            <div className={`${""} basePositionElement baseFontContentBold`}>
                COMPLITED {value}%
            </div>
        </>
    );
};