import s from "./TargetPage.module.scss";

import { TargetItem } from "./TargetItem/TargetItem";
import { TargetWeightRanges } from "./TargetWeigth/TargetWeightRanges/TargetWeightRanges";
import { TreningTarget } from "./TreningTarget/TreningTarget";

import { randomId } from "../../service/RandomId";

import {
    setDataTargets,
    saveTargetWeigth,
    saveTargetTime,
    saveTargetTrenings,
    saveTargetWeigthEnd,
} from "./sliceTargetPage";
import { changeParamTrening } from "./sliceTargetPage";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const TargetPage = () => {
    const dispatch = useDispatch();

    const paramValues = useSelector((state) => state.targetPage.paramTrening);
    const dataParams = useSelector((state) => state.targetPage.dataParams);

    const fullTargetState = useSelector((state) => state.targetPage.fullTargetState);

    const trenings = useSelector((state) => state.targetPage.someTrenings);
    const days = useSelector((state) => state.targetPage.timeToTarget);
    const weigth = useSelector((state) => state.targetPage.weight);

    const selectedExercise = useSelector((state) => state.targetPage.selectedExercise);

    useEffect(() => {
        dispatch(setDataTargets());
    }, []);

    if (!trenings || !days || !weigth) return <h3>Loading...</h3>;

    console.log(days.date.start);

    const { parametrs: treningsData } = trenings;
    const { parametrs: timeData } = days;
    const { parametrs: weigthData } = weigth;

    const createDataTargetItem = (weight, days, trenings) => {
        return {
            weight: { id: randomId(), percent: weight, nameSvg: "gantelSquare" },
            days: { id: randomId(), percent: days, nameSvg: "days" },
            trenings: { id: randomId(), percent: trenings, nameSvg: "list" },
        };
    };

    const dataTargetItem = createDataTargetItem(
        weigthData.valuePercent,
        timeData.valuePercent,
        treningsData.valuePercent
    );

    const changeParams = (value) => {
        dispatch(changeParamTrening(value));
    };

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
                timeToTarget: days,
                weight: weigth,
            })
        );
    };

    return (
        <div className={`${s.targetPage}`}>
            <TargetItem
                title={"Weigth Target"}
                subtitle={"set a goal to reach a certain weight in the exercise"}
                linkTo={"/chooseExerciseTargetWeigth"}
                dataItems={dataTargetItem}
                startDate={days.date.start}
                initialData={fullTargetState}
            />
            <TreningTarget
                dataParams={dataParams}
                paramValues={paramValues}
                selectedExercise={selectedExercise}
                changeParams={changeParams}
            />
            <TargetWeightRanges
                saveTarget={saveTarget}
                saveWeigth={saveWeigth}
                saveTime={saveTime}
                saveTrenings={saveTrenings}
                trenings={treningsData}
                days={timeData}
                weigth={weigthData}
                paramValues={paramValues}
            />
        </div>
    );
};
