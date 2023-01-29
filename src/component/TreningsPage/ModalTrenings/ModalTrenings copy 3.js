import s from "./ModalTrenings.module.scss";

import { CBtnStyled } from "../../BaseComponents/CustomComponents";
import { HintComponent } from "../../../serviceComponents/HintComponent/HintComponent";
import { GetSvg } from "../../../serviceComponents/GetSvg/GetSvg";
import { SpinnerComp } from "../../../serviceComponents/SpinnerComp/SpinnerComp";

import { changeStatusModal, deleteSomeTrening, changeStatusModalOnly } from "../ListTrenings/sliceListTrenings";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const ModalTrenings = () => {
    const [active, setActive] = useState(false);
    const [componentsView, setComponentsView] = useState(true);

    const dispatch = useDispatch();

    const { name: modalAction, inner: subtitle, loading } = useSelector((state) => state.listTrenings.modalAction);

    console.log(componentsView);

    useEffect(() => {
        staticAction(modalAction);
        if (modalAction) setActive(true);
    }, [modalAction, loading]);

    useEffect(() => {
        if (loading) staticAction(loading);
    }, [loading]);

    const staticAction = (modalAction) => {
        switch (modalAction) {
            case "loading":
                setComponentsView(true);
                break;
            case "endLoading":
                setActive(false);
                setTimeout(() => {
                    setComponentsView(false);
                    dispatch(changeStatusModalOnly({ name: "", inner: "", loading: "" }));
                }, 1000);
                break;
            case "message":
                setActive(true);
                setComponentsView(true);
                setTimeout(() => {
                    setActive(false);
                    setTimeout(() => {
                        setComponentsView(false);
                        dispatch(changeStatusModalOnly({ name: "", inner: "", loading: "" }));
                    }, 1000);
                }, 3000);
                break;
            default:
        }
    };

    const modalActions = (modalAction) => {
        switch (modalAction) {
            case "deleteSomeTrenings":
                dispatch(deleteSomeTrening(deleteSomeTrening));
                dispatch(changeStatusModalOnly({ name: modalAction, inner: subtitle, loading: "loading" }));
                break;
            case "close":
                changeModal(false);
                dispatch(changeStatusModal(""));
                break;
            default:
        }
    };

    const changeModal = () => {
        if (!componentsView) {
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
                    {componentsView && modalAction !== "message" ? (
                        <SpinnerComp />
                    ) : (
                        <>
                            <div className={`${s.modalWindow__title} bElement bTitleSmall bBold`}>Title modal</div>
                            <div className={`${s.modalWindow__message} bElement bContentBig`}>{subtitle}</div>
                        </>
                    )}

                    <div className={`${s.modalWindow__btns} ${!componentsView && s.modalWindow__active} bFlex`}>
                        <CBtnStyled funk={() => modalActions(modalAction)} innerValue={"Add action"} />
                        <CBtnStyled funk={() => modalActions("close")} innerValue={"Cancel"} />
                    </div>
                    <div
                        onClick={() => modalActions("close")}
                        className={`${s.modalWindow__icon} ${!componentsView && s.modalWindow__active} bSizeIconSmall`}
                    >
                        <HintComponent inner={"Close window"}>
                            <div className={`${""} bSizeIconSmall`}>
                                <GetSvg nameSvg={"deleteCross"} styleSvg={`${""} ${""}`} />
                            </div>
                        </HintComponent>
                    </div>
                </div>
            </div>
        </div>
    );
};
