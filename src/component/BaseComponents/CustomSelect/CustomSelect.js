import { memo } from "react";
import { randomId } from "../../../service/RandomId";

export const CustomSelect = memo((props) => {
    let { styleItem, dataOption, changeProp, valueSelect } = props;

    if (!styleItem) styleItem = "baseBtn baseBorderRadius ";

    //console.log('дефолтный селект')

    return (
        <select
            onChange={(e) => {
                changeProp(e.target.value);
            }}
            className={`${styleItem} basePositionElement`}
            value={valueSelect}
        >
            {dataOption.map((item) => {
                if (item.value === "") {
                    return (
                        <option key={randomId()} value={item.value} disabled>
                            {item.inner}
                        </option>
                    );
                }
                return (
                    <option key={randomId()} value={item.value}>
                        {item.inner}
                    </option>
                );
            })}
        </select>
    );
});
