import Select from "react-select";
import { useState, useEffect, memo, useMemo } from "react";
import "./SingleSelect.scss";

// const props = {
//     dataOption,
//     multiOption,
//     loading,
//     placeholder,
//     wrapper,
//     sizeSelect
// }

//     dataOption  дата для оптион формат [{value, label},{value, label}]
//     multiOption мультивыбор bollean
//     loading индикатор загрузки bollean
//     placeholder текст дефолта string
//     wrapper  облочка для селекта пока это инлайн объект
//     sizeSelect размер самого селекта
//     getValueSelect получение значения с селекта
//     noOption если нет опций

//  <SingleSelect
//     dataOption={}
//     multiOption={}
//     loading={}
//     placeholder={}
//     wrapper={}
//     sizeSelect={}
//     getValueSelect={}
//     noOption={}
//   />

// преобразование в нужный объект
// const createDataSelect = (data) =>
//     data.map((item) => ({
//         value: item.innerValue,
//         label: item.exercise,
//     }));

// const formDataSelect = useMemo(() => {
//     return createDataSelect(selectData);
// }, [selectData]);

const options = [
    { value: "chocolate", label: "chocolate" },
    { value: "strawberry", label: "strawberry" },
    { value: "vanilla", label: "vanilla" },
];

export const SingleSelect = memo((props) => {
    let {
        dataOption,
        multiOption,
        loading,
        placeholder,
        wrapper,
        sizeSelect,
        getValueSelect,
        noOption,
        initialState,
    } = props;

    if (!dataOption) dataOption = options;
    if (!sizeSelect) sizeSelect = "300px";

    const [currentValue, setCurentValue] = useState([]);
    //console.log("рендер селекта");
    //console.log(currentValue);

    useEffect(() => {
        setCurentValue(initialState);
    }, [initialState]);



    const getValue = (value, objOption, multiOption) => {
        if(!currentValue) return;
        if (multiOption) {
            return objOption.filter((item) => currentValue.indexOf(item.value) >= 0);
        } else if (value) {
            return objOption.find((item) => item.value === value);
        } else return "";
    };

    const changeValue = (newValue) => {
        //console.log(newValue);
        if (multiOption) {
            getValueSelect(newValue);
            return setCurentValue(newValue.map((item) => item.value));
        }
        if (newValue) {
            getValueSelect(newValue.value);
            return setCurentValue(newValue.value);
        } else {
            getValueSelect("");
            return setCurentValue([]);
        }
    };

    // если у меня есть необходимость изменить валью сверху
    const valueSelect = getValue(currentValue, dataOption, multiOption);

    return (
        <div style={wrapper}>
            <div style={{ width: sizeSelect }}>
                <Select
                    options={dataOption}
                    onChange={changeValue}
                    value={valueSelect}
                    isMulti={multiOption}
                    noOptionsMessage={() => noOption}
                    placeholder={placeholder}
                    isLoading={loading}
                    classNamePrefix={"customSelect"}
                    isClearable
                    //menuIsOpen={false}
                />
            </div>
        </div>
    );
});
