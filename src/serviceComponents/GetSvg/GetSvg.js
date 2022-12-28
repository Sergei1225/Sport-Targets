import './classesSvg.scss';

import { ReactComponent as GantelGood } from "../../img/svg/goodGantel.svg"; 
import { ReactComponent as Days } from "../../img/svg/days.svg"; 

export const GetSvg = ({nameSvg}) => {

    switch(nameSvg){
        case "days":
            return <Days className="daysSvg" width={'120px'} height={"120px"}/>
        case "gantel":
            return <GantelGood className="gantelSvg" width={'120px'} height={"120px"}/>
        default :
            return null;
    }
}
