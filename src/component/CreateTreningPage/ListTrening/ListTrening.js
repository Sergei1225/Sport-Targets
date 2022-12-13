import s from "./ListTrening.module.scss";

import { ItemList } from "../ItemList/ItemList";
import { dataItems } from "./dataListSample";
import { CustomButton } from "../../BaseComponents/CustomComponents";

import {
    selectorsAdapter,
    priorityTren,
    addToDelete,
    getAlllistTrenings, 
    deleteOneTrening,
    deleteSomeTrening,
    deleteAllTrening,
    addForEditor,
    filtredItems
} from "./listSliceCreateTrening";

import { setOneTrening } from "../ConstrTrening/sliceConstrTrening";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";



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
        dispatch(getAlllistTrenings());
    }, []);

    const addForDelete = (id, forDelete) => {
        dispatch(addToDelete({ id, forDelete }));
    };

    const changePriorityTren = (id, priority) => {
        dispatch(priorityTren({ id, priority }));
    };

    const deleteOneTren = (id) => {
        dispatch(deleteOneTrening(id));
    };

    const deleteSomeTren = () => {
        dispatch(deleteSomeTrening());
    };
    const deleteTrenAll = () => {
        dispatch(deleteAllTrening());
    };
    const addEditor = (id) => {
        const item = allItemsList.find(item => item.id === id)
        dispatch(addForEditor(item));
        dispatch(setOneTrening(item));
    };


    const createContentItems = (data) => {
        return data.map((item) => {
            const { id } = item;

            return (
                <CSSTransition key={id} timeout={600} classNames="baseTransition">
                    <ItemList
                        key={id}
                        {...item}
                        addForDelete={addForDelete}
                        priorityTren={changePriorityTren}
                        deleteOneTren={deleteOneTren}
                        editor={addEditor}
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
                <CustomButton
                        funk={deleteSomeTren}
                        innerValue={"Delete list exercises"}
                    />
                <CustomButton
                    funk={deleteTrenAll}
                    innerValue={"Delete all"}
                />
            </div>

            {loadingView}
            <TransitionGroup className={`${"basePositionBlock"} `}>{contentItems}</TransitionGroup>
        </>
    );
};
