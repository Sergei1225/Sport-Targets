import { TargetProgress } from "../TargetProgress/TargetProgress";

import { workDataProgressBar } from "../workDataProgressBar";

export const FilledTargetProgress = (props) => {
    const { paramProgress, remainder, target, nameSvg } = props;

    //  результат
    const getResult = () => {
        if (!remainder || !target) return 0;
        else return +target - +remainder;
    };
    // результат в процентах
    const getResultPercent = () => {
        if (!remainder || !target) return 0;
        return (((+target - +remainder) / +target) * 100).toFixed(2);
    };

    const resultAbsolute = getResult();
    const resultPercent = getResultPercent();

    return (
            <TargetProgress
                nameSvg={nameSvg}
                value={resultPercent}
                remainder={remainder}
                endTarget={target}
                result={resultAbsolute}
                param={paramProgress}
            />
    );
};
