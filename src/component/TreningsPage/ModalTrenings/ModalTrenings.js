import s from "./ModalTrenings.module.scss";

import { CBtnStyled } from "../../BaseComponents/CustomComponents";
import { HintComponent } from "../../../serviceComponents/HintComponent/HintComponent";
import { GetSvg } from "../../../serviceComponents/GetSvg/GetSvg";
import { SpinnerComp } from "../../../serviceComponents/SpinnerComp/SpinnerComp";

import { changeStatusModal } from "../ListTrenings/sliceListTrenings";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const ModalTrenings = ({ nameSvg = "locker", title = "Modal window" }) => {
    const [active, setActive] = useState(false);
    const [componentsView, setComponentsView] = useState(false);

    const dispatch = useDispatch();

    const { name: modalAction, inner: subtitle } = useSelector((state) => state.listTrenings.modalAction);

    useEffect(() => {
        if (modalAction) setActive(true);
    }, [modalAction]);

    const modalActions = (modalAction) => {
        if (!modalAction) return;

        switch (modalAction) {
            case "deleteSomeTrenings":
                changeModal(false);
                console.log("deleteSomeTrenings");
                dispatch(changeStatusModal(""));
                break;
            case "close":
                changeModal(false);
                dispatch(changeStatusModal(""));
                break;
            default:
        }
    };

    const changeModal = () => {
        if (componentsView) {
            setActive((active) => !active);
        }
    };

    return (
        <div
            onClick={() => modalActions("close")}
            className={`${s.modalWindow} bFlexCenter ${active && s.modalWindow__active}`}
        >
            <div onClick={(e) => e.stopPropagation()} className={s.modalWindow__window}>
                <div className={`${s.modalWindow__wrapper} bWrapperStyle bElement bFlexColumnCenter`}>
                    {componentsView ? (
                        <>
                            <div className={`${s.modalWindow__title} bElement bTitleSmall bBold`}>Title modal</div>
                            <div className={`${s.modalWindow__message} bElement bContentBig`}>{subtitle}</div>
                        </>
                    ) : (
                        <SpinnerComp />
                    )}

                    <div className={`${s.modalWindow__btns} ${componentsView && s.modalWindow__active} bFlex`}>
                        <CBtnStyled funk={() => modalActions(modalAction)} innerValue={"Add action"} />
                        <CBtnStyled funk={() => modalActions("close")} innerValue={"Cancel"} />
                    </div>
                    <div
                        onClick={() => modalActions("close")}
                        className={`${s.modalWindow__icon} ${componentsView && s.modalWindow__active} bSizeIconSmall`}
                    >
                        <HintComponent inner={"Close window"}>
                            <div className={`${""} bSizeIconSmall`}>
                                <GetSvg nameSvg={"deleteCross"} styleSvg={`${""} ${""}`} />
                            </div>
                        </HintComponent>
                    </div>
                    <button onClick={() => setComponentsView(componentsView => !componentsView)}>test</button>
                </div>
            </div>
        </div>
    );
};
