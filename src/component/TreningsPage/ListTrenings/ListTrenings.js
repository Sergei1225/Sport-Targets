import s from "./ListTrenings.module.scss";

import { ItemListTrenings } from "./ItemListTrenings/ItemListTrenings";
import { CustomTitleBase } from "../../BaseComponents/CustomComponents";

import {
    filtredItems,
    setTrenings,
    deleteOneTrening,
    statusTrening,
    addToDelete,
    getMyTreningItems,
    favoriteTrening,
    statusTrenings,
} from "./sliceListTrenings";
import { selectorsAdapter } from "./sliceListTrenings";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { dataTreningsItems } from "./dataTreningsItems";
import { GetSvg } from "../../../serviceComponents/GetSvg/GetSvg";

export const ListTrenings = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyTreningItems());
        //dispatch(setTrenings(dataTreningsItems));
    }, []);

    const allItemsList = useSelector(selectorsAdapter.selectAll);
    const itemsList = useSelector(filtredItems);
    const loadingStatus = useSelector((state) => state.listTrenings.loadingStatus);
    const visibleView = useSelector((state) => state.listTrenings.visibleView);
    console.log(itemsList);

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

    console.log("рендер листайтема");

    return (
        <div className={`${s.listTrenings} bBlock `}>
            <div className={`${s.listTrenings__wrapper} bWrapperStyle bElement`}>
                <div className={`${s.listTrenings__title} bElement`}>
                    <CustomTitleBase
                        title={"List trenings"}
                        subtile={
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione earum necessitatibus sit alias quis hic eos, id eum expedita maxime dolorum nihil fugit consequatur recusandae est quos cum aliquid pariatur! "
                        }
                    >
                        <GetSvg nameSvg={"list"}/>
                    </CustomTitleBase>
                    
                </div>
                <TransitionGroup>{itemsTrening}</TransitionGroup>
            </div>
        </div>
    );
};
