import s from "./ListTrenings.module.scss";

import { ItemListTrenings } from "./ItemListTrenings/ItemListTrenings";

import {
    baseDeleteItem,
    baseChangeProp,
    filtredItems,
    setTrenings,
} from "./sliceListTrenings";
import { selectorsAdapter } from "./sliceListTrenings";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { dataTreningsItems } from "./dataTreningsItems";

export const ListTrenings = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTrenings(dataTreningsItems));
    }, []);

    const allItemsList = useSelector(selectorsAdapter.selectAll);
    const itemsList = useSelector(filtredItems);
    const loadingStatus = useSelector((state) => state.listTrenings.loadingStatus);
    const visibleView = useSelector((state) => state.listTrenings.visibleView);

    const changeProp = (id, prop) => {
        dispatch(baseChangeProp(id, prop));
    };

    const deleteItem = (id) => {
        dispatch(baseDeleteItem(id));
    };

    const createItems = (data) => {
        if(!data || data.length === 0) return null
        return data.map((item) => {
            return (
                <CSSTransition key={item.id} timeout={600} classNames="baseTransition">
                    <ItemListTrenings {...item} changeProp={changeProp} deleteItem={deleteItem} />
                </CSSTransition>
            );
        });
    };

    const itemsTrening = createItems(itemsList, visibleView);

    console.log("рендер листайтема");

    return (
        <div className={`${s.baseTrenings__view} basePositionBlock `}>
            <div className={s.baseTrenings__title}>List trenings</div>
            <TransitionGroup >{itemsTrening}</TransitionGroup>
        </div>
    );
};
