import { TuningTrening } from "../TuningTrening/TuningTrening";
import { SimpleTuning } from "../SimpleTuning/SimpleTuning";

import { ViewConstrEditorTrening } from "../../../View/ViewConstrEditorTrening/ViewConstrEditorTrening";

import { getSelectedItems, deleteSelectedItem, deleteAllSelectedItem } from "./sliceConstrEditorTrenings";
import { addTunigedTrening } from "../ListEditorTrening/sliceListEditorTrening";

import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ConstrEditorTrening = (props) => {
    const { pathConstr, pathList, pathLinkChoose } = props;

    const itemsForTuning = useSelector((state) => state.constrEditorTrening.dataSelectedItems);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelectedItems(pathConstr));
    }, []);

    const deleteSelectedItems = (id) => {
        dispatch(deleteSelectedItem({ id, path: pathConstr }));
    };

    const saveTren = (newItem) => {
        const base = itemsForTuning.find((item) => item.id === newItem.id);

        const fullNewItem = {
            ...base,
            ...newItem,
        };

        console.log(fullNewItem);
        dispatch(addTunigedTrening({ data: fullNewItem, path: pathList }));
        dispatch(deleteSelectedItem({ id: fullNewItem.id, path: pathConstr }));
    };

    const deleteAllTunnings = () => {
        dispatch(deleteAllSelectedItem(pathConstr));
    };

    const tuningTrenings = (data) => {
        if (data.length === 0) return null;
        return data.map((item) => {
            const { id, name, img, order } = item;
            const itemTurning =
                item.typeOfExercise === "base" ? (
                    <TuningTrening
                        key={id}
                        repeats={item.repeats}
                        weights={item.repeats}
                        title={name}
                        id={id}
                        imgSrc={img}
                        order={order}
                        saveItem={saveTren}
                        deleteItem={deleteSelectedItems}
                    />
                ) : (
                    <SimpleTuning
                        key={id}
                        title={name}
                        id={id}
                        imgSrc={img}
                        order={order}
                        fullTime={item.fullTime}
                        saveItem={saveTren}
                        deleteItem={deleteSelectedItems}
                    />
                );
            return (
                <CSSTransition key={item.id} timeout={500} classNames="baseTransition">
                    {itemTurning}
                </CSSTransition>
            );
        });
    };

    const tuningItems = tuningTrenings(itemsForTuning);
    const functionChoose = () => navigate(pathLinkChoose);

    return (
        <ViewConstrEditorTrening  
            functionChoose={functionChoose} 
            tuningItems={tuningItems} 
            deleteAllTunnings={deleteAllTunnings} 
        />
    );
};
