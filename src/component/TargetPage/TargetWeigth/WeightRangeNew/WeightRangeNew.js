import s from "./WeightRangeNew.module.scss";

import { CustomTitle, CustomRange, CustomButton } from "../../../BaseComponents/CustomComponents";

import { FilledTargetProgress } from "../../FilledTargetProgress/FilledTargetProgress";

import { useState, useEffect } from "react";

export const WeightRange = ({ }) => {


    useEffect(() => {

    }, []);


    return (
        <div className={`${s.targetRange} basePositionBlock baseFlex`}>
            <div className={`${s.targetRange__info}`}>
                <CustomTitle
                    title={"Tuning certain weigth"}
                    subtile={
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore doloribus officiis neque tempora a quasi iste dignissimos aspernatur illum."
                    }
                />
                    <CustomRange
                        startState={valueStart}
                        getValue={changeValue}
                        title={"Start weight"}
                        metering={"kg"}
                    />
            </div>
            <div className={`${s.targetRange__bar} baseFlexColumnCenter`}>
                <div className={`${s.targetRange__progress} baseFlexColumnCenter`}>
                    <FilledTargetProgress
                        nameSvg={nameSvg}
                        target={targetWeigth}
                        remainder={remainder}
                        result={weigthResult}
                        param={"kg"}
                    />
                </div>
                <div className={`${""} basePositionElement `}>
                    START WEIGTH: {valueStart}kg END WEIGTH: {valueEnd}kg
                </div>
            </div>
        </div>
    );
};
