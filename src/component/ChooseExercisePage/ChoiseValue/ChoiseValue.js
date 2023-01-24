import s from "./ChoiseValue.module.scss";

import { dataChoiseBase } from "./dataChoise";
import { CBtnStyled, CustomTitleBase } from "../../BaseComponents/CustomComponents";

import { useMemo } from "react";

export const ChoiseValue = (props) => {
    const { changeDetailfunck, detail, changeBasefunck, base, dataDetail, paramSelect } = props;

    const createChoiseDatail = (data, funcChange, param) => {
        if (!data || data.length === 0) return null;
        return data.map(({ value, id }) => {
            const innerValue = value.charAt(0).toUpperCase() + value.slice(1);

            return (
                <CBtnStyled key={id} active={param === value} funk={() => funcChange(value)} innerValue={innerValue} />
            );
        });
    };

    const choiseDatail = useMemo(() => {
        return createChoiseDatail(dataDetail, changeDetailfunck, detail);
    }, [dataDetail, detail]);

    const choiseBase = useMemo(() => {
        if (paramSelect === "targetWeigth") return null;
        return createChoiseDatail(dataChoiseBase, changeBasefunck, base);
    }, [base, paramSelect]);

    return (
        <div className={`${s.choiseValue} bBlock `}>
            <div className="bElement bWrapperStyle">
                <div className="bElement">
                    <CustomTitleBase
                        title={"Choose exercises"}
                        subtile={"You can choose exercises or exercise"}
                        nameSvg={"list"}
                        styleSvg={""}
                    />
                </div>

                <div className={`${" "}  bElement bFlex  bFlexWrap`}>{choiseBase}</div>
                <div className={`${s.choiseValue__line} `}></div>
                <div className={`${" "}  bElement bFlex  bFlexWrap bFlexJCSB`}>
                    {base === "aerobic" ? null : choiseDatail}
                </div>
            </div>
        </div>
    );
};
