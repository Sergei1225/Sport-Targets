import { ConstrEditorTrening } from "./ConstrEditorTrening/ConstrEditorTrening";
// import { BaseHeader } from "../BaseHeader/BaseHeader";
import { ListEditorTrening } from "./ListEditorTrening/ListEditorTrening";

import { useParams } from "react-router-dom";

export const EditorTreningPage = () => {
    const { param } = useParams();

    //const paramInUsePramse = "sdns112d673823nm8m3j3j2832gfGGHha";
    //const paramInUsePramse = "dds1212sd4373823nm8m3j3j2832gfGGHha";
    const paramInUsePramse = param;
    //const paramInUsePramse = "";

    let urlTreening;
    let urlList;
    let urlContrItem;
    let linkChoose;
    

    if (paramInUsePramse) {
        urlTreening = "treningEditor";
        urlList = "listMyExersises";
        urlContrItem = "exersiceForTuning";
        linkChoose="/chooseEditor"
    } else {
        urlTreening = "";
        urlList = "listExersises";
        urlContrItem = "selectedExercises";
        linkChoose = "/chooseExercise"
    }

    return (
        <>
            {/* {/* <BaseHeader/> */}
            <ConstrEditorTrening 
                pathConstr={urlContrItem} 
                pathList={urlList} 
                pathLinkChoose={linkChoose}
            />
            <ListEditorTrening
                pathList={urlList}
                pathTrening={urlTreening}
                pathConstr={urlContrItem} 
                currentItemId={paramInUsePramse}
            />
        </>
    );
};
