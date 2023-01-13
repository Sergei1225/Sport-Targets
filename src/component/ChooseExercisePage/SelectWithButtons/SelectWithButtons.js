import s from "./selectWithButtons.module.scss";

import { SingleSelect } from "../../../serviceComponents/SingleSelect/SingleSelect";
import { CBtnStyled } from "../../BaseComponents/CustomComponents";

import { useMemo } from "react";
import { useState } from "react";

export const SelectWithButtons = (props) => {
    const { multi, getValue, dataSelect, changeMulti, getSomeValues, paramSelect } = props;
    const [someItems, setSomeItems] = useState(null);

    const createDataSelect = (data) => {
        if (!data) return null;
        return data.map((item) => ({
            value: item.id,
            label: item.name,
        }));
    };

    const dataSelectItems = useMemo(() => {
        return createDataSelect(dataSelect);
    }, [dataSelect]);

    return (
        <div className={`${s.withButtons} ${"bBlock "}`}>
            <div className={`${"bElement bWrapperStyle "}`}>
                <div className={`${"bElement "} `}>
                    <SingleSelect
                        getValueSelect={multi ? setSomeItems : getValue}
                        placeholder={"Choise exercise"}
                        multiOption={multi}
                        dataOption={dataSelectItems}
                        noOption={"exercises not found"}
                        styleWrapper={"bContentBig"}
                    />
                </div>
                {/* если это создание или редактирование тренировки то кнопчки будут */}
                {paramSelect === "creator" || paramSelect === "editor" ? (
                    <div className={`${"bElement bFlex bPaddingTop0"} `}>
                        <CBtnStyled active={!multi} funk={() => changeMulti(false)} innerValue={"One option"} />
                        <CBtnStyled active={multi} funk={() => changeMulti(true)} innerValue={"Some option"} />
                    </div>
                ) : null}
                <div className={`${s.withButtons__btns} ${multi && s.withButtons__btns_active} ${" "} `}>
                    <CBtnStyled
                        //active={multi}
                        funk={() => getSomeValues(someItems)}
                        innerValue={"Add some items"}
                    />
                </div>
            </div>
        </div>
    );
};
