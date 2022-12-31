export const workDataProgressBar = () => {
    // перевод из дней в милисекунды 
    const convertDayInMilisec = (someDays) => {
        const valueNow = Date.now();
        const days = +someDays * 86400000;
        if(!someDays) return valueNow;
        return valueNow + days;
    }
    // из милисекунд в дату строку
    const getDateFromMilisec = (milisec) => {
        const objDate = new Date(+milisec);
        return `${objDate.getMonth() + 1}.${objDate.getDate()}.${objDate.getFullYear()}`;
    }

    return {
        convertDayInMilisec,
        getDateFromMilisec
    };
};
