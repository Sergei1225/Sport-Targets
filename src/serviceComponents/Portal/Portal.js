import { useMemo, useEffect } from "react";

import ReactDOM from "react-dom";

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