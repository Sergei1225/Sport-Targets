import { memo } from "react";

export const CustomButton = memo((props) => {
    let { styleBtn, active, funk, disabledParam, innerValue, addStyle} = props;

    if (!styleBtn) styleBtn = "baseBtn";

    if (addStyle) styleBtn += ` ${addStyle}`;

    if (active) styleBtn += " baseBtnActive";

    return (
        <button
            disabled={disabledParam}
            onClick={() => funk && funk()}
            className={`basePositionElement ${styleBtn}`}
        >
            {innerValue}
        </button>
    );
});
