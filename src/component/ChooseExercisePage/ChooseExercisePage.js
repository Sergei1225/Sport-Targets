import { SelectExercise } from "./SelectExercise/SelectExercise";
import {ListExercise} from './ListExercise/ListExercise';


import { dataChoose } from "./dataForChoose.js";

const itemadd = [{
    id: "hgHGJudsj7^5^8dshhdsjds67hHGT",
    name: "first exersice",
    img: ["https://i.ytimg.com/vi/za4aqmV_j0M/maxresdefault.jpg"],
    descr: "description of a standard workout",
    workingParts: ['legs', 'arms']
}]

export const ChooseExercisePage = () => {

    
    return (
        <div>
            <h1>ChooseExercisePage</h1>
            <SelectExercise 
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
