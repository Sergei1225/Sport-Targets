import { ProgresBar } from "../../../serviceComponents/ProgresBar/ProgresBar";


export const TargetProgress = (props) => {
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