import { TargetTuning } from "../TargetTuning/TargetTuning";

import { treningWeigth, changeParamTrening } from "./sliceTreningTarget";

import { useSelector, useDispatch } from "react-redux";

export const TreningTarget = () => {
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
                key={data.id}
                name={data.name}
                descr={data.descr} 
                img={data.img[0]} 
                workingParts={data.workingParts.join(" | ")} 
            />
        </div>
    );
};
