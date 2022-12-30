const targetWeigth = {
    selectedExercise: {
        id: "e5pjq4uY9_1Z6w22SE-j24Jfs3Y-3E",
        name: "Pull-ups",
        img: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1sgYBKg_5rAJJcK7VtnsQqcVFjIXan3BiHA&usqp=CAU",
        ],
        descr: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum placeat culpa, at eum maiores inventore mollitia amet ullam rem fuga laboriosam necessitatibus sit? Nesciunt quos alias ipsam quasi dicta hic. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum placeat culpa, at eum maiores inventore mollitia amet ullam rem fuga laboriosam necessitatibus sit? Nesciunt quos alias ipsam quasi dicta hic.",
        workingParts: ["back", "biceps"],
        typeOfExercise: "base",
    },
    weight: {
        start: 50,
        end: 120,
    },
    someTrenings: 20,
    timeToTarget: {
        start: 1670883010844,
        end: 1678659010844,
    },
    nowTime: 1671883010844,
    targetAchievement: [
        {
            nameTren: "",
            data: "",
            result: 0,
            id: "",
        },
    ],
};

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

    // 1 действие для получения дней получение количества дней и перевод из милисекунд в дни
    const remainderStart = (end, start) => {
        if(!end || !start) return 0;
        return (+end - +start) / 86400000;
    };
    // 2 сколько осталось дней осталось
    const remainderNow = (endMilisec) => {
        if(!endMilisec ) return 0;
        const valueNow = Date.now();
        const difference = endMilisec - valueNow;
        return Math.floor(difference / 86400000);
    };
    // 3 сколько дней прошло
    const resultValueAbsolute = (endDay, result) => {
        if(!endDay || !result) return 0;
        return endDay - result;
    }

    // 4 сколько дней прошло в процентах
    const resultValuePercent = (endDay, result) => {
        if(!endDay || !result) return 0;
        return (((endDay - result) / endDay) * 100).toFixed(2);
    }

    // сколько нужно достичь кг
    const weightTargetAbsolute = (targetWeigth, startWeigth, result) => {
        if(!startWeigth || !targetWeigth ) return 0;
        return targetWeigth - startWeigth;
    };
    /// сколько осталось в кг
    const weightRemainder = (targetWeigth, startWeigth, result) => {
        if(!startWeigth ||  !targetWeigth ) return 0;
        return (targetWeigth - startWeigth) - result;
    };
    /// выполнение в %
    const weightValue = (targetWeigth, startWeigth, result) => {
        if (!targetWeigth || !targetWeigth || result === 0) return 0;
        if (targetWeigth === 0) targetWeigth = 1;

        return ((result / (targetWeigth - startWeigth)) * 100).toFixed(2);
    };

    // получение результата с учётом стартового веса
    const getResultWeigth = (result, startWeigth) => {
        if(result.length === 0 || !startWeigth) return 0;
        return result - startWeigth;
    }

    return {
        weightRemainder,
        weightValue,
        remainderStart,
        remainderNow,
        weightTargetAbsolute,
        getResultWeigth,
        resultValueAbsolute,
        resultValuePercent,
        convertDayInMilisec,
        getDateFromMilisec
    };
};
