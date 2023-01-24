import { SpinnerComp } from "../SpinnerComp/SpinnerComp";
import { ErrorMassage } from "../ErrorMassage/ErrorMassage";

import { TransitionGroup } from "react-transition-group";

export const ContentLoading = ({loadingStatus, itemsTrening, errorStatus={name: "Error", message: "Not Found"},  textLoading = "Loading..."}) => {
    if(!loadingStatus) return null;

    switch (loadingStatus) {
        case "loading":
            return <SpinnerComp size={"middle"} sizeWrapper={"middle"} text={textLoading} />;
        case "contentTransition":
            return <TransitionGroup>{itemsTrening}</TransitionGroup>;
        case "content":
            return itemsTrening;
        case "error":
            return <ErrorMassage textError={`${errorStatus.name}: ${errorStatus.message}`} />;
        default:
            return <SpinnerComp size={"middle"} sizeWrapper={"middle"} text={"Loading..."} />;
    }
};
