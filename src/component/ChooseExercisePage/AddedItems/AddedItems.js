import { FlipItem } from "../../../View/FlipItem/FlipItem";
import { CustomButton } from "../../BaseComponents/CustomComponents";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useMemo } from "react";

export const AddedItems = (props) => {
    const { listItems, deleteSelectedItem, deleteAll, saveExersice } = props;

    const createAdedItems = (data) => {
        if (!data) return null;
        return data.map((item) => {
            return (
                <CSSTransition key={item.id} timeout={600} classNames="baseTransition">
                    <FlipItem
                        name={item.name}
                        baseImg={item.img[0]}
                        descr={item.descr}
                        key={item.id}
                        id={item.id}
                        deleteItem={deleteSelectedItem}
                        workingParts={item.workingParts}
                        hoverBack={true}
                    />
                </CSSTransition>
            );
        });
    };

    const adedItems = useMemo(() => {
        return createAdedItems(listItems, deleteSelectedItem);
    }, [listItems]);
    return (
        <div className={`${"basePositionElement "}`}>
            <TransitionGroup className={`${"baseFlexGapWrap"}`}>{adedItems}</TransitionGroup>
            <div className={`$ ${""} baseFlexGapNoJC`}>
                <CustomButton
                    funk={() => saveExersice()}
                    innerValue={"Add trening"}
                />
                <CustomButton
                    funk={() => deleteAll()}
                    innerValue={"Clear all"}
                />
            </div>
        </div>
    );
};
