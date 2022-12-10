import { CSSTransition, SwitchTransition } from "react-transition-group";
import { memo } from "react";

// mode есть лишь out-in in-out поэтому лучшее значение in или out
// logicValue от него зависит будет ли он меняться или нет
// styleDiv стиль всего компонента
// styleActive это измененный див выше если есть актив
// innerValueTrue если logicValue true то будет эта внутренность
// innerValueFalse если logicValue false то будет эта внутренность
// time это время смены
// styleTransition это анимация
//

export const ComponentSwitch = memo((props) => {
    let {
        mode,
        logicValue,
        styleDiv,
        styleActive,
        innerValueTrue,
        innerValueFalse,
        time,
        styleTransition,
    } = props;

    if (!mode) mode = "out-in";
    if (!styleTransition) styleTransition = "baseFade";
    if (!time) time = 500;
    if (!innerValueFalse) innerValueFalse = "";

    return (
        <SwitchTransition mode={mode}>
            <CSSTransition key={!!logicValue} timeout={time} classNames={styleTransition}>
                <div className={!logicValue ? styleDiv : styleActive}>
                    {logicValue ? innerValueTrue : innerValueFalse}
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
});

