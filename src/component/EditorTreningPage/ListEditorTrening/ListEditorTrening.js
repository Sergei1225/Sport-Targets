import s from "./ListEditorTrening.module.scss";

import { ItemList } from "../ItemList/ItemList";
import { CBtnStyled } from "../../BaseComponents/CustomComponents";

import { setOneTrening } from "../ConstrEditorTrening/sliceConstrEditorTrenings";
import {
    selectorsAdapter,
    treningsCompare,
    getListTrenings,
    deleteOneTrening,
    deleteAllTrening,
    deleteSomeTrening,
    addForEditor,
    addToDelete,
    changePriorityExersice
} from "./sliceListEditorTrening";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const ListEditorTrening = (props) => {
    const { pathList, pathTrening, currentItemId, pathConstr } = props;

    const dispatch = useDispatch();

    const allItemsList = useSelector(selectorsAdapter.selectAll);

    useEffect(() => {
        if (currentItemId) {
            dispatch(treningsCompare({ pathList, pathTrening, currentItemId }));
        } else {
            dispatch(getListTrenings(pathList));
        }
    }, []);

    const changePriority = (id, priority) => {
        dispatch(changePriorityExersice({ id, path: pathList, priority: priority }));
    }

    const deleteOneTren = (id) => {
        dispatch(deleteOneTrening({ id, path: pathList }));
    };

    const deleteSomeTren = () => {
        dispatch(deleteSomeTrening(pathList));
    };
    const deleteTrenAll = () => {
        dispatch(deleteAllTrening(pathList));
    };
    const addEditor = (id) => {
        const item = allItemsList.find((item) => item.id === id);
        dispatch(addForEditor({ data: item, pathList: pathList, pathConstr: pathConstr }));
        dispatch(setOneTrening(item));
    };

    const addForDelete = (id, forDelete) => {
        dispatch(addToDelete({ id, forDelete }));
    };

    const createContentItems = (data) => {
        return data.map((item) => {
            const { id } = item;

            return (
                <CSSTransition key={id} timeout={600} classNames="baseTransition">
                    <ItemList
                        editor={addEditor}
                        deleteOneTren={deleteOneTren}
                        addForDelete={addForDelete}
                        priorityTren={changePriority}
                        key={id}
                        {...item}
                    />
                </CSSTransition>
            );
        });
    };

    const loadingView = allItemsList.length === 0 ? <h3>Loading...</h3> : null;

    const contentItems = allItemsList.length > 0 ? createContentItems(allItemsList) : null;

    return (
        <div className={`${s.listEditorTrening} bBlock`}>
            {/* <div className={`${s.listEditorTrening__modal} `}>Modal</div> */}
            <div className={`${s.listEditorTrening__wrapper}  `}>
                <div className={`${s.listEditorTrening__btns} bElement bWrapperStyle bFlex`}>
                    <CBtnStyled funk={deleteSomeTren} innerValue={"Delete list exercises"} />
                    <CBtnStyled funk={deleteTrenAll} innerValue={"Delete all"} />
                </div>
                <div className={`${s.listEditorTrening__list} bElement bWrapperStyle`}>
                    {loadingView}
                    <TransitionGroup className={`${"bElement"} `}>{contentItems}</TransitionGroup>
                </div>
            </div>
        </div>
    );
};
