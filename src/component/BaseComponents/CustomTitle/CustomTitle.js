import { memo } from "react";
import { GetSvg } from "../../../serviceComponents/GetSvg/GetSvg";

export const CustomTitle = memo(({ title, subtile }) => {
    const innerTitle = title.charAt(0).toUpperCase() + title.slice(1);
    return (
        <>
            <div className={`${"baseFontContentBold"}`}>{innerTitle}</div>
            <div className={`${"baseSubtitle"}`}>{subtile}</div>
        </>
    );
});

export const CustomTitleBase = memo(({ title, subtile, nameSvg, styleSvg, styleTitle, sizeIcon }) => {
    if (!title) title = "";
    if (!subtile) subtile = "";
    if (!nameSvg) nameSvg = "list";

    const innerTitle = title.toUpperCase();
    let innerSubtile = subtile.charAt(0).toUpperCase() + subtile.slice(1);
    if(innerSubtile.length > 300) innerSubtile = innerSubtile.slice(0, 301) + "...";

    return (
        <>
            <div className="bFlex bAlignItems">
                <div className={`bFlexIconBig ${sizeIcon}`}>
                    <GetSvg nameSvg={nameSvg} styleSvg={styleSvg}/>
                </div>
                <div>
                    <div className={`${"bTitleMiddle bBold bLetterSapcing bColorTitle"} ${styleTitle}`}>
                        {innerTitle}
                    </div>
                    <div className={`${"bContent bColorSubtitle "}`}>{innerSubtile}</div>
                </div>
            </div>
            
            
        </>
    );
});

