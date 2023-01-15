import s from "./TargetPage.module.scss";

import { TargetWeigth } from "./TargetWeigth/TargetWeigth";
import { TargetItem } from "./TargetItem/TargetItem";

export const TargetPage = () => {
    return (
        <div>
            <TargetItem/>
            <TargetWeigth/>
        </div>
    );
};


            {/* <div className={s.targetPage__wrapper}>
                <div className={s.targetPage__slider}>
                    <div className={s.targetPage__slider_item}>1</div>
                    <div className={s.targetPage__slider_item}>2</div>
                    <div className={s.targetPage__slider_item}>3</div>
                </div>
            </div> */}
