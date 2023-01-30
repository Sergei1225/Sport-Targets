import s from './ModalWindow.module.scss';

import { CBtnStyled } from '../../component/BaseComponents/CustomComponents';
import { SpinnerComp } from "../SpinnerComp/SpinnerComp";
import { HintComponent } from "../HintComponent/HintComponent";
import { GetSvg } from '../GetSvg/GetSvg';

import { useEffect, useState } from 'react';

// {
//     name: "deleteSomeTrenings",
//     title: "Delete some trenings",
//     subtitle: "Not trenings for delete.",
//     loading: { title: "", subtitle: "Deleting trenings" },
//     endLoading: { title: "Deleted trenings", subtitle: `${subtitle} deleted` },
// },

export const ModalWindow = ({
    control,
    title,
    subtitle,
    functionAction,
    loading = {title: '', subtitle: "Loading..."},
    endLoading = {title: '', subtitle: "End loading"} ,
    nameFunction = "notName",
}) => {
    const [active, setActive] = useState(false);
    const [componentsView, setComponentsView] = useState(true);
    const [text, setText] = useState({ title: "Title", subtitle: "Subtitle" });

    useEffect(() => {
        if (control) modelsBehavior(control);
    }, [control]);

    const modelsBehavior = (modalAction) => {
        switch (modalAction) {
            case "function":
                setText({ title, subtitle });
                setComponentsView(true);
                setActive(true);
                break;
            case "message":
                setComponentsView(false);
                setText({ title, subtitle });
                setTimeout(() => setActive(true), 310);
                setTimeout(() => {
                    setActive(false);
                    functionAction("clear");
                }, 2000);
                break;
            case "loading":
                setComponentsView(false);
                setText({ title: loading.title, subtitle: loading.subtitle });
                setTimeout(() => setActive(true), 310);
                break;
            case "endLoading":
                setText({ title: endLoading.title, subtitle: endLoading.subtitle });
                setTimeout(() => setActive(false), 2310);
                break;
            default:
                return null;
        }
    };

    const modalActions = (param) => {
        if (control !== "function") return;
        switch (param) {
            case "close":
                setActive(false);
                functionAction("clear");
                break;
            default:
                console.error("error modal function");
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
                        <SpinnerComp text={text.subtitle} styleText={s.modalWindow__textLoading} />
                    ) : (
                        <>
                            <div className={`${s.modalWindow__title} bElement bTitleSmall bBold`}>{text.title}</div>
                            <div className={`${s.modalWindow__message} bElement bContentBig`}>{text.subtitle}</div>
                        </>
                    )}

                    <div className={`${s.modalWindow__btns} ${componentsView && s.modalWindow__active} bFlex`}>
                        <CBtnStyled funk={() => functionAction(nameFunction)} innerValue={"Add action"} />
                        <CBtnStyled funk={() => modalActions("close")} innerValue={"Cancel"} />
                    </div>
                    <div
                        onClick={() => modalActions("close")}
                        className={`${s.modalWindow__icon} ${componentsView && s.modalWindow__active} bSizeIconSmall`}
                    >
                        <HintComponent inner={"Close window"}>
                            <div className={`${""} bSizeIconSmall`}>
                                <GetSvg nameSvg={"deleteCross"} />
                            </div>
                        </HintComponent>
                    </div>
                </div>
            </div>
        </div>
    );
};