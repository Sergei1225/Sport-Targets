import s from "./TargetPage.module.scss";

import { TargetItem } from "./TargetItem/TargetItem";
import { TargetWeightRanges } from "./TargetWeigth/TargetWeightRanges/TargetWeightRanges";
import { TargetTuning } from "./TargetTuning/TargetTuning";

import { randomId } from "../../service/RandomId";

import {
    setDataTargets,
    saveTargetWeigth,
    saveTargetTime,
    saveTargetTrenings,
    saveTargetWeigthEnd,
    changeStatusPage,
    deleteTargetWeigth,
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

    const statusPage = useSelector((state) => state.targetPage.statusLoading);

    useEffect(() => {
        dispatch(setDataTargets());
    }, []);

    if (!trenings || !days || !weigth) return <h3>Loading...</h3>;

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

    const changeStatus = (value) => {
        console.log(value);
        dispatch(changeStatusPage(value));
    };
    const deleteTarget = () => {
        dispatch(deleteTargetWeigth());
    };

    return (
        <div className={`${s.targetPage}`}>
            <div className={`${s.readyTrenigs}`}>
                <div  className={`${s.readyTrenigs__wrapper}`}>
                    <div data-area="header" id="header" className={`${s.readyTrenigs__header}`}></div>
                    <div data-area="content" className={`${s.readyTrenigs__content}`}></div>
                    <div data-area="footer" className={`${s.readyTrenigs__footer}`}></div>
                    <div data-area="sidepanel" className={`${s.readyTrenigs__sidepanel}`}></div>
                </div>
            </div>
            {/* <TargetItem
                title={"Weigth Target"}
                subtitle={"set a goal to reach a certain weight in the exercise"}
                linkTo={"/chooseExerciseTargetWeigth"}
                dataItems={dataTargetItem}
                startDate={days.date.start}
                initialData={fullTargetState}
                changeStatus={changeStatus}
                deleteTarget={deleteTarget}
                status={statusPage}
            />
            {statusPage === "editor" ? (
                <>
                    <TargetTuning
                        paramValues={paramValues}
                        dataParams={dataParams}
                        changeParams={changeParams}
                        key={selectedExercise.id}
                        name={selectedExercise.name}
                        descr={selectedExercise.descr}
                        img={selectedExercise.img[0]}
                        workingParts={selectedExercise.workingParts.join(" | ")}
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
                </>
            ) : null} */}
        </div>
    );
};
