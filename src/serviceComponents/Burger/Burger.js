import s from "./Burger.module.scss";

export const Burger = () => {
    return (
        <div className={`${s.burger}`}>
            <div className={`${s.burger__wrapper} bFlexCenter `}>
                <div className={`${s.burger__inner} ${s.burger__inner_activeA}`}></div>
            </div>
            <div className={`${s.burger__line}  `}>
              <div>11111111111111111111111111111</div>
              <div>122222222222222</div>
              <div>1</div>
              <div>1</div>
            </div>
        </div>
    );
};
