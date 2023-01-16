import { TargetTuning } from "../TargetTuning/TargetTuning";

export const TreningTarget = (props) => {

    const {selectedExercise, paramValues, dataParams, changeParams} = props;

    if (!selectedExercise) return null;

    const {id, name, descr, img, workingParts} = selectedExercise;

    return (
        <TargetTuning
            dataParams={dataParams}
            paramValues={paramValues}
            changeParams={changeParams}
            key={id}
            name={name}
            descr={descr}
            img={img[0]}
            workingParts={workingParts.join(" | ")}
        />
    );
};
