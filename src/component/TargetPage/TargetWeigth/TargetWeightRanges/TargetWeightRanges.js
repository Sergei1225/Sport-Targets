import s from "./targetWeightRanges.module.scss";

import { WrapperRange } from "../WrapperRange/WrapperRange";
import { CBtnStyled } from "../../../BaseComponents/CustomComponents";

import { dataRangesWeigth } from "../dataRanges";

export const TargetWeightRanges = (props) => {
    const { paramValues, trenings, days, weigth, saveTarget, saveWeigth, saveTime, saveTrenings } = props;

    if (!trenings || !days || !weigth) return <h3>Loading...</h3>;

    return (
        <div className={`${s.targetWeightRanges} bBlock `}>
            <div className={`${s.targetWeightRanges__btns} bWrapperStyle bBlock `}>
                <CBtnStyled innerValue={"Save target"} funk={saveTarget} />
            </div>
            <div className={`${s.targetWeightRanges__ranges} bWrapperStyle bElement `}>
                <WrapperRange saveResult={saveWeigth} data={weigth} dataRange={dataRangesWeigth[2]} />
                {paramValues.some((i) => i === "time") ? (
                    <WrapperRange saveResult={saveTime} data={days} dataRange={dataRangesWeigth[1]} />
                ) : null}
                {paramValues.some((i) => i === "trenings") ? (
                    <WrapperRange saveResult={saveTrenings} data={trenings} dataRange={dataRangesWeigth[0]} />
                ) : null}
            </div>
        </div>
    );
};
