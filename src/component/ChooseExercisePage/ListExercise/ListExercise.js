import { FlipItem } from "../../../View/FlipItem/FlipItem";

import { listItems, addSelectedItem } from "../SelectExercise/sliceSelectExercise";
import { listMainItems, listAllItems } from "./sliceListExercise";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import {useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

export const ListExercise = (props) => {
    const { dataList } = props;

    const listChoose = useSelector(listMainItems);
    const dispatch = useDispatch();

    const addItem = (id) => {
        dispatch(addSelectedItem(id));
    };

    //console.log('рендер листа')

    const createList = (data) => {
        if(!data) return null;
        return data.map((item) => {
            return (
                <CSSTransition key={item.id} timeout={600} classNames="baseTransition">
                    <FlipItem
                        id={item.id}
                        name={item.name}
                        baseImg={item.img[0]}
                        descr={item.descr}
                        addfunc={addItem}
                        key={item.id}
                        list={true}
                        workingParts={item.workingParts}
                    />
                </CSSTransition>
            );
        });
    };

    const itemsList = useMemo(() => {
        if (!dataList) return null;
        return createList(listChoose);
    }, [listChoose]);

    return <TransitionGroup className="baseFlexGapWrap basePaddingBottom">{itemsList}</TransitionGroup>;
};
