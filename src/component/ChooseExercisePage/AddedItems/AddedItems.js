import { FlipItem } from "../../../View/FlipItem/FlipItem";
import { CustomButton } from "../../BaseComponents/CustomComponents";
import { TargetItem } from "../../TargetPage/TargetItem/TargetItem";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useMemo } from "react";

export const AddedItems = (props) => {
    const { listItems, deleteSelectedItem, deleteAll, saveExersice, paramItem } = props;

    const createAdedItems = (data) => {
        if (!data) return null;
        //paramSelect === "creator" || paramSelect === "editor"
        if(paramItem === 'creator' || paramItem === "editor"){
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
        } else if(paramItem === "targetWeigth") {
            return data.map((item) => {
                return (
                    <CSSTransition key={item.id} timeout={600} classNames="baseTransition">
                        <TargetItem
                            name={item.name}
                            baseImg={item.img[0]}
                            descr={item.descr}
                            key={item.id}
                            id={item.id}
                            deleteItem={deleteSelectedItem}
                            workingParts={item.workingParts}
                        />
                    </CSSTransition>
                );
            });
        }   
        
    };

    const adedItems = createAdedItems(listItems, deleteSelectedItem);
    return (
        <div className={`${"basePositionElement "}`}>
            <TransitionGroup className={`${"baseFlexGapWrap"}`}>{adedItems}</TransitionGroup>
            <div className={`$ ${""} baseFlexGapNoJC`}>
                <CustomButton
                    funk={() => saveExersice()}
                    innerValue={"Save trening"}
                />
                <CustomButton
                    funk={() => deleteAll()}
                    innerValue={"Clear all"}
                />
            </div>
        </div>
    );
};
