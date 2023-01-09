import s from "./SimpleTuning.module.scss";

import { ViewAddRepeats } from "../../../View/ViewAddRepeats/ViewAddRepeats";

import { GetSvg } from "../../../serviceComponents/GetSvg/GetSvg";

import { useState } from "react";

export const SimpleTuning = (props) => {
    const { title, id, deleteItem, imgSrc, saveItem, order } = props;

    const [valueError, setValueError] = useState(null);

    const getValue = (value) => {
        if (value === 0) {
            setValueError("Error: not value");
            setTimeout(() => setValueError(""), 3000);
        } else {
            const newItem = { id, fullTime: value };
            saveItem(newItem);
        }
    };

    return (
        <div className={`${s.simpleTuning} ${"bBlock"}`}>
            <div className={`${s.simpleTuning__wrapper} bElement bWrapperStyle`}>
                <div className={`${s.simpleTuning__header} `}>
                    {!order ? (
                        <div className={`${s.simpleTuning__editor} bElement bContentBig bBold`}>EDITING ITEM</div>
                    ) : null}
                    <div
                        className={`${s.simpleTuning__delete} bElement bSizeIconSmall `}
                        onClick={() => deleteItem(id)}
                    >
                        <GetSvg nameSvg={"bucket"} />
                    </div>
                </div>
                <ViewAddRepeats
                    title={title}
                    valueHandler={getValue}
                    imgSrc={imgSrc[0]}
                    valueError={valueError}
                    //arrValues={itemsView}
                    subtile={"Lorem ipsum dolor sit amet "}
                    nameSvg={"run"}
                />
            </div>
        </div>
    );
};
