import { useSelector } from "react-redux"
import { TargetTuning } from "../../TargetTuning/TargetTuning";

import {treningWeigth} from "./sliceTreningWeigth";

export const TreningWeigth = () => {

    const data = useSelector(treningWeigth);



    if(!data) return null;

  return (
    <div>
        <TargetTuning   
            key={data.selectedExercise.id}
            {...data.selectedExercise}
        />
    </div>
  )
}
