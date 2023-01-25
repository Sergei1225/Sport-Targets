import s from './ViewListTrening.module.scss';

import { CustomTitleBase } from '../../component/BaseComponents/CustomComponents';
import { ContentLoading } from '../../serviceComponents/ContentLoading/ContentLoading';

export const ViewListTrenings = ({loadingStatus, itemsTrening, errorStatus}) => {
  return (
    <div className={`${s.listTrenings} bBlock `}>
            <div className={`${s.listTrenings__wrapper} bWrapperStyle bElement`}>
                <div className={`${s.listTrenings__title} bElement`}>
                    <CustomTitleBase
                        title={"List trenings"}
                        subtile={
                            "You can find in search, delete trening or trenings, add to favorite and add to edit trenings"
                        }
                        nameSvg={"list"}
                    ></CustomTitleBase>
                </div>
                <ContentLoading
                    loadingStatus={loadingStatus}
                    itemsTrening={itemsTrening}
                    errorStatus={errorStatus}
                    textLoading={"Loading list items..."}
                />
            </div>
        </div>
  )
}
