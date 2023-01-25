import { ItemListTrenings } from "../ItemListTrenings/ItemListTrenings";
import { ViewListTrenings } from "../../../View/ViewListTrenings/ViewListTrenings";

import {
    filtredItems,
    deleteOneTrening,
    addToDelete,
    getMyTreningItems,
    favoriteTrening,
    statusTrenings,
} from "./sliceListTrenings";

import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const ListTrenings = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyTreningItems());
    }, []);

    const itemsList = useSelector(filtredItems);
    const loadingStatus = useSelector((state) => state.listTrenings.loadingStatus);
    const errorStatus = useSelector((state) => state.listTrenings.errorStatus);
    const visibleView = useSelector((state) => state.listTrenings.visibleView);

    const changeMark = (id, favorite) => {
        dispatch(favoriteTrening({ id, favorite }));
    };

    const changeStatus = (id, status) => {
        dispatch(statusTrenings({ id, status }));
    };

    const deleteItem = (id) => {
        dispatch(deleteOneTrening(id));
    };

    const addToDeleteList = (id, forDelete) => {
        dispatch(addToDelete(id, forDelete));
    };

    const createItems = (data) => {
        if (!data || data.length === 0) return null;
        return data.map((item) => {
            return (
                <CSSTransition key={item.id} timeout={600} classNames="baseTransition">
                    <ItemListTrenings
                        {...item}
                        changeProp={changeMark}
                        deleteItem={deleteItem}
                        changeStatus={changeStatus}
                        addToDelete={addToDeleteList}
                    />
                </CSSTransition>
            );
        });
    };

    const itemsTrening = createItems(itemsList, visibleView);
    //console.log("рендер листайтема");

    return <ViewListTrenings loadingStatus={loadingStatus} itemsTrening={itemsTrening} errorStatus={errorStatus} />;
};
