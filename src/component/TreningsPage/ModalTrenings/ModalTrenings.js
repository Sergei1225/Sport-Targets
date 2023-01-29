import s from "./ModalTrenings.module.scss";

import { CBtnStyled } from "../../BaseComponents/CustomComponents";
import { HintComponent } from "../../../serviceComponents/HintComponent/HintComponent";
import { GetSvg } from "../../../serviceComponents/GetSvg/GetSvg";
import { SpinnerComp } from "../../../serviceComponents/SpinnerComp/SpinnerComp";

import { changeStatusModal, deleteSomeTrening, changeStatusModalOnly } from "../ListTrenings/sliceListTrenings";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ModalWindow = ({
    control,
    clearControl,
    title,
    subtitle,
    functionAction,
    loading = "Loading...",
    endLoading = "End loading",
}) => {
    const [active, setActive] = useState(false);
    const [componentsView, setComponentsView] = useState(true);
    const [text, setText] = useState({ title: "Title", subtitle: "Subtitle" });

    useEffect(() => {
        if (control) modelsBehavior(control, clearControl);
    }, [control]);

    const modelsBehavior = (modalAction, clearControl) => {
        switch (modalAction) {
            case "function":
                setText({ title, subtitle });
                setComponentsView(true);
                setActive(true);
                break;
            case "message":
                setComponentsView(false);
                setText({ title, subtitle });
                setActive(true);
                setTimeout(() => {
                    setActive(false);
                    clearControl();
                }, 2000);
                break;
            case "loading":
                setComponentsView(false);
                setText({ title: "", subtitle: loading });
                setTimeout(() => setActive(true), 310);
                break;
            case "endLoading":
                setText({ title: "", subtitle: endLoading });
                setTimeout(() => setActive(false), 2310);
                break;
            default:
                return null;
        }
    };

    const modalActions = (param) => {
        if (control !== "function") return;
        switch (param) {
            case "action":
                functionAction();
                clearControl();
                break;
            case "close":
                setActive(false);
                clearControl();
                break;
            default:
        }
    };

    return (
        <div
            onClick={() => modalActions("close")}
            className={`${s.modalWindow} bFlexCenter ${active && s.modalWindow__active}`}
        >
            <div onClick={(e) => e.stopPropagation()} className={s.modalWindow__window}>
                <div className={`${s.modalWindow__wrapper} bWrapperStyle bElement bFlexColumnCenter`}>
                    {!componentsView && control === "loading" ? (
                        <SpinnerComp text={text.title} styleText={s.modalWindow__textLoading} />
                    ) : (
                        <>
                            <div className={`${s.modalWindow__title} bElement bTitleSmall bBold`}>{text.title}</div>
                            <div className={`${s.modalWindow__message} bElement bContentBig`}>{text.subtitle}</div>
                        </>
                    )}

                    <div className={`${s.modalWindow__btns} ${componentsView && s.modalWindow__active} bFlex`}>
                        <CBtnStyled innerValue={"Add action"} />
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
                </div>
            </div>
        </div>
    );
};

export const ModalTrenings = () => {
    const dispatch = useDispatch();

    const { nameFunc, control, subtitle } = useSelector((state) => state.listTrenings.modalAction);

    useEffect(() => {
        //if (control) modelsBehavior(control, clearControl);
    }, [control]);

    console.log("modal window");

    const createValuesInner = (name, subtitle) => {
        const valuesInner = [
            {
                name: "deleteSomeTrenings",
                title: "Delete some trenings",
                subtitle: subtitle ? `${subtitle} will be delete. Are you sure ?` : "Not trenings for delete.",
                loading: "Deleting trenings",
                endLoading: `${subtitle} deleted`,
            },
        ];

        return valuesInner.filter((item) => item.name === name)[0];
    };

    const clearControl = () => {
        dispatch(changeStatusModalOnly(""));
    };

    const functionAction = (param) => {
        switch (param) {
            case "action":
                break;
            case "close":
                break;
            default:
        }
    };

    const valuesItem = nameFunc ? createValuesInner(nameFunc, subtitle) : null;

    return (
        <ModalWindow
            control={control}
            clearControl={clearControl}
            title={valuesItem?.title}
            subtitle={valuesItem?.subtitle}
            functionAction={functionAction}
            loading={valuesItem?.loading}
            endLoading={valuesItem?.endLoading}
        />
    );
};
