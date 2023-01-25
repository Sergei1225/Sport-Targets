import { createChecksBase } from "../../../service/createChecks";
import { ViewSearchTrenings } from "../../../View/ViewSearchTrenings/ViewSearchTrenings";

import { changeSearchValue, searchParam } from "./sliceSearchTrenings";

import { useDispatch, useSelector } from "react-redux";

export const SearchTrenings = () => {
    const dispatch = useDispatch();

    const param = useSelector((state) => state.searchTrenings.param);
    const searchValue = useSelector((state) => state.searchTrenings.searchValue);
    const dataCheck = useSelector((state) => state.searchTrenings.dataCheck);

    const changeParam = (value) => {
        dispatch(searchParam(value));
    };

    const checksItemsBase = createChecksBase(dataCheck, changeParam, param);

    const changeSearch = (value) => {
        dispatch(changeSearchValue(value));
    };

    return (
        <ViewSearchTrenings changeSearch={changeSearch} searchValue={searchValue} checksItemsBase={checksItemsBase} />
    );
};
