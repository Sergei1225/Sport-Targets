import { CustomCheck, CCheckStyled } from "../component/BaseComponents/CustomComponents";

export const createChecks = (data, funcChange, param, styleWrapper) => {
    if (!data || data.length === 0) return null;
    if (!styleWrapper) styleWrapper = "basePositionElementNoMT baseFlexGapNoJC ";
    const items = data.map(({ value, id }) => {
        const innerValue = value.charAt(0).toUpperCase() + value.slice(1);
        let active = "basePositionElement ";
        active += param === value ? " baseActive" : "";

        return (
            <CustomCheck
                key={id}
                styleItem={active}
                innerValue={innerValue}
                funcChange={funcChange}
                itemValue={value}
                itemKey={id}
                checkedActive={param === value}
            />
        );
    });

    return <div className={`${styleWrapper}`}>{items}</div>;
};

export const createChecksBase = (data, funcChange, param) => {
    if (!data || data.length === 0) return null;

    return data.map(({ value, id }) => {

        const innerValue = value.charAt(0).toUpperCase() + value.slice(1);

        return (
            <CCheckStyled
                key={id}
                innerValue={innerValue}
                funcChange={funcChange}
                itemValue={value}
                itemKey={id}
                checkedActive={param === value}
            />
        );
    });
};
