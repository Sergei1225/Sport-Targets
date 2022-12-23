const targetWeigth = {
    weigth: {
        start: 50,
        end: 100,
    },
    someTrenings: 20,
    timeToTarget: {
        start: 50,
        end: 100,
    },
    targetAchievement: {
        nameTren: "",
        date: "",
        result: 0,
        id: "",
    },
};

export const workDataProgressBar = () => {

    const weightRemainder = (target, result) => {
        const rem = target - result;

        if (target === 0) target = 1;

        if (Math.sign(rem) === -1) {
            return {
                remainder: Math.abs(rem),
                paramAchieved: "overfulfilled",
            };
        } else {
            return { remainder: rem, paramAchieved: "achieved" };
        }
    };
    const weightValue = (target, result) => {
        if (+!target && +!result) return 0;
        if (target === 0) target = 1;

        return ((result / target) * 100).toFixed(2);
    };

    return { weightRemainder, weightValue };
};
