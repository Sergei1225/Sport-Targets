import './Gantel.scss';
import gant from '../../../img/gant.png';


const Gantel = ({type}) => {

    const styleComp = type === 'small' ? 'gantel_small' : 'gantel_big';

    return (
        <div className="gantel">
            <div className={`gantel__inner ${styleComp}`}>
                <img src={gant} alt="gantel" />
            </div>
        </div>
    )
}

export default Gantel;