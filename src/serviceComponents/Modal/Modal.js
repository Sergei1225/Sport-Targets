import s from "./Modal.module.scss";

import { useState, Children, cloneElement } from "react";

export const Modal = ({children}) => {

    const [active, setActive] = useState(false);

    const changeModal = () => {
        setActive(active => !active);
    };

    const activeStyle = active ? s.modal__active : s.modal__disabled;

    return (
        <div onClick={changeModal} className={`${s.modal} bFlexCenter ${activeStyle}`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={s.modal__window}
            >
                {Children.map(children, child => {
                    return cloneElement(child, {changeModal, stateModal: active})
                })}
            </div>
        </div>
    );
};

