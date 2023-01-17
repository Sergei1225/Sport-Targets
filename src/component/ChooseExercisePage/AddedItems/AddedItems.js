import s from "./addedItems.module.scss";

import { FlipItem } from "../../../View/FlipItem/FlipItem";
import { CBtnStyled, CustomTitleBase } from "../../BaseComponents/CustomComponents";
import { TargetItem } from "../../TargetPage/TargetItem/TargetItem";
import { TargetTuning } from "../../TargetPage/TargetTuning/TargetTuning";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useMemo } from "react";

export const AddedItems = (props) => {
    const { listItems, deleteSelectedItem, deleteAll, saveExersice, paramItem } = props;

    const createAdedItems = (data) => {
        if (!data) return null;
        if (paramItem === "creator" || paramItem === "editor") {
            return data.map((item) => {
                return (
                    <CSSTransition key={item.id} timeout={600} classNames="baseTransition">
                        <FlipItem
                            name={item.name}
                            baseImg={item.img[0]}
                            descr={item.descr}
                            key={item.id}
                            id={item.id}
                            deleteItem={deleteSelectedItem}
                            workingParts={item.workingParts}
                            hoverBack={true}
                        />
                    </CSSTransition>
                );
            });
        } else if (paramItem === "targetWeigth") {
            return data.map((item) => {
                return (
                    <CSSTransition key={item.id} timeout={600} classNames="baseTransition">
                        <TargetTuning
                            deleteItem={deleteSelectedItem}
                            key={item.id}
                            name={item.name}
                            descr={item.descr}
                            img={item.img[0]}
                            workingParts={item.workingParts.join(" | ")}
                        />
                    </CSSTransition>
                );
            });
        }
    };

    const adedItems = createAdedItems(listItems, deleteSelectedItem);

    return (
        <div className={`${"bBlock"}`}>
            <div className="bElement bWrapperStyle">
                <div className="bElement">
                    <CustomTitleBase
                        title={"Selected exercises"}
                        subtile={"selected exercises to add to the list trening"}
                        nameSvg={"gantelSquare"}
                        styleSvg={""}
                    />
                </div>
                <TransitionGroup className={`${" bFlex bFlexWrap bFlexJCSA bPaddingTop20"}`}>{adedItems}</TransitionGroup>
                <div className={`${s.addedItems__line} `}></div>
                <div className={`$ ${""} bElement bFlex`}>
                    <CBtnStyled funk={saveExersice} innerValue={"Save trening"} />
                    <CBtnStyled funk={deleteAll} innerValue={"Clear all"} />
                </div>
            </div>
        </div>
    );
};
