export const simpleSortArrObj = ({ data = null, value = "date", typeValue = "number", param = "down" }) => {
    if (!data || data.length === 0 || !Array.isArray(data)) return data;

    let newArr = [];

    if (typeValue === "string") {
        console.log("сотрировка string");
        if (param === "up") {
            newArr = data.slice().sort((a, b) => a[value].localeCompare(b[value]));
        } else if (param === "down") {
            newArr = data.slice().sort((a, b) => b[value].localeCompare(a[value]));
        }
    } else if (typeValue === "number") {
        console.log("сотрировка number");
        if (param === "up") {
            newArr = data.slice().sort((a, b) => (a[value] > b[value] ? 1 : -1));
        } else if (param === "down") {
            newArr = data.slice().sort((a, b) => (b[value] > a[value] ? 1 : -1));
        }
    }

    return newArr;
};
