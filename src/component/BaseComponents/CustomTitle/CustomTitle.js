import {memo} from "react";

export const CustomTitle = memo(({title, subtile}) => {
    return (
        <>
            <div className={`${"baseFontContentBold"}`}>{title}</div>
            <div className={`${"baseSubtitle"}`}>
                {subtile}
            </div>
        </>
    );
});
