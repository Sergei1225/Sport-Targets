import { ViewItemListTrenings } from "../../../View/ViewItemListTrenings/ViewItemListTrenings";

import { useNavigate } from "react-router-dom";

export const ItemListTrenings = (props) => {
    const {
        name,
        id,
        date,
        listExersises,
        favorite,
        changeProp,
        forDelete,
        deleteItem,
        status,
        changeStatus,
        addToDelete,
    } = props;

    const navigate = useNavigate();
    const lineExercise = listExersises.map((item) => item.name).join(", ");

    const functionsItems = (action) => {
        switch (action) {
            case "delete":
                deleteItem(id);
                break;
            case "deleteList":
                addToDelete(id, forDelete);
                break;
            case "statusValue":
                changeStatus(id, status);
                break;
            case "editor":
                //navigate("/session-timed-out");
                console.log("editor link");
                break;
            case "favotiteValue":
                changeProp(id, favorite);
                break;
            default:
                console.log("Error function");
        }
    };

    return (
        <ViewItemListTrenings
            id={id}
            date={date}
            status={status}
            name={name}
            lineExercise={lineExercise}
            functionsItems={functionsItems}
            favorite={favorite}
            forDelete={forDelete}
        />
    );
};
