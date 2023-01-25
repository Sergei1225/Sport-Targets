import s from "./ViewFiltersTrenings.module.scss";

import { CBtnStyled } from "../../component/BaseComponents/CustomComponents";
import { CustomSelect } from "../../component/BaseComponents/CustomComponents";

export const ViewFiltersTrenings = ({
    comparisonValues,
    filterValue,
    dataFilters,
    changeProp,
    dataOption,
    valueSelect,
    deleteListForDelete,
}) => {
    
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
        <div className={`${s.filters}`}>
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
