import { ProgresBar } from "../../../serviceComponents/ProgresBar/ProgresBar";

export const TargetProgress = (props) => {
    const { paramProgress, remainder, target, nameSvg, valueAbsolute, valuePercent } = props;

    return (
        <>
            <ProgresBar
                nameSvg={nameSvg}
                value={valuePercent}
                remainder={remainder}
                param={paramProgress}
            />
            <div style={{ color: "grey" }} className={`${""} basePositionElement`}>
                {valueAbsolute}
                {` ${paramProgress}`} from {target} {paramProgress}
            </div>
            <div className={`${""} basePositionElement baseFontContentBold`}>
                COMPLITED {valuePercent}%
            </div>
        </>
    );
};
