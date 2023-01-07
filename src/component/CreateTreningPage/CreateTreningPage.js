import { ConstrTrening } from "./ConstrTrening/ConstrTrening";
import { BaseHeader } from "../BaseHeader/BaseHeader";
import {  ListTrening } from "./ListTrening/ListTrening";

export const CreateTreningPage = () => {


  return (
    <>
      <BaseHeader text={"MY TRENINGS"} srcImg={""} />
      <BaseHeader/>
      <ConstrTrening/>
      <ListTrening/>
    </>
  )
}
