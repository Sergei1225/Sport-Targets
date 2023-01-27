import s from "./ModalTrenings.module.scss";

import { CustomTitleBase } from "../../BaseComponents/CustomComponents";
import { CBtnStyled } from "../../BaseComponents/CustomComponents";
import { HintComponent } from "../../../serviceComponents/HintComponent/HintComponent";
import { GetSvg } from "../../../serviceComponents/GetSvg/GetSvg";

import { changeStatusModal } from "../ListTrenings/sliceListTrenings";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const ModalTrenings = ({ nameSvg = "locker", title = "Modal window" }) => {

    const [active, setActive] = useState(false);

    const dispatch = useDispatch();

    const {name: modalAction, inner: subtitle} = useSelector((state) => state.listTrenings.modalAction);

    useEffect(() => {
        if(modalAction) setActive(true)
    }, [modalAction]);

    const modalActions = (modalAction) => {
        if (!modalAction) return;

        switch (modalAction) {
            case "deleteSomeTrenings":
                changeModal(false);
                console.log("deleteSomeTrenings");
                dispatch(changeStatusModal(''))
                break;
            case "close":
                changeModal(false);
                dispatch(changeStatusModal(''))
                break;
            default:
        }
    };

    const changeModal = () => {
        setActive((active) => !active);
    };

    const activeStyle = active ? s.modal__active : s.modal__disabled;

    return (
        <div onClick={() => modalActions("close")} className={`${s.modal} bFlexCenter ${activeStyle}`}>
            <div onClick={(e) => e.stopPropagation()} className={s.modal__window}>
                <div className={`${s.modalWindow}`}>
                    <div className={`${s.modalWindow__wrapper} bWrapperStyle bElement bFlexColumnCenter`}>
                        <div className={`${s.modalWindow__title} bElement bTitleSmall bBold`}>
                            Title modal
                        </div>
                        <div className={`${s.modalWindow__message} bElement bContentBig`}>
                            {subtitle}
                        </div>
                        <div className={`$ ${""} bFlex`}>
                            <CBtnStyled funk={() => modalActions(modalAction)} innerValue={"Add action"} />
                            <CBtnStyled funk={() => modalActions("close")} innerValue={"Cancel"} />
                        </div>
                        <div onClick={() => modalActions("close")} className={`${s.modalWindow__icon} bSizeIconSmall`}>
                            <HintComponent inner={"Close window"}>
                                <div className={`${""} bSizeIconSmall`}>
                                    <GetSvg nameSvg={"deleteCross"} styleSvg={`${""} ${""}`} />
                                </div>
                            </HintComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
