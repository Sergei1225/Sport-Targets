import { SelectWithButtons } from "../SelectWithButtons/SelectWithButtons";
import { ChoiseValue } from "../ChoiseValue/ChoiseValue";
import { AddedItems } from "../AddedItems/AddedItems";
import { SingleSelect } from "../../../serviceComponents/SingleSelect/SingleSelect";

import {
    selectedItems,
    deleteSelectItem,
    addSelectedItem,
    changeMulti,
    changeDetail,
    changeBase,
    listItems,
    dataDetail,
    deleteAllSelectItems,
    saveExercise,
    saveExerciseTarget,
    addSelectedItemOnlyOne
} from "./sliceSelectExercise";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const SelectExercise = (props) => {
    const { paramSave } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectedItemsList = useSelector(selectedItems);
    const listItemsSelect = useSelector(listItems);

    //const dataSelect = useSelector((state) => state.sliceSelectExercise.dataSelect);

    const multi = useSelector((state) => state.selectExercise.multi);
    const base = useSelector((state) => state.selectExercise.base);
    const detail = useSelector((state) => state.selectExercise.detail);
    const dataDetailItems = useSelector(dataDetail);
    //console.log(dataDetailItems);

    //console.log(listItems)
    // для отслеживания массива с выбранными элементами
    // const show = useSelector((state) => state.selectChooseExercise.selectedItems);
    // console.log(show);
    // addSelectedItemOnlyOne
    const getValue = (value) => {
        if(paramSave === "creator" || paramSave === "editor"){
            if (value) dispatch(addSelectedItem(value));
        } else if (paramSave === "targetWeigth"){
            console.log(value);
            if (value) dispatch(addSelectedItemOnlyOne(value));
        }
    };

    const getSomeValues = (value) => {
        if (value.length !== 0) {
            const prepareValue = value.map((item) => item.value);
            dispatch(addSelectedItem(prepareValue));
        }
    };

    const changeMultiValue = (value) => {
        dispatch(changeMulti(value));
    };

    const deleteSelectedItem = (id) => {
        dispatch(deleteSelectItem(id));
    };

    const changeDetailfunck = (value) => {
        dispatch(changeDetail(value));
    };
    const changeBasefunck = (value) => {
        dispatch(changeBase(value));
    };

    const deleteAll = () => {
        dispatch(deleteAllSelectItems());
    };

    const saveExersice = () => {
        let pathSave;
        let funcSave;

        switch (paramSave) {
            case "creator":
                pathSave = "selectedExercises";
                funcSave = "simpleSave";
                break;
            case "editor":
                pathSave = "exersiceForTuning";
                funcSave = "simpleSave";
                break;
            case "targetWeigth":
                pathSave = "targetWeigth";
                funcSave = "target";
                break;
            default:
                pathSave = "";
        }

        if (funcSave === "simpleSave") {
            if (!selectedItemsList || selectedItemsList.length === 0 || !pathSave) return;
            dispatch(saveExercise({ data: selectedItemsList, path: pathSave }));
            navigate("/");
        } else if (funcSave === "target") {
            console.log("target");
            dispatch(saveExerciseTarget({ data: selectedItemsList, path: pathSave }));
            navigate("/createTarget");
        }
    };

    return (
        <div className={`${"basePositionBlock "}`}>
            <SelectWithButtons
                paramSelect={paramSave}
                getValue={getValue}
                multi={multi}
                dataSelect={listItemsSelect}
                changeMulti={changeMultiValue}
                getSomeValues={getSomeValues}
            />
            <ChoiseValue
                changeDetailfunck={changeDetailfunck}
                detail={detail}
                changeBasefunck={changeBasefunck}
                base={base}
                dataDetail={dataDetailItems}
            />
            <AddedItems
                paramItem={paramSave}
                deleteAll={deleteAll}
                listItems={selectedItemsList}
                deleteSelectedItem={deleteSelectedItem}
                saveExersice={saveExersice}
            />
        </div>
    );
};
