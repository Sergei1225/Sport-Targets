import { WeightRange } from "../WeightRange/WeightRange";
import { SimpleRange } from "../SimpleRange/SimpleRange";

import { dataRanges } from "../dataRanges";

import { rangesData } from "./sliceTargetWeightRanges";

import { useSelector } from "react-redux";

export const TargetWeightRanges = () => {
    // const data = useSelector(rangesData);

    const createRages = (data) => {
        if (!data || data.length === 0) return null;
        return data.map((item) => {
            return <SimpleRange key={item.id} {...item} />;
        });
    };

    // console.log(data?.weight);

    //const ranges = createRages(dataRanges);

    return (
        <div>
            <WeightRange start={100} end={200} />
            
        </div>
    );
};
