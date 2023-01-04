import './classesSvg.scss';

import { ReactComponent as Trenings } from "../../img/svg/trenings.svg"; 
import { ReactComponent as GantelGood } from "../../img/svg/goodGantel.svg"; 
import { ReactComponent as Days } from "../../img/svg/days.svg"; 
import { ReactComponent as Back } from "../../img/svg/back.svg"; 
import { ReactComponent as List } from "../../img/svg/list.svg"; 
import { ReactComponent as Bottle } from "../../img/svg/bottle.svg"; 
import { ReactComponent as Run } from "../../img/svg/run.svg"; 
import { ReactComponent as Timer } from "../../img/svg/timer.svg"; 
import { ReactComponent as GantelSquare } from "../../img/svg/gantelSquare.svg"; 
import { ReactComponent as Locker } from "../../img/svg/locker.svg"; 
import { ReactComponent as Dumbbell } from "../../img/svg/dumbbell.svg"; 

export const GetSvg = ({nameSvg}) => {

    switch(nameSvg){
        case "days":
            return <Days className="daysSvg" width={'120px'} height={"120px"}/>
        case "backBtn":
            return <Back className="backBtn" width={'100%'} height={"100%"}/>
        case "gantel":
            return <GantelGood className="gantelSvg" width={'120px'} height={"120px"}/>
        case "list":
            return <List className="listSvg" width={'100%'} height={"100%"}/>
        case "bootle":
            return <Bottle className="bottle" width={'100%'} height={"100%"}/>
        case "run":
            return <Run className="run" width={'100%'} height={"100%"}/>
        case "timer":
            return <Timer className="timer" width={'100%'} height={"100%"}/>
        case "gantelSquare":
            return <GantelSquare className="gantelSquare" width={'100%'} height={"100%"}/>
        case "locker":
            return <Dumbbell className="locker" width={'100%'} height={"100%"}/>
        case "dumbbell":
            return <Locker className="dumbbell" width={'100%'} height={"100%"}/>
        case "trenings":
            return <Trenings className="treningsSvg" width={'120px'} height={"120px"}/>
        default :
            return <GantelGood className="gantelSvg" width={'120px'} height={"120px"}/>;
    }
}
