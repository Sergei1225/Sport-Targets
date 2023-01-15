import { ProgresBar } from "../../../serviceComponents/ProgresBar/ProgresBar";

export const TargetProgress = (props) => {
    let { paramProgress, remainder, target, nameSvg, valueAbsolute, valuePercent, styleSvg } = props;

    if(!styleSvg) styleSvg = "bSizeIconVeryBigFlex";
    if(!valuePercent) valuePercent = 0;
    if(!remainder) remainder = 0;
    if(!paramProgress) paramProgress = "kg";
    if(!target) target = 0;
    if(!valueAbsolute) valueAbsolute = 0;

    return (
        <>  
            <div className=" bFlexCenter" >
                <ProgresBar
                    nameSvg={nameSvg}
                    value={valuePercent}
                    remainder={remainder}
                    param={paramProgress}
                    styleSvg={styleSvg}
                />
            </div>
            <div style={{ color: "grey" }} className={`${""} bContent bElementSmall bBorderRadius bBorderSolid `}>
                {valueAbsolute}
                {` ${paramProgress}`} from {target} {paramProgress}
            </div>
            <div className={`${""} bElementSmall bTitleSmall bBold bBorderRadius bBorderSolid bMarginTop`}>
                COMPLITED {valuePercent}%
            </div>
        </>
    );
};
