import s from "./targetItem.module.scss";

import { CBtnStyled, CustomTitleBase } from "../../BaseComponents/CustomComponents";
import { TargetShow } from "../TargetShow/TargetShow";

import { Link } from "react-router-dom";

export const TargetItem = (props) => {
    let {
        title,
        subtitle,
        nameSvg,
        styleSvg,
        linkTo,
        dataItems,
        startDate,
        initialData,
        changeStatus,
        status,
        deleteTarget,
    } = props;

    if (!title) title = "TITLE";
    if (!nameSvg) nameSvg = "locker";
    if (!linkTo) linkTo = "/chooseExerciseTargetWeigth";
    if (!subtitle) subtitle = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

    const createItems = (data) => {
        return Object.keys(data).map((item) => {
            return (
                <div key={data[item].id} className="bElement bPaddingBottm0">
                    <CustomTitleBase
                        sizeIcon={"bFlexIconSmall"}
                        styleTitle={"bTitleSmall"}
                        title={item}
                        nameSvg={data[item].nameSvg}
                        styleSvg={styleSvg}
                    />
                    <div className={`${s.targetItem__scale}  bFlex bAlignItems bPaddingTop0`}>
                        <div className={`${s.targetItem__index}  `}>
                            <div
                                style={{ width: `${data[item].percent}%` }}
                                className={`${s.targetItem__index_active}  `}
                            ></div>
                        </div>
                        <div className={`${s.targetItem__percent}  bContentBig bBold`}>{data[item].percent}%</div>
                    </div>
                </div>
            );
        });
    };

    const itemsTarget = createItems(dataItems);

    return (
        <div className={`${s.targetItem}  bBlock`}>
            <div className={`${s.targetItem__wrapper} bElement bWrapperStyle bFlex `}>
                <div className={`${s.targetItem__content} bFlexColumn `}>
                    <div className={`${s.targetItem__title} bPaddingLeft10`}>
                        <CustomTitleBase title={title} subtile={subtitle} nameSvg={nameSvg} styleSvg={styleSvg} />
                    </div>
                    <div className={`${s.targetItem__date}  bBold bContentBig`}>Target setting date: {startDate}</div>
                    <div className={`${s.targetItem__complited}  `}>{itemsTarget}</div>
                    <div className={`${s.targetItem__btns} bElement bFlex bFlexWrap`}>
                        {status === "create" ? (
                            <Link className={``} to={linkTo}>
                                <CBtnStyled innerValue={"Choose exercise"} addStyle={s.targetItem__btn} />
                            </Link>
                        ) : (
                            <>
                                <Link className={``} to={linkTo}>
                                    <CBtnStyled innerValue={"Change exercise"} addStyle={s.targetItem__btn} />
                                </Link>
                                <CBtnStyled
                                    innerValue={status === "editor" ? "End editor target" : "Editor target"}
                                    addStyle={s.targetItem__btn}
                                    funk={() =>
                                        changeStatus && changeStatus(status === "editor" ? "content" : "editor")
                                    }
                                />
                                <CBtnStyled
                                    innerValue={"Delete target"}
                                    addStyle={s.targetItem__btn}
                                    funk={() => deleteTarget && deleteTarget()}
                                />
                            </>
                        )}
                    </div>
                </div>
                <TargetShow stateData={initialData} loadingData={"global"} stateSlider={true} />
            </div>
        </div>
    );
};
