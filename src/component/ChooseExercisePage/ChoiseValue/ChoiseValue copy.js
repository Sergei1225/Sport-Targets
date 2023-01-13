import { CustomCheck } from "../../BaseComponents/CustomComponents";
import { dataChoiseBase } from "../../CreateTreningPage/ConstrTrening/dataChoise";
import { CBtnStyled } from "../../BaseComponents/CustomComponents";

import { useMemo } from "react";

export const ChoiseValue = (props) => {
    const { changeDetailfunck, detail, changeBasefunck, base, dataDetail, paramSelect } = props;

    const comparisonValues = (value, currentValue) => {
        if (value !== currentValue) funcChange();
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

    const createChoiseDatail = (data, funcChange, param) => {
        if(!data || data.length === 0) return null
        const items = data.map(({ value, id }) => {
            const innerValue = value.charAt(0).toUpperCase() + value.slice(1);
            let active = "basePositionElement "
            active += param === value ? " baseActive": "";

            return (
                <>
                    <CBtnStyled key={id} active={param === value} funk={funcChange} innerValue={innerValue} />
                    {/* <CustomCheck
                    key={id}
                    styleItem={active}
                    innerValue={innerValue}
                    funcChange={funcChange}
                    itemValue={value}
                    itemKey={id}
                    checkedActive={param === value}
                /> */}
                
                </>
                
            );
        });

        return <div className={`${"basePositionBlock baseFlexGapNoJC "}`}>{items}</div>;
    };

    const choiseDatail = useMemo(() => {
        return createChoiseDatail(dataDetail, changeDetailfunck, detail);
    }, [dataDetail, detail]);

    const choiseBase = useMemo(() => {
        if(paramSelect === "targetWeigth") return null;
        return createChoiseDatail(dataChoiseBase, changeBasefunck, base);
    }, [base, paramSelect]);

    return (
        <div className={`${" "} basePositionBlock `}>
            <div className={`${" baseFlexGapNoJC"}  `}>{choiseBase}</div>
            <div className={`${" baseFlexGapNoJC"}  `}>
                {base === "aerobic" ? null : choiseDatail}
            </div>
        </div>
    );
};
