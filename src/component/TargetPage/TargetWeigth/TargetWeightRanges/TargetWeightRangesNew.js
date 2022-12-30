import { WeightRange } from "../WeightRange/WeightRange";
import { WrapperRangeNew } from "../TimeRange/WrapperRangeNew";
import { TargetShow } from "../../TargetShow/TargetShow";

import { dataRanges } from "../dataRanges";

import {
    rangesData,
    saveTargetWeigth,
    saveTargetTime,
    saveTargetTrenings,
    rangesTransformData,
    getDataTarget,
} from "./sliceTargetWeightRanges";

import { useSelector, useDispatch } from "react-redux";
import { CustomButton } from "../../../BaseComponents/CustomComponents";
import { useEffect } from "react";

export const TargetWeightRangesNew = () => {
    const dispatch = useDispatch();

    const paramValues = useSelector((state) => state.treningWeigth.paramTrening);
    const trenings = useSelector((state) => state.targetWeigthRanges.someTreningsNew);
    const time = useSelector((state) => state.targetWeigthRanges.timeToTargetNew);
    const weigth = useSelector((state) => state.targetWeigthRanges.weight);

    useEffect(() => {
        dispatch(getDataTarget());
    }, []);

    if (!trenings || !time || !weigth) return <h3>Loading...</h3>;

    console.log(time)

    const { parametrs: treningsData } = trenings;
    const { parametrs: timeData } = time;
    const { parametrs: weigthData } = weigth;

    console.log(weigthData);

    const saveWeigth = (value) => {
        dispatch(saveTargetWeigth(value));
    };

    const saveTime = (value) => {
        dispatch(saveTargetTime(value));
    };

    const saveTrenings = (value) => {
        dispatch(saveTargetTrenings(value));
    };

    return (
        <div>
            {/* <TargetShow /> */}
            <WrapperRangeNew 
                saveResult={saveWeigth} 
                data={weigthData} 
                dataRange={dataRanges[2]} 
                />
            {paramValues.some((i) => i === "time") ? (
                <WrapperRangeNew
                    saveResult={saveTime}
                    data={timeData}
                    dataRange={dataRanges[1]}
                />
            ) : null}
            {paramValues.some((i) => i === "trenings") ? (
                <WrapperRangeNew
                    saveResult={saveTrenings}
                    data={treningsData}
                    dataRange={dataRanges[0]}
                />
            ) : null}
        </div>
    );
};
