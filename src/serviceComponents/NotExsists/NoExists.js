import s from "./NoExists.module.scss";
import ErrorMassage from "../ErrorMassage/ErrorMassage";
import { useHistory } from "react-router-dom";

const NoExists = () => {
    const { goBack } = useHistory();

    return (
        <div>
            <ErrorMassage />
            <button onClick={() => goBack()}>Вернуться</button>
        </div>
    );
};

export default NoExists;
