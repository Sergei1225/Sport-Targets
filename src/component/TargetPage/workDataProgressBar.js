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

    const transformationInMilisec = (days) => {
        // 8640000 = 24 * 60 * 60 * 1000 получаю дни
        const valueNow = Date.now();
        const daysMili = +days * 86400000;
        const end = +valueNow + +daysMili;
        return { start: valueNow, end: end };
    };

    const transformationInDay = (milisec) => {
        // 8640000 = 24 * 60 * 60 * 1000 получаю дни
        return Math.floor(+milisec / 86400000);
    };
    const daysRemainderStart = (end, start) => {
        if(!end || !start) return 0;
        return (+end - +start) / 86400000;
    };

    const daysRemainderNow = (milisecEnd) => {
        if(!milisecEnd) return 0;
        const valueNow = Date.now();
        const difference = +milisecEnd - +valueNow;
        return Math.floor(difference / 86400000);
    };

    const getPercentValue = (target, result) => {
        if (+!target && +!result) return 0;
        if (target === 0) target = 1;

        return ((result / target) * 100).toFixed(2);
    };

    const weightRemainder = (target, result) => {
        if(!target || !result) return 0;
        return target - result;

    };
    const weightValue = (target, result) => {
        if (+!target && +!result) return 0;
        if (target === 0) target = 1;

        return ((result / target) * 100).toFixed(2);
    };

    return {
        weightRemainder,
        weightValue,
        transformationInMilisec,
        daysRemainderStart,
        daysRemainderNow,
        transformationInDay,
        getPercentValue
    };
};
