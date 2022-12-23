import { ProgresBar } from "../../../serviceComponents/ProgresBar/ProgresBar";


export const TargetProgress = (props) => {
    const { value, remainder, endTarget, result, param, srcImg } = props;


    return (
        <>
            <ProgresBar srcImg={srcImg} value={value} remainder={remainder.remainder} param={param}/>
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