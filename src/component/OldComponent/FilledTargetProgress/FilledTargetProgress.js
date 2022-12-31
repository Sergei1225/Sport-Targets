import { ProgresBar } from "../../../serviceComponents/ProgresBar/ProgresBar";

export const FilledTargetProgressAA = (props) => {
    const { paramProgress, remainder, target, nameSvg, param } = props;

    //  результат
    const getResult = () => {
        if (!remainder || !target) return 0;
        else return +target - +remainder;
    };
    // результат в процентах
    const getResultPercent = () => {
        if (!remainder || !target) return 0;
        return (((+target - +remainder) / +target) * 100).toFixed(2);
    };

    const resultAbsolute = getResult();
    const resultPercent = getResultPercent();

    return (
        <>
            <ProgresBar
                nameSvg={nameSvg}
                value={resultPercent}
                remainder={remainder}
                param={paramProgress}
            />
            <div style={{ color: "grey" }} className={`${""} basePositionElement`}>
                {""} {resultAbsolute}
                {paramProgress}{param} from {target}{param}
                {paramProgress}
            </div>
            <div className={`${""} basePositionElement baseFontContentBold`}>
                COMPLITED {resultPercent}%
            </div>
        </>
    );
};
