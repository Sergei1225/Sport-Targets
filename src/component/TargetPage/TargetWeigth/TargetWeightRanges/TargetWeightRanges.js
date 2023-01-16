import s from "./targetWeightRanges.module.scss";

import { WrapperRange } from "../WrapperRange/WrapperRange";
import { TargetShow } from "../../TargetShow/TargetShow";
import { CBtnStyled } from "../../../BaseComponents/CustomComponents";

import { dataRangesWeigth } from "../dataRanges";

import {
    saveTargetWeigth,
    saveTargetTime,
    saveTargetTrenings,
    getDataTarget,
    saveTargetWeigthEnd,
} from "./sliceTargetWeightRanges";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export const TargetWeightRanges = (props) => {
    const { paramValues, trenings, days, weigth, saveTarget, saveWeigth, saveTime, saveTrenings } = props;
    const dispatch = useDispatch();

    //const paramValues = useSelector((state) => state.treningWeigth.paramTrening);
    // const trenings = useSelector((state) => state.targetWeigthRanges.someTrenings);
    // const days = useSelector((state) => state.targetWeigthRanges.timeToTarget);
    // const weigth = useSelector((state) => state.targetWeigthRanges.weight);

    useEffect(() => {
        dispatch(getDataTarget());
    }, []);

    if (!trenings || !days || !weigth) return <h3>Loading...</h3>;

    // const { parametrs: treningsData } = trenings;
    // const { parametrs: timeData } = days;
    // const { parametrs: weigthData } = weigth;

    // const saveWeigth = (value) => {
    //     dispatch(saveTargetWeigth(value));
    // };

    // const saveTime = (value) => {
    //     dispatch(saveTargetTime(value));
    // };

    // const saveTrenings = (value) => {
    //     dispatch(saveTargetTrenings(value));
    // };

    // const saveTarget = () => {
    //     dispatch(
    //         saveTargetWeigthEnd({
    //             someTrenings: trenings,
    //             timeToTarget: days,
    //             weight: weigth,
    //         })
    //     );
    // };

    return (
        <div className={`${s.targetWeightRanges} bBlock `}>
            <div className={`${s.targetWeightRanges__btns} bWrapperStyle bBlock `}>
                <CBtnStyled innerValue={"Save target"} funk={saveTarget} />
            </div>
            <div className={`${s.targetWeightRanges__ranges} bWrapperStyle bElement `}>
                {/* <TargetShow /> */}

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
