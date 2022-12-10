import s from "./ListTrening.module.scss";

import { ItemListCreateTrening } from "../ItemList/ItemList";
import { dataItems } from "./dataListSample";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
    treningsGetAll,
    selectorsAdapter,
    addTrening,
    deleteTren,
    priorityTren,
    deleteListTren,
    deleteAllTren,
    addToDelete,
} from "./listSliceCreateTrening";

export const ListTrening = ({ data }) => {
    //console.log("рендер  " + title);

    const dispatch = useDispatch();

    const allItemsList = useSelector(selectorsAdapter.selectAll);
    const forDeleteSelector = useSelector((state) => state.listCreateTrening.listForDelete);
    const idEdited = useSelector((state) => state.listCreateTrening.editElementId);
    // const itemId = useSelector(state => selectorsAdapter.selectById(state, idEdited));
    // const totalItems = useSelector(selectorsAdapter.selectTotal)

    // console.log(allItemsList);
    // console.log(forDeleteSelector);
    // console.log(forDeleteSelector);

    useEffect(() => {
        dispatch(treningsGetAll(dataItems));
    }, []);

    const addForDelete = (id, forDelete) => {
        dispatch(addToDelete({ id, forDelete }));
    };

    const changePriorityTren = (id, priority) => {
        dispatch(priorityTren({ id, priority }));
    };

    const deleteOneTren = (id) => {
        dispatch(deleteTren(id));
    };


    const createContentItems = (data) => {
        return data.map((item) => {
            const { id } = item;

            return (
                <CSSTransition key={id} timeout={600} classNames="baseTransition">
                    <ItemListCreateTrening
                        key={id}
                        {...item}
                        addForDelete={addForDelete}
                        priorityTren={changePriorityTren}
                        deleteOneTren={deleteOneTren}
                    />
                </CSSTransition>
            );
        });
    };

    const loadingView = allItemsList.length === 0 ? <h1>Loading...</h1> : null;

    const contentItems = allItemsList.length > 0 ? createContentItems(allItemsList) : null;

    return (
        <>
            <div className="basePositionBlock baseFlexGapNoJC">
                <button onClick={() => dispatch(deleteListTren())}>Удалить выбранное</button>
                <button onClick={() => dispatch(deleteAllTren())}>Удалить всё</button>
            </div>

            {loadingView}
            <TransitionGroup className={`${"basePositionBlock"} `}>{contentItems}</TransitionGroup>
        </>
    );
};
