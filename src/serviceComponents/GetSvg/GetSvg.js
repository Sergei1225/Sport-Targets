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
import { ReactComponent as DeleteList } from "../../img/svg/deleteList.svg"; 
import { ReactComponent as PastIcon } from "../../img/svg/pastIcon.svg"; 
import { ReactComponent as CheckMark } from "../../img/svg/checkMark.svg"; 
import { ReactComponent as StarIcon } from "../../img/svg/starIcon.svg"; 
import { ReactComponent as ErrorIcon } from "../../img/svg/errorIcon.svg"; 

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
            return <List className={`baseSvg ${styleSvg}`} />
        case "bottle":
            return <Bottle className={`baseSvg ${styleSvg}`} />
        case "run":
            return <Run className={`baseSvg ${styleSvg}`} />
        case "timer":
            return <Timer className={`baseSvg ${styleSvg}`} />
        case "gantelSquare":
            return <GantelSquare className={`baseSvg ${styleSvg}`} />
        case "locker":
            return <Dumbbell className={`baseSvg ${styleSvg}`}/>
        case "dumbbell":
            return <Locker className={`baseSvg ${styleSvg}`}/>
        case "arrow":
            return <Arrow className={`baseSvg ${styleSvg}`} />
        case "bucket":
            return <Bucket className={`baseSvg ${styleSvg}`} />
        case "trenings":
            return <Trenings className={`treningsSvg ${styleSvg}`} />
        case "warning":
            return <Warning className={`warning ${styleSvg}`} />
        case "deleteCross":
            return <DeleteCross className={`baseSvg ${styleSvg}`} />
        case "editorIcon":
            return <EditorIcon className={`baseSvg ${styleSvg}`} />
        case "favoriteIcon":
            return <FavoriteIcon className={`baseSvg ${styleSvg}`} />
        case "weightCircle":
            return <WeightCircle className={`baseSvg ${styleSvg}`} />
        case "pencilIcon":
            return <PencilIcon className={`baseSvg ${styleSvg}`} />
        case "bagIcon":
            return <BagIcon className={`baseSvg ${styleSvg}`} />
        case "cancelIcon":
            return <CancelIcon className={`baseSvg ${styleSvg}`} />
        case "deleteList":
            return <DeleteList className={`baseSvg ${styleSvg}`} />
        case "pastIcon":
            return <PastIcon className={`baseSvg ${styleSvg}`} />
        case "checkMark":
            return <CheckMark className={`baseSvg ${styleSvg}`} />
        case "starIcon":
            return <StarIcon className={` starIcon ${styleSvg}`} />
        case "errorIcon":
            return <ErrorIcon className={` baseSvg ${styleSvg}`} />
        default :
            return <GantelGood className={`gantelSvg ${styleSvg}`} />;
    }
}
