export const simpleSortArrObj = (paramSort = { data: null, value: null, typeValue: null, param: null }) => {
    if (paramSort.data.length === 0 || !paramSort.data || !Array.isArray(paramSort.data)) return;
    let { data, value, typeValue, param } = paramSort;
    let newArr = [];

    if (paramSort.typeValue === "string") {
        console.log("string");
        if (paramSort.param === "up") {
            newArr = data.slice().sort((a, b) => a[value].localeCompare(b[value]));
        } else if (param === "down") {
            newArr = data.slice().sort((a, b) => b[value].localeCompare(a[value]));
        }
    } else if (typeValue === "number") {
        console.log("number");
        if (param === "up") {
            newArr = data.slice().sort((a, b) => (a[value] > b[value] ? 1 : -1));
        } else if (param === "down") {
            newArr = data.slice().sort((a, b) => (b[value] > a[value] ? 1 : -1));
        }
    }

    return newArr;
};

export const simpleSortArrObjA = ({ data = null, value = null, typeValue = "number", param = "up" }) => {
    if (!data || data.length === 0 || !Array.isArray(data)) return;

    let newArr = [];

    if (typeValue === "string") {
        console.log("string");
        if (param === "up") {
            newArr = data.slice().sort((a, b) => a[value].localeCompare(b[value]));
        } else if (param === "down") {
            newArr = data.slice().sort((a, b) => b[value].localeCompare(a[value]));
        }
    } else if (typeValue === "number") {
        console.log("number");
        if (param === "up") {
            newArr = data.slice().sort((a, b) => (a[value] > b[value] ? 1 : -1));
        } else if (param === "down") {
            newArr = data.slice().sort((a, b) => (b[value] > a[value] ? 1 : -1));
        }
    }

    return newArr;
};