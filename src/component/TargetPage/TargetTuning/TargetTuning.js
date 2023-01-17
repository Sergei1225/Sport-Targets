import s from "./targetTuning.module.scss";

import { randomId } from "../../../service/RandomId";
import { GetSvg } from "../../../serviceComponents/GetSvg/GetSvg";

import { CustomTitleBase, CBtnStyled } from "../../BaseComponents/CustomComponents";

export const TargetTuning = (props) => {
    let { id, title, descr, img, workingParts, changeParams, paramValues, dataParams, deleteItem } = props;

    const createBtnsChoose = (data) => {
        if (!data) return null;
        return data.map((item) => {
            return (
                <CBtnStyled
                    key={randomId()}
                    funk={() => changeParams(item)}
                    active={paramValues.some((itemComp) => item === itemComp)}
                    innerValue={item.toUpperCase()}
                />
            );
        });
    };

    const itemsBtns = createBtnsChoose(dataParams);

    if (!title) title = "Selected exersice";
    if (descr && descr.length > 300) descr = descr.slice(0, 301) + "...";

    return (
        <div className={`${s.targetTuning} bBlock `}>
            <div className={`${s.targetTuning__wrapper} bWrapperStyle bElement `}>
                <div className={`${s.targetTuning__trening} bFlex bAlignItems`}>
                    <div className={`${s.targetTuning__image} bElement`}>
                        <img className={`bImgCover bBorderRadius`} src={img} alt="imgTarget" />
                    </div>
                    <div className={`${""} bElement`}>
                        <div className={`${""} bElement`}>
                            <CustomTitleBase title={title} nameSvg={"gantel"} styleSvg={""} />
                        </div>
                        <div className={`${""} bElement bContent`}>{descr}</div>
                        <div className={`${""} bElement bContent`}>
                            <span className="bBold bContentBig">WORKING PARTS:</span> {workingParts}
                        </div>
                    </div>
                </div>
                <div className={`${""} bFlex bElement`}>{itemsBtns}</div>
            </div>
            {deleteItem ? (
                <div
                    onClick={() => deleteItem && deleteItem(id)}
                    className={`${s.targetTuning__delete} bSizeIconSmall`}
                >
                    <GetSvg nameSvg={"cancelIcon"} styleSvg={s.targetTuning__delete_color} />
                </div>
            ) : null}
        </div>
    );
};
