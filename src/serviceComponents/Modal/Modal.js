import { useState, useMemo, useEffect } from "react";

import ReactDOM from "react-dom";

import s from "./Modal.module.scss";

export const Modal = (props) => {

    const [active, setActive] = useState(true);

    const changeModal = () => {
        setActive(false);
    };

    const activeStyle = active ? s.modal__active : s.modal__disabled;

    return (
        <div onClick={changeModal} className={`${s.modal} ${activeStyle}`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={s.modal__window}
            >
              <h3>Modal</h3>
              <button onClick={changeModal}>Закрыть</button>
              <button >Открыть</button>
            </div>
        </div>
    );
};

export const Portal = ({ children, marker }) => {
    const node = useMemo(() => {
        const element = document.createElement("div");
        element.dataset.marker = marker;
        return element;
    }, [marker]);

    useEffect(() => {
        document.body.append(node);
        return () => {
            document.body.removeChild(node);
        };
    }, []);

    return ReactDOM.createPortal(children, node);
};
