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
    saveExercise
} from "./sliceSelectExercise";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const SelectExercise = () => {
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

    const getValue = (value) => {
        if (value) dispatch(addSelectedItem(value));
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
        if(!selectedItemsList || selectedItemsList.length === 0) return;
        dispatch(saveExercise(selectedItemsList));
    };

    return (
        <div className={`${"basePositionBlock "}`}>
            <SelectWithButtons
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
                deleteAll={deleteAll}
                listItems={selectedItemsList}
                deleteSelectedItem={deleteSelectedItem}
                saveExersice={saveExersice}
            />
        </div>
    );
};
