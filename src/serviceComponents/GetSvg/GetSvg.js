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
import { ReactComponent as Arrow } from "../../img/svg/arrow.svg"; 

export const GetSvg = ({nameSvg, styleSvg}) => {

    // console.log(styleSvg)

    switch(nameSvg){
        case "days":
            return <Days className={`daysSvg ${styleSvg}`} />
        case "backBtn":
            return <Back className={`backBtn ${styleSvg}`} />
        case "gantel":
            return <GantelGood className={`gantelSvg ${styleSvg}`} />
        case "list":
            return <List className={`listSvg ${styleSvg}`} />
        case "bottle":
            return <Bottle className={`bottle ${styleSvg}`} />
        case "run":
            return <Run className={`run ${styleSvg}`} />
        case "timer":
            return <Timer className={`timer ${styleSvg}`} />
        case "gantelSquare":
            return <GantelSquare className={`gantelSquare ${styleSvg}`} />
        case "locker":
            return <Dumbbell className={`locker ${styleSvg}`}/>
        case "dumbbell":
            return <Locker className={`dumbbell ${styleSvg}`}/>
        case "arrow":
            return <Arrow className={`arrow ${styleSvg}`} />
        case "trenings":
            return <Trenings className={`treningsSvg ${styleSvg}`} />
        default :
            return <GantelGood className={`gantelSvg ${styleSvg}`} />;
    }
}
