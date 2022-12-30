import s from "./TargetShow.module.scss";

import { TargetProgress } from "../TargetProgress/TargetProgress";

import { getDataTargetWeigth } from "./sliceTargetShow";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export const TargetShow = () => {
    const dataWeigth = useSelector((state) => state.showTargetWeigth.weigthTarget);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataTargetWeigth());
    }, []);

    if (!dataWeigth) return <h3>Loading...</h3>;

    const createItemsWeigth = (data) => {
        if (!data) return null;
        return data.map((item) => {
            return (
                <div key={item.id} className={s.targetShow__item}>
                    <TargetProgress
                        remainder={item.remainder}
                        target={item.target}
                        valueAbsolute={item.valueAbsolute}
                        valuePercent={item.valuePercent}
                        paramProgress={item.paramProgress}
                        nameSvg={item.paramProgress}
                    />
                </div>
            );
        });
    };

    const itemsWeigth = createItemsWeigth(dataWeigth);

    return (
        <div className={`${s.targetShow} basePositionBlock baseFlexGapWrapSpaceAround`}>
            {itemsWeigth}
        </div>
    );
};
