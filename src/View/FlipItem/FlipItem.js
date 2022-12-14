import s from "./FlipItem.module.scss";

import cross from "../../img/ItemListCreateTrening/icon/can.png";

export const FlipItem = (props) => {
    let { name, baseImg, descr, addfunc, list, id, deleteItem, workingParts, coup, hoverBack } = props;
    // list для кнопки добавления


    if (!name) name = "Name";
    if (!baseImg) baseImg = "https://i.ytimg.com/vi/za4aqmV_j0M/maxresdefault.jpg";
    if (!descr)
        descr =
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia neque magnam, harum est repellat inventore recusandae reprehenderit eveniet consequatur provident aspernatur earum natus molestias iste nemo vitae distinctio quasi veritatis.";
    if(descr.length > 150) descr = `${descr.slice(0, 151)}...`;

    if(!workingParts || workingParts.length === 0 ) workingParts = ['legs', 'arms'];
    if(workingParts.length > 3) workingParts = workingParts.slice(0, 3)

    const styleCoup = coup ? s.flipItem__coup : '';
    const styleHover = hoverBack ? s.flipItem__hoverBack : '';

    return (
        <div className={`${s.flipItem__wrapper} ${styleHover}`}>
            <div className={`${s.flipItem} ${styleCoup} `}>
                <div className={`${s.flipItem__front} baseBorderRadius baseBoxShadow`}>
                    <div className={`${s.flipItem__img} `}>
                        <img className={`baseImgCover `} src={baseImg} alt="flipItem" />
                    </div>
                    <div className={`${s.flipItem__name} baseFontTitleSmall`}>{name}</div>
                </div>
                <div className={`${s.flipItem__back} baseBorderRadius baseBoxShadow baseFlexColumnCenter`}>
                    <div className={`${s.flipItem__back_title} baseFontContentBigBold `}>Description</div>
                    <div className={`${s.flipItem__back_desckr} baseFontContent basePositionElement`}>{descr}</div>
                    <div className={`${s.flipItem__back_parts} baseFontContent basePositionElement`}>
                        {workingParts.join(" || ")}
                    </div>
                </div>
            </div>
            {deleteItem ? (
                <div
                    onClick={() => deleteItem && deleteItem(id)}
                    className={`${s.flipItem__delete} baseSizeImgSmall`}
                >
                    <img className={`baseImgCover `} src={cross} alt="deleteIcon" />
                </div>
            ) : null}

            {list ? (
                <button
                    onClick={() => addfunc && addfunc(id)}
                    className={`basePositionElement baseBtn`}
                >
                    To list
                </button>
            ) : null}
        </div>
    );
};
