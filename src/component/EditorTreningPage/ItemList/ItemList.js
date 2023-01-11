import s from "./ItemList.module.scss";

import { dataIconsFunction } from "./dataFunctions";

import { HintComponent } from "../../../serviceComponents/HintComponent/HintComponent";
import { GetSvg } from "../../../serviceComponents/GetSvg/GetSvg";

export const ItemList = (props) => {
    let {
        id,
        name,
        img,
        repeats,
        weight,
        forDelete,
        priority,
        addForDelete,
        priorityTren,
        deleteOneTren,
        typeOfExercise,
        fullTime,
        editor,
    } = props;

    let styleWrapper;

    if (img.length < 1) img = ["https://i.ytimg.com/vi/za4aqmV_j0M/maxresdefault.jpg"];
    if (!repeats || repeats.length < 1) repeats = ["No data"];
    if (!weight || weight.length < 1) weight = ["No data"];

    if (forDelete) styleWrapper += ` ${s.itemList__forDelete}`;
    if (priority) styleWrapper += ` ${s.itemList__priority}`;
    if (!fullTime) fullTime = 1000;

    const repeatsItems = repeats.join(" / ");
    const weightItems = weight.join(" / ");

    const functionsComponent = (nameFunct) => {
        switch (nameFunct) {
            case "delete":
                deleteOneTren(id);
                break;
            case "editor":
                editor(id);
                break;
            case "priority":
                priorityTren(id, priority);
                break;
            case "addForDelete":
                addForDelete(id, forDelete);
                break;
            default:
                console.log("error function");
        }
    };

    const createFunctionIcons = (data) => {
        const items = data.map((item) => {
            return (
                <div
                    key={item.id}
                    onClick={() => functionsComponent(item.nameFunct)}
                    className={`${s.itemList__icon} `}
                >
                    <HintComponent inner={item.hint}>
                        <div className={`${s.itemList__icon} bSizeIconSmall`}>
                            <GetSvg nameSvg={item.nameSvg} styleSvg={s.itemList__svgFunc} />
                        </div>
                    </HintComponent>
                </div>
            );
        });
        return <div className={`bElement bFlex bFlexJCSA bFlexWrap bPaddingTop0`}>{items}</div>;
    };

    const functionIcons = createFunctionIcons(dataIconsFunction);

    return (
        <div draggable={false} key={id} className={`${s.itemList} bElement `}>
            <div className={`${s.itemList__wrapper} ${styleWrapper} bFlex bWrapperStyleElem`}>
                <div className=" bContent bFlexColumn bAlignItems bFlexJCSC">
                    <div className={`${s.itemList__img} bElement`}>
                        <img className={` bImgCover bBorderRadius `} src={[img]} alt="imgList" />
                    </div>
                    {functionIcons}
                </div>
                <div className={`${s.itemList__text} bElement`}>
                    <div className={`${s.itemList__title} ${s.itemList__path} bElement bContentBig bBold bFlex`}>
                        <div className="bSizeIconSmall">
                            <GetSvg nameSvg={typeOfExercise === "base" ? "weightCircle" : "run"} />
                        </div>
                        {name.toUpperCase()}
                    </div>
                    {typeOfExercise === "base" ? (
                        <>
                            <div className={`${s.itemList__path} bElement  bContent `}>
                                <div className="bFlex">
                                    <div className="bSizeIconSmall">
                                        <GetSvg nameSvg={"pencilIcon"} styleSvg={s.itemList__svgStyle} />
                                    </div>
                                    <div className={`bBold bContentBig`}>Repeats: </div>
                                </div>
                                <div className="bMarginTop">{repeatsItems}</div>
                            </div>
                            <div className={`${s.itemList__path}  bElement bContent`}>
                                <div className="bFlex">
                                    <div className="bSizeIconSmall">
                                        <GetSvg nameSvg={"locker"} styleSvg={s.itemList__svgStyle} />
                                    </div>
                                    <div className={`bBold bContentBig`}>Weight: </div>
                                </div>
                                <div className="bMarginTop">{weightItems}</div>
                            </div>
                        </>
                    ) : (
                        <div className={`${s.itemList__path} bElement bContent bFlex bAlignItems`}>
                            <div className="bSizeIconSmall">
                                <GetSvg nameSvg={"timer"} styleSvg={s.itemList__svgStyle} />
                            </div>
                            <div className={`bBold bContentBig`}>Time: </div>
                            {fullTime}min
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
