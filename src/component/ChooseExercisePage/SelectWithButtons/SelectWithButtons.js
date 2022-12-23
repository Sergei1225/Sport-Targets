import { SingleSelect } from "../../../serviceComponents/SingleSelect/SingleSelect";
import { CustomButton } from "../../BaseComponents/CustomComponents";

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
        <div className={`${"basePositionBlock baseBorderRadius"}`}>
            <SingleSelect
                getValueSelect={multi ? setSomeItems : getValue}
                sizeSelect={"100%"}
                placeholder={"Choise exercise"}
                multiOption={multi}
                dataOption={dataSelectItems}
                noOption={"exercises not found"}
            />
            {/* если это создание или редактирование тренировки то кнопчки будут */}
            {paramSelect === "creator" || paramSelect === "editor" ? ( 
                <div className={`${"baseFlexGapNoJC"} `}>
                    <CustomButton
                        active={!multi}
                        funk={() => changeMulti(false)}
                        innerValue={"One option"}
                    />
                    <CustomButton
                        active={multi}
                        funk={() => changeMulti(true)}
                        innerValue={"Some option"}
                    />
                </div>
            ) : null}

            {multi ? (
                <CustomButton
                    //active={multi}
                    funk={() => getSomeValues(someItems)}
                    innerValue={"Add some items"}
                />
            ) : null}
        </div>
    );
};
