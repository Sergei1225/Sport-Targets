import s from "./ItemList.module.scss";

import paint from "../../../img/ItemListCreateTrening/icon/paint.svg";
import cross from "../../../img/ItemListCreateTrening/icon/can.png";
import list from "../../../img/ItemListCreateTrening/icon/list.png";
import star from "../../../img/ItemListCreateTrening/icon/star.png";

export const ItemListCreateTrening = (props) => {
    let { id, name, img, repeats, weight, forDelete, priority, addForDelete, priorityTren, deleteOneTren } = props;

    let styleWrapper;

    if (img.length < 1) img = ["https://i.ytimg.com/vi/za4aqmV_j0M/maxresdefault.jpg"];
    if (repeats.length < 1) repeats = ["No data"];
    if (weight.length < 1) weight = ["No data"];

    if(forDelete) styleWrapper += ` ${s.itemList__forDelete}`;
    if(priority) styleWrapper += ` ${s.itemList__prioroty}`;

    return (
        <div key={id} className={`${s.itemList} ${styleWrapper} basePositionBlock baseFlexGapNoJC `}>
            <div className={`${s.itemList__drag} basePositionElementNoMT`}>|||</div>
            <div className={`${s.itemList__img} basePositionElementNoMT`}>
                <img className={`baseImgCover`} src={[img]} alt="imgList" />
            </div>
            <div className={`${s.itemList__content} basePositionElementNoMT baseFlexGapNoJC`}>
                <div className={`${s.itemList__text} basePositionElementNoMT`}>
                    <div
                        className={`${s.itemList__text_title} basePositionElement baseFontTitleSmall`}
                    >
                        {name.toUpperCase()}
                    </div>
                    <div className={`${s.itemList__text_item} basePositionElement`}>
                        <span className={`baseFontContentBigBold`}>Repeats </span>
                        {repeats.join(" / ")}
                    </div>
                    <div className={`${s.itemList__text_item} basePositionElement`}>
                        <span className={`baseFontContentBigBold`}>Weight </span>
                        {weight.join(" / ")}
                    </div>
                </div>
                <div className={`${s.itemList__func} basePositionElementNoMT baseFlexGap`}>
                    <div onClick={() => addForDelete(id, forDelete)} className={`${s.itemList__func_item} baseSizeImgSmall`}>
                        <img className={`baseImgCover`} src={list} alt="imgFunction" />
                    </div>
                    <div onClick={() => priorityTren(id, priority)} className={`${s.itemList__func_item} baseSizeImgSmall`}>
                        <img className={`baseImgCover`} src={star} alt="imgFunction" />
                    </div>
                    <div className={`${s.itemList__func_item} baseSizeImgSmall`}>
                        <img className={`baseImgCover`} src={paint} alt="imgFunction" />
                    </div>
                    <div onClick={() => deleteOneTren(id)} className={`${s.itemList__func_item} baseSizeImgSmall`}>
                        <img className={`baseImgCover`} src={cross} alt="imgFunction" />
                    </div>
                </div>
            </div>
        </div>
    );
};
