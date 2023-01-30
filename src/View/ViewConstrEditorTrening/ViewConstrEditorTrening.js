import s from "./ViewConstrEditorTrening.module.scss";

import { CustomTitleBase, CBtnStyled } from "../../component/BaseComponents/CustomComponents";

import { TransitionGroup } from "react-transition-group";

export const ViewConstrEditorTrening = ({ functionChoose, tuningItems, deleteAllTunnings }) => {
    return (
        <div className={`${s.constrTren}  ${" bBlock"}`}>
            <div className={`${s.constrTren__header} ${" bWrapperStyle bElement"}`}>
                <CustomTitleBase
                    title={"Choose and customize exercises"}
                    subtile={"You can quickly select the desired exercises and customize"}
                    nameSvg={"bottle"}
                    styleSvg={""}
                />
                <div className={`${s.constrTren__link} ${"bElement"}`}>
                    <CBtnStyled funk={functionChoose} innerValue={"Choose exercise"} />
                </div>
            </div>
            <div className={`${s.constrTren__list}  ${" bWrapperStyle bElement"}`}>
                <CustomTitleBase
                    title={"Tuning"}
                    subtile={"You can quickly select the desired exercises and customize"}
                    nameSvg={"bagIcon"}
                    styleSvg={""}
                />
                <TransitionGroup>{tuningItems}</TransitionGroup>
                <div className={`${s.constrTren__btns} ${"bElement "}`}>
                    <CBtnStyled funk={deleteAllTunnings} innerValue={"Clear tuning"} />
                </div>
            </div>
        </div>
    );
};
