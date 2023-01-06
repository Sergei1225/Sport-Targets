import { memo } from "react";

export const CustomCheck = memo((props) => {
    let { styleItem, innerValue, funcChange, checkedActive, itemValue, itemKey } = props;

    //console.log("дефолтный checkbox");

    if (!styleItem) styleItem = "";

    if (checkedActive) styleItem += " ";

    return (
        <label key={itemKey} className={styleItem}>
            {innerValue}
            <input
                checked={checkedActive}
                value={itemValue}
                onChange={(e) => funcChange && funcChange(e.target.value)}
                type="checkbox"
            />
        </label>
    );
});

<CustomCheck styleItem innerValue funcChange checkedActive itemValue itemKey />;
// styleItem - общий стиль обертки
// innerValue - текст лейбла
// funcChange - функция переключения
// checkedActive - состояние завязанное на чеке
// itemValue - валью которое можно снять с чекбокса
// itemKey - кей всего компонента

export const CCheckStyled = memo((props) => {
    let { styleItem, innerValue, funcChange, checkedActive, itemValue } = props;

    //console.log("дефолтный checkbox");

    if (!styleItem) styleItem = "bCheck";

    if (checkedActive) styleItem += " bCheckActive";

    return (
        <label className={styleItem}>
            {innerValue}
            <input
                checked={checkedActive}
                value={itemValue}
                onChange={(e) => funcChange && funcChange(e.target.value)}
                type="checkbox"
            />
        </label>
    );
});
