import s from "./ListTrening.module.scss";

import { ItemList } from "../ItemList/ItemList";
import { CustomButton } from "../../BaseComponents/CustomComponents";

import { selectorsAdapter, getAlllistTrenings } from "./sliceListEditorTrening";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const ListEditorTrening = ({ path }) => {
    const dispatch = useDispatch();

    const allItemsList = useSelector(selectorsAdapter.selectAll);

    useEffect(() => {
        dispatch(getAlllistTrenings(path));
    }, []);

    const createContentItems = (data) => {
        return data.map((item) => {
            const { id } = item;

            return (
                <CSSTransition key={id} timeout={600} classNames="baseTransition">
                    <ItemList key={id} {...item} />
                </CSSTransition>
            );
        });
    };

    const loadingView = allItemsList.length === 0 ? <h1>Loading...</h1> : null;

    const contentItems = allItemsList.length > 0 ? createContentItems(allItemsList) : null;

    return (
        <>
            <div className="basePositionBlock baseFlexGapNoJC">
                <CustomButton innerValue={"Delete list exercises"} />
                <CustomButton innerValue={"Delete all"} />
            </div>

            {loadingView}
            <TransitionGroup className={`${"basePositionBlock"} `}>{contentItems}</TransitionGroup>
        </>
    );
};
