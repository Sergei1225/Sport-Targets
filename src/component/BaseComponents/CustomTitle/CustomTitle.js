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

export const CustomTitleBase = memo(({ title, subtile, children }) => {
    if (!title) title = "";
    if (!subtile) subtile = "";
    const innerTitle = title.toUpperCase();
    let innerSubtile = subtile.charAt(0).toUpperCase() + subtile.slice(1);
    if(innerSubtile.length > 300) innerSubtile = innerSubtile.slice(0, 301) + "...";
    return (
        <>
            <div className="bFlex bAlignItems">
                <div className="bFlexIconBig ">{children}</div>
                <div className={`${"bTitleMiddle bBold bLetterSapcing bColorTitle"}`}>
                    {innerTitle}
                </div>
            </div>
            
            <div className={`${"bContent bColorSubtitle bMarginTop"}`}>{innerSubtile}</div>
        </>
    );
});
