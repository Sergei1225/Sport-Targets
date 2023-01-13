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
import { ReactComponent as Bucket } from "../../img/svg/bucket.svg"; 
import { ReactComponent as Warning } from "../../img/svg/warning.svg"; 
import { ReactComponent as DeleteCross } from "../../img/svg/deleteCross.svg"; 
import { ReactComponent as EditorIcon } from "../../img/svg/editor.svg"; 
import { ReactComponent as FavoriteIcon } from "../../img/svg/favorite.svg"; 
import { ReactComponent as WeightCircle } from "../../img/svg/weightCircle.svg"; 
import { ReactComponent as PencilIcon } from "../../img/svg/pencil.svg"; 
import { ReactComponent as BagIcon } from "../../img/svg/bag.svg"; 
import { ReactComponent as CancelIcon } from "../../img/svg/cancelIcon.svg"; 

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
        case "bucket":
            return <Bucket className={`bucket ${styleSvg}`} />
        case "trenings":
            return <Trenings className={`treningsSvg ${styleSvg}`} />
        case "warning":
            return <Warning className={`warning ${styleSvg}`} />
        case "deleteCross":
            return <DeleteCross className={`deleteCross ${styleSvg}`} />
        case "editorIcon":
            return <EditorIcon className={`editorIcon ${styleSvg}`} />
        case "favoriteIcon":
            return <FavoriteIcon className={`favoriteIcon ${styleSvg}`} />
        case "weightCircle":
            return <WeightCircle className={`weightCircle ${styleSvg}`} />
        case "pencilIcon":
            return <PencilIcon className={`pencilIcon ${styleSvg}`} />
        case "bagIcon":
            return <BagIcon className={`bagIcon ${styleSvg}`} />
        case "cancelIcon":
            return <CancelIcon className={`cancelIcon ${styleSvg}`} />
        default :
            return <GantelGood className={`gantelSvg ${styleSvg}`} />;
    }
}
