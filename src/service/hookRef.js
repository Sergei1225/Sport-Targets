import { useEffect, useRef, useState } from "react";

export const VisibleHook = ({initialState}) => {

    // хук подходит для определения на тот ли компоненнт нажали
    const [visible, setVisible] = useState(initialState); // булевое значение
    const ref = useRef();

    const showRef = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setVisible(false)
        }
    };

    useEffect(() => {
        document.addEventListener("click", showRef);
        return () => {
            document.removeEventListener("click", showRef);
        };
    });

    return {ref};
};
