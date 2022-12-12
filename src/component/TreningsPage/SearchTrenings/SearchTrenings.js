import s from "./SearchTrenings.module.scss";

import { createChecks } from "../../../service/createChecks";

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

    const checksItems = createChecks(dataCheck, changeParam, param)

    return (
        <div className={`${s.searchTrenings}`}>
            <div className={`${s.searchTrenings__title} basePositionElement baseFontTitleSmall`}>Search</div>
            <div className={`${s.searchTrenings__wrapper} basePositionBlock baseFlex`} >
                <div className={`${s.searchTrenings__search}`}>
                    <input
                        className={`${""} basePositionElement baseFontContentBold`}
                        onChange={(e) => dispatch(changeSearchValue(e.target.value))}
                        value={searchValue}
                        type="text"
                        placeholder="Enter data"
                    />
                </div>
                <div className={`${s.searchTrenings__check}`}>
                    {checksItems}
                </div>
            </div>
        </div>
    );
};
