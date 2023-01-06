import s from "./FiltersTren.module.scss";

import { CBtnStyled, CustomSelect } from "../../BaseComponents/CustomComponents";

import { changeFilterTren, changeSort } from "./sliceFilterTren";
import { deleteSomeTrening } from "../ListTrenings/sliceListTrenings";

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
        dispatch(deleteSomeTrening());
    };

    const comparisonValues = (value, currentValue) => {
        if (value !== currentValue) dispatch(changeFilterTren(value));
        else return;
    };

    const filtredItems = (data) => {
        return data.map((item) => {
            return (
                <CBtnStyled
                    key={item.id}
                    funk={() => comparisonValues(item.value, filterValue)}
                    innerValue={item.text}
                    active={item.value === filterValue}
                />
            );
        });
    };

    const contentItems = filtredItems(dataFilters);

    console.log("фильтры");
    return (
        <div className={`${s.filters} bBlock`}>           
            <div className={`${""} bElement bFlex bFlexJCSB bFlexWrap`}>
                <CustomSelect
                    changeProp={changeProp}
                    styleItem={s.headerTrening__sort_select}
                    dataOption={dataOption}
                    valueSelect={valueSelect}
                />
                <CBtnStyled funk={deleteListForDelete} innerValue={"Delete selected"} />
            </div>
            <div className={`${s.filters__filtersValue} bFlex bFlexJCSB bFlexWrap bElement`}>{contentItems}</div>
        </div>
    );
};
