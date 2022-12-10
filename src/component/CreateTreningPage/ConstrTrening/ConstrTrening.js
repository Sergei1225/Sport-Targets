import s from "./ConstrTrening.module.scss";

import { CustomTitle, CustomButton } from "../../BaseComponents/CustomComponents";
import { TuningTrening } from "../TuningTrening/TuningTrening";
import { SimpleTuning } from "../SimpleTuning/SimpleTuning";

import { getSelectedItems, deleteSelectedItem, deleteAllSelectedItem } from "./sliceConstrTrening";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ConstrTrening = () => {
    const itemsForTuning = useSelector((state) => state.constrTrening.dataSelectedItems);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelectedItems());
    }, []);

    const deleteSelectedItems = (id) => {
        dispatch(deleteSelectedItem(id))
    }

    const deleteAllTunnings = () => {
        dispatch(deleteAllSelectedItem())
    }

    console.log('dsd');

    const tuningTrenings = (data) => {
        if (data.length === 0) return null;
        return data.map((item) => {
            const itemTurning = item.typeOfExercise === "base" ? (
                <TuningTrening
                    deleteItem={deleteSelectedItems}
                    key={item.id}
                    title={item.name}
                    id={item.id}
                />
            ) : (
                <SimpleTuning
                    deleteItem={deleteSelectedItems}
                    key={item.id}
                    title={item.name}
                    id={item.id}
                />
            );
            return <CSSTransition key={item.id} timeout={500} classNames="baseTransition">{itemTurning}</CSSTransition>
        });
    };

    const tuningItems = useMemo(() => {
        return tuningTrenings(itemsForTuning);
    }, [itemsForTuning]);

    return (
        <div className={`${s.constrTren}  ${"basePositionBlock"}`}>
            <div className={`${s.constrTren__header} ${"basePositionBlock"}`}>
                <CustomTitle
                    title={"Choose and customize exercises"}
                    subtile={"You can quickly select the desired exercises and customize"}
                />
            </div>
            <div className={`${"basePositionBlock"}`} onClick={() => navigate("/chooseExercise")}>
                <button className={` ${"basePositionElement baseBtn"}`}>Choose exercise</button>
            </div>
            <div className={`${s.constrTren}  ${"basePositionBlock"}`}>
                <CustomTitle
                    title={"Tuning"}
                    subtile={"You can quickly select the desired exercises and customize"}
                />
                 <TransitionGroup>
                    {tuningItems}
                </TransitionGroup>
            </div>
            <div className={` ${"basePositionBlock baseFlexGapNoJC"}`}>
                <CustomButton
                    //active={}
                    funk={deleteAllTunnings}
                    innerValue={"Clear tuning"}
                />
            </div>
        </div>
    );
};
