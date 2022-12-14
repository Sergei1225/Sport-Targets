import s from "./HeaderTrenings.module.scss";
import { srcImages } from "../../../img/srcImages";

import { headerChangeProp } from "./sliceHeaderTrenings";
import { deleteSomeTrening } from "../ListTrenings/sliceListTrenings";

import { CustomSelect, CustomButton } from "../../BaseComponents/CustomComponents";
import { BaseHeader } from "../../BaseHeader/BaseHeader";
import { useDispatch, useSelector } from "react-redux";

export const HeaderTrenings = () => {
    const dispatch = useDispatch();

    const dataOption = useSelector((state) => state.headerTrenings.dataOption);
    const valueSelect = useSelector((state) => state.headerTrenings.sortProp);

    const changeProp = (value) => {
        dispatch(headerChangeProp(value));
    };

    const deleteListForDelete = () => {
        dispatch(deleteSomeTrening());
    };

    console.log("хеадер");

    return (
        <div className={`${s.headerTrening} `}>
            <BaseHeader text={"MY TRENINGS"} srcImg={srcImages.redGym} />
            <div className={`${""} basePositionBlock`}>
                <div className={`${s.headerTrening__sort} baseFlexGapSB`}>
                    <CustomSelect
                        changeProp={changeProp}
                        styleItem={s.headerTrening__sort_select}
                        dataOption={dataOption}
                        valueSelect={valueSelect}
                    />
                    <CustomButton funk={deleteListForDelete} innerValue={"Delete selected"} />
                </div>
            </div>
        </div>
    );
};
