import { SpinnerComp } from "../SpinnerComp/SpinnerComp";
import { ErrorMassage } from "../ErrorMassage/ErrorMassage";

import { TransitionGroup } from "react-transition-group";
import { randomId } from "../../service/RandomId";

export const ContentLoading = ({
    loadingStatus,
    itemsTrening,
    errorStatus = { name: "Error", message: "Not Found" },
    textLoading = "Loading...",
    loadingComponent = <SpinnerComp size={"middle"} sizeWrapper={"middle"} text={"Loading..."} />,
}) => {
    if (!loadingStatus) return null;

    const loadingItemsCreate = (
        targets = 3,
        loadingComponent = <SpinnerComp size={"middle"} sizeWrapper={"middle"} text={textLoading} />
    ) => {
        const loadingItems = [];
        for (let i = 0; i < targets; i++) {
            loadingItems.push(
                <div key={randomId()} className="bFlex10300px">
                    {{ ...loadingComponent }}
                </div>
            );
        }
        return <div className="bFlex">{loadingItems}</div>;
    };

    switch (loadingStatus) {
        case "loading":
            return <SpinnerComp size={"middle"} sizeWrapper={"middle"} text={textLoading} />;
        case "loadingTargets":
            return loadingItemsCreate();
        case "contentTransition":
            return <TransitionGroup>{itemsTrening}</TransitionGroup>;
        case "content":
            return itemsTrening;
        case "error":
            return <ErrorMassage textError={`${errorStatus.name}: ${errorStatus.message}`} />;
        default:
            return loadingComponent;
    }
};
