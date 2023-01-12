import { SelectExercise } from "./SelectExercise/SelectExercise";
import { ListExercise } from "./ListExercise/ListExercise";
import { BaseHeader } from "../BaseHeader/BaseHeader";
import { dataChoose } from "./dataForChoose.js";

import { useLocation } from "react-router-dom";

const itemadd = [
    {
        id: "hgHGJudsj7^5^8dshhdsjds67hHGT",
        name: "first exersice",
        img: ["https://i.ytimg.com/vi/za4aqmV_j0M/maxresdefault.jpg"],
        descr: "description of a standard workout",
        workingParts: ["legs", "arms"],
    },
];

export const ChooseExercisePage = () => {
    const location = useLocation();
    let paramSaveExersice;

    switch (location.pathname) {
        case "/chooseEditor":
            paramSaveExersice = "editor";
            break;
        case "/chooseExercise":
            paramSaveExersice = "creator";
            break;
        case "/chooseExerciseTargetWeigth":
            paramSaveExersice = "targetWeigth";
            break;
        default:
            paramSaveExersice = "";
    }

    console.log(paramSaveExersice);

    return (
        <div>
            <BaseHeader text={"Choose exercise"} srcImg={"https://www.fizkulturaisport.ru/images/stories/sporttovary/1904-kak-oborudovat-trenazhernyj-zal.jpg"} />
            <SelectExercise paramSave={paramSaveExersice} dataTren={dataChoose} addedItem={itemadd} />
            <ListExercise dataList={dataChoose} paramSave={paramSaveExersice} />
        </div>
    );
};

const obj = {
    id: "hgHGJudsj7^5^8dshhdsjds67hHGT",
    name: "first exersice",
    img: ["https://i.ytimg.com/vi/za4aqmV_j0M/maxresdefault.jpg"],
    descr: "description of a standard workout",
    workingParts: ["legs", "arms"],
};


