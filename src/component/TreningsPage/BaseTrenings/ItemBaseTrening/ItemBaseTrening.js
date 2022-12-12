import s from "./ItemBaseTrening.module.scss";
import BaseButton from "../../baseComponent/BaseButton";

const ItemBaseTrening = (props) => {
    const { treningsName, id, date, basic, favorite, changeProp, deleteItem } = props;

    const createListExercise = (dataExercise) => {
        return `${dataExercise
            .map((item) => item.exercise.toLowerCase())
            .filter((_, i) => i < 3)
            .join(", ")}...`;
    };

    const lineExercise = createListExercise(basic);
    const activeFavorite = favorite ? s.itemTrenings__item_active : s.itemTrenings__item;

    return (
        <div key={id} className={activeFavorite}>
            <div className={s.itemTrenings__item_content}>
                <div className={s.itemTrenings__item_name}>{treningsName}</div>
                <div className={s.itemTrenings__item_date}>Дата : {date}</div>
            </div>
            <div className={s.itemTrenings__item_exercise}>
                {lineExercise}
                <BaseButton innerText={"Подробнее"} styleItem={s.itemTrenings__item_btn} />
            </div>
            <div className={s.itemTrenings__item_func}>
                <div
                    className={s.itemTrenings__item_favorites}
                    data-current="favorite"
                    onClick={(e) => changeProp(id, e.target.getAttribute("data-current"))}
                >
                    📕
                </div>
                <div className={s.itemTrenings__item_forDelete}>
                    <span></span>
                </div>
                <div className={s.itemTrenings__item_cross} onClick={() => deleteItem(id)}></div>
            </div>
        </div>
    );
};

export default ItemBaseTrening;
