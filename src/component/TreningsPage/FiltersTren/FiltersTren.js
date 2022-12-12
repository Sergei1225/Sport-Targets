import s from "./FiltersTren.module.scss";

import { CustomButton } from "../../BaseComponents/CustomComponents";

import { changeFilterTren } from "./sliceFilterTren";
import { useDispatch, useSelector } from "react-redux";

export const FiltersTren = () => {
    const dispatch = useDispatch();

    const dataFilters = useSelector((state) => state.filterTrens.dataFilters);
    const filterValue = useSelector((state) => state.filterTrens.filterValue);

    const comparisonValues = (value, currentValue) => {
        if (value !== currentValue) dispatch(changeFilterTren(value));
        else return;
    };

    const filtredItems = (data) => {
        return data.map((item) => {

            return (
                <CustomButton
                    key={item.id}
                    funk={() => comparisonValues(item.value, filterValue)}
                    innerValue={item.text}
                    active={item.value === filterValue}
                />
            )
        });
    };

    const contentItems = filtredItems(dataFilters);

    console.log("фильтры");
    return <div className={`${s.filters} baseFlexGapNoJC basePositionBlock`}>{contentItems}</div>;
};

