import { WrapperRange } from "../TimeRange/WrapperRange";
import { TargetShow } from "../../TargetShow/TargetShow";

import { dataRanges } from "../dataRanges";

import {
    saveTargetWeigth,
    saveTargetTime,
    saveTargetTrenings,
    getDataTarget,
    saveTargetWeigthEnd,
} from "./sliceTargetWeightRanges";

import { useSelector, useDispatch } from "react-redux";
import { CustomButton } from "../../../BaseComponents/CustomComponents";
import { useEffect } from "react";

export const TargetWeightRanges = () => {
    const dispatch = useDispatch();

    const paramValues = useSelector((state) => state.treningWeigth.paramTrening);
    const trenings = useSelector((state) => state.targetWeigthRanges.someTrenings);
    const time = useSelector((state) => state.targetWeigthRanges.timeToTarget);
    const weigth = useSelector((state) => state.targetWeigthRanges.weight);

    useEffect(() => {
        dispatch(getDataTarget());
    }, []);

    if (!trenings || !time || !weigth) return <h3>Loading...</h3>;

    const { parametrs: treningsData } = trenings;
    const { parametrs: timeData } = time;
    const { parametrs: weigthData } = weigth;

    const saveWeigth = (value) => {
        dispatch(saveTargetWeigth(value));
    };

    const saveTime = (value) => {
        dispatch(saveTargetTime(value));
    };

    const saveTrenings = (value) => {
        dispatch(saveTargetTrenings(value));
    };

    const saveTarget = () => {
        dispatch(
            saveTargetWeigthEnd({
                someTrenings: trenings,
                timeToTarget: time,
                weight: weigth,
            })
        );
    };

    return (
        <div>
            {/* <TargetShow /> */}
            <CustomButton innerValue={"Save target"} funk={saveTarget} />
            <WrapperRange saveResult={saveWeigth} data={weigthData} dataRange={dataRanges[2]} />
            {paramValues.some((i) => i === "time") ? (
                <WrapperRange saveResult={saveTime} data={timeData} dataRange={dataRanges[1]} />
            ) : null}
            {paramValues.some((i) => i === "trenings") ? (
                <WrapperRange
                    saveResult={saveTrenings}
                    data={treningsData}
                    dataRange={dataRanges[0]}
                />
            ) : null}
        </div>
    );
};
