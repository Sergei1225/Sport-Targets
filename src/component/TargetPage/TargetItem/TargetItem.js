import s from "./targetItem.module.scss";

import { CBtnStyled, CustomTitleBase } from "../../BaseComponents/CustomComponents";
import { TargetShow } from "../TargetShow/TargetShow";

import { Link } from "react-router-dom";

const itemsData = [
    { id: "JdsyhgHtyashss7378637GGhsd6whhs", percent: false, nameSvg: "timer", title: "Date of target: 12.03.2022" },
    { id: "743hnsdhsd77haqwwszhdh7e473asa", percent: 34, nameSvg: "gantelSquare", title: "Weight" },
    { id: "JdsyhgHtyashss7378637GGhsd6whhs", percent: 56, nameSvg: "days", title: "Days" },
    { id: "JdsyhgHtyashss489398332uhHjdjs", percent: 75, nameSvg: "list", title: "Trenings" },
];

export const TargetItem = (props) => {
    let { title, baseImg, subtitle, nameSvg, styleSvg, linkTo } = props;

    if (!title) title = "TITLE";
    if (!nameSvg) nameSvg = "locker";
    if (!linkTo) linkTo = "/chooseExerciseTargetWeigth";
    if (!baseImg) baseImg = "https://skyfitness.ua/wp-content/uploads/2021/06/sf1.jpg";
    if (!subtitle)
        subtitle =
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error magni dolor amet maiores harum, voluptatum culpa ";

    const createItems = (data) => {
        return data.map((item) => {
            return (
                <div key={item.id} className="bElement bPaddingBottm0">
                    <CustomTitleBase
                        sizeIcon={"bFlexIconSmall"}
                        styleTitle={"bTitleSmall"}
                        title={item.title}
                        nameSvg={item.nameSvg}
                        styleSvg={styleSvg}
                    />
                    {item.percent ? (
                        <div className={`${s.targetItem__scale}  bFlex bAlignItems bPaddingTop0`}>
                            <div className={`${s.targetItem__index}  `}>
                                <div
                                    style={{ width: `${item.percent}%` }}
                                    className={`${s.targetItem__index_active}  `}
                                ></div>
                            </div>
                            <div className={`${s.targetItem__percent}  bContentBig bBold`}>{item.percent}%</div>
                        </div>
                    ) : null}
                </div>
            );
        });
    };

    const itemsTarget = createItems(itemsData);

    return (
        <div className={`${s.targetItem}  bBlock`}>
            <div className={`${s.targetItem__wrapper} bElement bWrapperStyle bFlex `}>
                <div className={`${s.targetItem__content} bFlexColumn `}>
                    <div className={`${s.targetItem__title} bPaddingLeft10`}>
                        <CustomTitleBase title={title} subtile={subtitle} nameSvg={nameSvg} styleSvg={styleSvg} />
                    </div>
                    <div className={`${s.targetItem__complited}  `}>
                       {itemsTarget}
                    </div>
                    <div className={`${s.targetItem__btns} bElement bFlex`}>
                        <Link className={``} to={linkTo}>
                            <CBtnStyled innerValue={"Choose exercise"} addStyle={s.targetItem__btn} />
                        </Link>
                    </div>
                </div>
                <TargetShow stateSlider={true} />
            </div>
        </div>
    );
};
