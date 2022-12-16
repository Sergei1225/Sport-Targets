import { ConstrEditorTrening } from "./ConstrEditorTrening/ConstrEditorTrening";
// import { BaseHeader } from "../BaseHeader/BaseHeader";
import {  ListEditorTrening } from "./ListEditorTrening/ListEditorTrening";

import { useLocation } from "react-router-dom";

export const EditorTreningPage = () => {

  const location = useLocation();

  let urlList;
  let urlContrItem;

  if(location.pathname === '/') {
    urlList = "treningEditor";
    urlContrItem = "exersiceForTuning";
  } 

  return (
    <>
      {/* {/* <BaseHeader/> */}
      <ConstrEditorTrening path={urlContrItem}/> 
      <ListEditorTrening path={urlList}/>
    </>
  )
}
