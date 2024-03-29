import { SelectWithButtons } from "../SelectWithButtons/SelectWithButtons";
import { ChoiseValue } from "../ChoiseValue/ChoiseValue";
import { AddedItems } from "../AddedItems/AddedItems";

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
    addSelectedItemOnlyOne,
    changePagePath,
} from "./sliceSelectExercise";

import { useNavigate, Navigate } from "react-router-dom";
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
    const pageNavigate = useSelector((state) => state.selectExercise.pagePath);
    const dataDetailItems = useSelector(dataDetail);

    // после отправки тренировки следует смена страницы
    if (pageNavigate === "targetWeigth") {
        setTimeout(() => {
            dispatch(changePagePath());
            navigate("/createTarget");
        }, 2000);
    }

    const getValue = (value) => {
        if (paramSave === "creator" || paramSave === "editor") {
            if (value) dispatch(addSelectedItem(value));
        } else if (paramSave === "targetWeigth") {
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

    console.log(paramSave);

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
                pathSave = "newTargetWeigth";
                funcSave = "target";
                break;
            default:
                pathSave = "";
        }

        if (funcSave === "simpleSave") {
            console.log("simpleSave");
            if (!selectedItemsList || selectedItemsList.length === 0 || !pathSave) return;
            dispatch(saveExercise({ data: selectedItemsList, path: pathSave }));
            navigate(-1, { replace: true });
        } else if (funcSave === "target") {
            console.log("target");
            dispatch(saveExerciseTarget({ data: selectedItemsList, path: pathSave }));
        }
    };

    /// с помощью paramSelect я отображаю или не отбражают нужные элементы для выбора
    /// SelectWithButtons paramSelect контролирует наличие кнопок для выбора нескольких упражнений
    /// ChoiseValue paramSelect контролирует выбор базовый выбор в упражнениях

    return (
        <div className={`${" "}`}>
            <SelectWithButtons
                paramSelect={paramSave}
                getValue={getValue}
                multi={multi}
                dataSelect={listItemsSelect}
                changeMulti={changeMultiValue}
                getSomeValues={getSomeValues}
            />
            <AddedItems
                paramItem={paramSave}
                deleteAll={deleteAll}
                listItems={selectedItemsList}
                deleteSelectedItem={deleteSelectedItem}
                saveExersice={saveExersice}
            />
            <ChoiseValue
                changeDetailfunck={changeDetailfunck}
                detail={detail}
                changeBasefunck={changeBasefunck}
                base={base}
                dataDetail={dataDetailItems}
                paramSelect={paramSave}
            />
        </div>
    );
};
