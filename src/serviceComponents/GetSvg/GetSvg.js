import './classesSvg.scss';

import { ReactComponent as Trenings } from "../../img/svg/trenings.svg"; 
import { ReactComponent as GantelGood } from "../../img/svg/goodGantel.svg"; 
import { ReactComponent as Days } from "../../img/svg/days.svg"; 
import { ReactComponent as Back } from "../../img/svg/back.svg"; 
import { ReactComponent as List } from "../../img/svg/list.svg"; 

export const GetSvg = ({nameSvg}) => {

    switch(nameSvg){
        case "days":
            return <Days className="daysSvg" width={'120px'} height={"120px"}/>
        case "backBtn":
            return <Back className="backBtn" width={'30px'} height={"30px"}/>
        case "gantel":
            return <GantelGood className="gantelSvg" width={'120px'} height={"120px"}/>
        case "list":
            return <List className="listSvg" width={'100%'} height={"100%"}/>
        case "trenings":
            return <Trenings className="treningsSvg" width={'120px'} height={"120px"}/>
        default :
            return <GantelGood className="gantelSvg" width={'120px'} height={"120px"}/>;
    }
}
