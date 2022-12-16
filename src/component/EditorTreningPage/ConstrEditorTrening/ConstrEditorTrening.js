import s from "./ConstrTrening.module.scss";

import { CustomTitle, CustomButton } from "../../BaseComponents/CustomComponents";
import { TuningTrening } from "../TuningTrening/TuningTrening";
import { SimpleTuning } from "../SimpleTuning/SimpleTuning";

import { getSelectedItems } from "./sliceConstrEditorTrenings";
//import { addTunigedTrening } from "../ListEditorTrening/sliceListEditorTrening";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ConstrEditorTrening = ({path}) => {
    const itemsForTuning = useSelector((state) => state.constrEditorTrening.dataSelectedItems);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelectedItems(path));
    }, []);


    const saveTren = (newItem) => {
        const base = itemsForTuning.find((item) => item.id === newItem.id);

        const fullNewItem = {
            ...base,
            ...newItem,
        };

        console.log(fullNewItem);
        //dispatch(addTunigedTrening(fullNewItem));
    };

    const tuningTrenings = (data) => {
        if (data.length === 0) return null;
        return data.map((item) => {
            const { id, name, img, order } = item;
            const itemTurning =
                item.typeOfExercise === "base" ? (
                    <TuningTrening
                        key={id}
                        title={name}
                        id={id}
                        saveItem={saveTren}
                        imgSrc={img}
                        order={order}
                    />
                ) : (
                    <SimpleTuning
                        key={id}
                        saveItem={saveTren}
                        title={name}
                        id={id}
                        imgSrc={img}
                        order={order}
                    />
                );
            return (
                <CSSTransition key={item.id} timeout={500} classNames="baseTransition">
                    {itemTurning}
                </CSSTransition>
            );
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
            <div className={`${"basePositionBlock"}`}>
                <CustomButton
                    funk={() => navigate("/chooseExercise")}
                    innerValue={"Choose exercise"}
                />
            </div>
            <div className={`${s.constrTren}  ${"basePositionBlock"}`}>
                <CustomTitle
                    title={"Tuning"}
                    subtile={"You can quickly select the desired exercises and customize"}
                />
                <TransitionGroup>{tuningItems}</TransitionGroup>
            </div>
            <div className={` ${"basePositionBlock baseFlexGapNoJC"}`}>
                <CustomButton innerValue={"Clear tuning"} />
            </div>
        </div>
    );
};
