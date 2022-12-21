import { SelectExercise } from "./SelectExercise/SelectExercise";
import {ListExercise} from './ListExercise/ListExercise';


import { dataChoose } from "./dataForChoose.js";

import { useLocation } from "react-router-dom";

const itemadd = [{
    id: "hgHGJudsj7^5^8dshhdsjds67hHGT",
    name: "first exersice",
    img: ["https://i.ytimg.com/vi/za4aqmV_j0M/maxresdefault.jpg"],
    descr: "description of a standard workout",
    workingParts: ['legs', 'arms']
}]

export const ChooseExercisePage = () => {

    const location = useLocation();
    let paramSaveExersice;

    if(location.pathname === "/chooseEditor"){
        paramSaveExersice = "editor";
    } else if (location.pathname === "/chooseExercise"){
        paramSaveExersice = "creator";
    }
    console.log(paramSaveExersice);

    
    return (
        <div>
            <h1>ChooseExercisePage</h1>
            <SelectExercise 
                paramSave={paramSaveExersice}
                dataTren={dataChoose}
                addedItem={itemadd}
            />
            <ListExercise
                dataList={dataChoose}
            />
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
