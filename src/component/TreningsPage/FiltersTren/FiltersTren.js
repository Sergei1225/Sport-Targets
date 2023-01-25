import { ViewFiltersTrenings } from "../../../View/ViewFiltersTrenings/ViewFiltersTrenings";

import { changeFilterTren, changeSort } from "./sliceFilterTren";
import { deleteSomeTrening, changeStatusModal } from "../ListTrenings/sliceListTrenings";

import { useDispatch, useSelector } from "react-redux";

export const FiltersTren = () => {
    const dispatch = useDispatch();

    const dataFilters = useSelector((state) => state.filterTrens.dataFilters);
    const filterValue = useSelector((state) => state.filterTrens.filterValue);
    const dataOption = useSelector((state) => state.filterTrens.dataOption);
    const valueSelect = useSelector((state) => state.filterTrens.sortProp);

    const changeProp = (value) => {
        dispatch(changeSort(value));
    };

    const deleteListForDelete = () => {
        //dispatch(deleteSomeTrening());
        dispatch(changeStatusModal('deleteSomeTrenings'));
    };

    const comparisonValues = (value, currentValue) => {
        if (value !== currentValue) dispatch(changeFilterTren(value));
        else return;
    };

    console.log("фильтры");
    return (
        <ViewFiltersTrenings
            comparisonValues={comparisonValues}
            changeProp={changeProp}
            deleteListForDelete={deleteListForDelete}
            filterValue={filterValue}
            dataFilters={dataFilters}
            dataOption={dataOption}
            valueSelect={valueSelect}
        />
    );
};
