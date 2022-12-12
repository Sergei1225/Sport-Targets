import { baseDeleteItem, baseChangeProp, changeView } from "./sliceBaseTrenings";
import { useDispatch, useSelector } from "react-redux";
import ItemBaseTrening from "./ItemBaseTrening/ItemBaseTrening";
import { useCallback, useEffect } from "react";
import { dataTrenFetching, filtredItems } from "./sliceBaseTrenings";
import ErrorMassage from "../componentService/ErrorMassage/ErrorMassage";
import BigSpinner from "../componentService/Spinner/BigSpinner";
import CardTrening from "../CardTrening/CardTrening";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Skeleton from "../Skeleton/Skeleton";

import s from "./BaseTrenings.module.scss";
import "./itemsList.scss";

const BaseTrenings = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(dataTrenFetching());
    }, []);

    const dataTren = useSelector(filtredItems);
    const loadingStatus = useSelector((state) => state.base.loadingStatus);
    const visibleView = useSelector((state) => state.base.visibleView);

    const changeProp = useCallback(
        (id, prop) => {
            dispatch(baseChangeProp(id, prop));
        },
        [dataTren]
    );

    const deleteItem = useCallback(
        (id) => {
            dispatch(baseDeleteItem(id));
        },
        [dataTren]
    );

    if (loadingStatus === "loading" || loadingStatus === "idle") {
        return <Skeleton itemsLine={4} itemsContent={5} view={"baseTrening"}/>;
    }

    const createItems = (data, view) => {
        if (view === "list") {
            return data.map((item) => {
                return (
                    <CSSTransition key={item.id} timeout={600} classNames="items" unmountOnExit>
                        <ItemBaseTrening
                            {...item}
                            changeProp={changeProp}
                            deleteItem={deleteItem}
                        />
                    </CSSTransition>
                );
            });
        } else if (view === "cards") {
            return data.map((item) => {
                return (
                    <CSSTransition key={item.id} timeout={600} classNames="items" unmountOnExit>
                        <CardTrening
                            key={item.id}
                            {...item}
                            changeProp={changeProp}
                            deleteItem={deleteItem}
                        />
                    </CSSTransition>
                );
            });
        }
    };

    const dataView = [
        { value: "list", inner: "списком", id: 988238932 },
        { value: "cards", inner: "карточками", id: 65453667 },
    ];

    const createViewItems = (data, currentView) => {
        return data.map((item) => {
            const styleItem =
                item.value === currentView ? s.baseTrenings__item_active : s.baseTrenings__item;

            return (
                <div
                    key={item.id}
                    data-current={item.value}
                    onClick={(e) =>
                        dispatch(changeView(e.currentTarget.getAttribute("data-current")))
                    }
                    className={styleItem}
                >
                    {item.inner}
                </div>
            );
        });
    };

    const itemsTrening = createItems(dataTren, visibleView);
    const itemsView = createViewItems(dataView, visibleView);

    console.log("рендер листайтема");

    const styleWrapper = visibleView === "list" ? null : s.baseTrenings__wrapper;

    return (
        <>
            <div className={s.baseTrenings__view}>
                <div className={s.baseTrenings__title}>Вид</div>
                {itemsView}
            </div>
            <TransitionGroup className={styleWrapper}>{itemsTrening}</TransitionGroup>
        </>
    );
};

export default BaseTrenings;

// const fetchDataTren = (data) => {
//     request("http://localhost:3001/dataTren", "POST", JSON.stringify(data))
//         .then((res) => console.log(res, "отправка успешно прошла"))
//         .catch((err) => console.log(err, "произошла ошибка"));
// };

//console.log(dataTrenA)

//fetchDataTren(dataTrenA[2]);

// const createItems = (data) => {
//     return data.map((item) => {
//         return (
//             <CardTrening
//                 key={item.id}
//                 treningsName={item.treningsName}
//                 id={item.id}
//                 date={item.date}
//                 basic={item.basic}
//                 favorite={item.favorite}
//                 full={item.full}
//                 changeProp={changeProp}
//                 deleteItem={deleteItem}
//             />
//         );
//     });
// };
