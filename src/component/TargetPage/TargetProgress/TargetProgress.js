import { ProgresBar } from "../../../serviceComponents/ProgresBar/ProgresBar";

export const TargetProgress = (props) => {
    const { paramProgress, remainder, target, nameSvg, param, valueAbsolute, valuePercent } = props;

    return (
        <>
            <ProgresBar
                nameSvg={nameSvg}
                value={valuePercent}
                remainder={remainder}
                param={paramProgress}
            />
            <div style={{ color: "grey" }} className={`${""} basePositionElement`}>
                {""} {valueAbsolute}
                {paramProgress}
                {param} from {target}
                {param}
                {paramProgress}
            </div>
            <div className={`${""} basePositionElement baseFontContentBold`}>
                COMPLITED {valuePercent}%
            </div>
        </>
    );
};
