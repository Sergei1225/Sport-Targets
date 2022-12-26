import s from "./TargetPage.module.scss";

import { TargetWeigth } from "./TargetWeigth/TargetWeigth";

export const TargetPage = () => {
    return (
        <div>
            <h1>Target</h1>
            <TargetWeigth/>
            {/* <div className={s.targetPage__wrapper}>
                <div className={s.targetPage__slider}>
                    <div className={s.targetPage__slider_item}>1</div>
                    <div className={s.targetPage__slider_item}>2</div>
                    <div className={s.targetPage__slider_item}>3</div>
                </div>
            </div> */}
        </div>
    );
};
