import { memo } from "react";

export const CustomTitle = memo(({ title, subtile }) => {
    const innerTitle = title.charAt(0).toUpperCase() + title.slice(1);
    return (
        <>
            <div className={`${"baseFontContentBold"}`}>{innerTitle}</div>
            <div className={`${"baseSubtitle"}`}>{subtile}</div>
        </>
    );
});
