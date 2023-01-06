import s from "./SearchTrenings.module.scss";

import { createChecksBase } from "../../../service/createChecks";
import { CustomTitleBase } from "../../BaseComponents/CustomComponents";

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

    return (
        <div className={`${s.searchTrenings} bBlock`}>
            <div className={`${s.searchTrenings__wrapper} bElement bWrapperStyle`}>
                <div className={`${s.searchTrenings__title} bElement`}>
                    <CustomTitleBase
                        title={"Search"}
                        subtile={
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo dignissimos ab nostrum neque."
                        }
                        nameSvg={"bottle"}
                        styleSvg={s.searchTrenings__icon}
                    />
                </div>
                <div className={`${s.searchTrenings__wrapper} bElement bFlex bFlexWrap`}>
                    <div className={`${s.searchTrenings__search}`}>
                        <input
                            className={`${""} bInput`}
                            onChange={(e) => dispatch(changeSearchValue(e.target.value))}
                            value={searchValue}
                            type="text"
                            placeholder="Enter data"
                        />
                    </div>
                    <div className={`${s.searchTrenings__check} bFlex bFlexCenter`}>{checksItemsBase}</div>
                </div>
            </div>
        </div>
    );
};
