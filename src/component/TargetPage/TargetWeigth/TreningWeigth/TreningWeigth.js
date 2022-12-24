import { TargetTuning } from "../../TargetTuning/TargetTuning";

import { treningWeigth, changeParamTrening } from "./sliceTreningWeigth";

import { useSelector, useDispatch } from "react-redux";

export const TreningWeigth = () => {
    const dispatch = useDispatch();

    const data = useSelector(treningWeigth);
    const paramValues = useSelector((state) => state.treningWeigth.paramTrening);
    const dataParams = useSelector((state) => state.treningWeigth.dataParams);


    const changeParams = (value) => {
        dispatch(changeParamTrening(value));
    };

    if (!data) return null;

    return (
        <div>
            <TargetTuning
                dataParams={dataParams}
                paramValues={paramValues}
                changeParams={changeParams}
                key={data.selectedExercise.id}
                {...data.selectedExercise}
            />
        </div>
    );
};
