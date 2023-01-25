import s from "./ModalTrenings.module.scss";

import { CustomTitleBase } from "../../BaseComponents/CustomComponents";
import { CBtnStyled } from "../../BaseComponents/CustomComponents";
import { HintComponent } from "../../../serviceComponents/HintComponent/HintComponent";
import { GetSvg } from "../../../serviceComponents/GetSvg/GetSvg";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const ModalTrenings = ({
    nameSvg = "locker",
    title = "Modal window",
    subtitle = "Function descrition ",
    changeModal,
    stateModal,
}) => {

    const dispatch = useDispatch();

    const modalAction = useSelector((state) => state.listTrenings.modalAction);
    console.log(modalAction);

    useEffect(() => {
        if (!stateModal && modalAction) changeModal();
    }, [modalAction]);

    // switch(modalAction){
    //     case "deleteSomeTrenings":
    //         if(!stateModal)changeModal();
    //         break;
    //     default:

    // }

    return (
        <section className={`${s.modalWindow}`}>
            <div className={`${s.modalWindow__wrapper} bWrapperStyle bElement bFlexColumnCenter`}>
                <div className={`${s.modalWindow__title} bElement`}>
                    <CustomTitleBase title={title} subtile={subtitle} nameSvg={nameSvg}></CustomTitleBase>
                </div>
                <div className={`$ ${""} bElement bFlex`}>
                    <CBtnStyled funk={changeModal} innerValue={"Add action"} />
                    <CBtnStyled funk={changeModal} innerValue={"Cancel"} />
                </div>
                <div onClick={() => changeModal()} className={`${s.modalWindow__icon} bSizeIconSmall`}>
                    <HintComponent inner={"Close window"}>
                        <div className={`${""} bSizeIconSmall`}>
                            <GetSvg nameSvg={"deleteCross"} styleSvg={`${""} ${""}`} />
                        </div>
                    </HintComponent>
                </div>
            </div>
        </section>
    );
};
