import { ModalWindow } from "../../../serviceComponents/ModalWindow/ModalWindow";

import { deleteSomeTrening, changeStatusModalOnly } from "../ListTrenings/sliceListTrenings";

import { useDispatch, useSelector } from "react-redux";

export const ModalTrenings = () => {

    const dispatch = useDispatch();

    const { nameFunc, control, subtitle } = useSelector((state) => state.listTrenings.modalAction);

    console.log("modal rendring");

    const createValuesInner = (name, subtitle) => {
        const valuesInner = [
            {
                name: "deleteSomeTrenings",
                title: "Delete some trenings",
                subtitle: subtitle ? `${subtitle} will be delete. Are you sure ?` : "Not trenings for delete.",
                loading: { title: "", subtitle: "Deleting trenings" },
                endLoading: { title: "Deleted trenings", subtitle: `${subtitle} deleted` },
            },
        ];

        return valuesInner.filter((item) => item.name === name)[0];
    };

    const functionAction = (param) => {
        switch (param) {
            case "deleteSomeTrenings":
                dispatch(deleteSomeTrening());
                break;
            case "clear":
                dispatch(changeStatusModalOnly(""));
                break;
            case "notName":
                console.error("Error function not find");
                break;
            default:
        }
    };

    const valuesItem = nameFunc ? createValuesInner(nameFunc, subtitle) : null;

    return (
        <ModalWindow
            nameFunction={valuesItem?.name}
            control={control}
            title={valuesItem?.title}
            subtitle={valuesItem?.subtitle}
            functionAction={functionAction}
            loading={valuesItem?.loading}
            endLoading={valuesItem?.endLoading}
        />
    );
};
