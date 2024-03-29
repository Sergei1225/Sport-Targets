import s from './IconList.module.scss';

import { GetSvg } from "../GetSvg/GetSvg";
import { HintComponent } from "../HintComponent/HintComponent";


export const IconList = ({data, funcComp, styleWrapper, styleHint, styleSvg, positionHint}) => {
    if(!data) return null;

    if(!styleWrapper) styleWrapper = "bElement bFlex ";
    if(!styleHint) styleHint = s.iconList__hint;


    const items = data.map(({id, nameFunct, hint, nameSvg}) => {
        return (
            <div
                key={id}
                onClick={() => funcComp && funcComp(nameFunct)}
                className={`${s.iconList__icon} `}
            >
                <HintComponent left={positionHint} inner={hint} styleContent={styleHint}>
                    <div className={`${s.iconList__icon} bSizeIconSmall`}>
                        <GetSvg nameSvg={nameSvg} styleSvg={`${styleSvg} ${s.iconList__svgFunc}`} />
                    </div>
                </HintComponent>
            </div>
        );
    });
    return <div className={styleWrapper}>{items}</div>;
};
