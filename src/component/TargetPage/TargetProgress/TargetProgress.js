import { ProgresBar } from "../../../serviceComponents/ProgresBar/ProgresBar";

export const TargetProgress = (props) => {
    const { paramProgress, remainder, target, nameSvg, valueAbsolute, valuePercent } = props;

    return (
        <>  
            <div className=" bFlexCenter" >
                <ProgresBar
                    nameSvg={nameSvg}
                    value={valuePercent}
                    remainder={remainder}
                    param={paramProgress}
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
