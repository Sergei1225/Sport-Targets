import s from './ViewSearchTrenings.module.scss';

import { CustomTitleBase } from '../../component/BaseComponents/CustomComponents';

export const ViewSearchTrenings = ({changeSearch, searchValue, checksItemsBase}) => {
  return (
    <div className={`${s.searchTrenings} bBlock`}>
            <div className={`${s.searchTrenings__wrapper} bElement bWrapperStyle`}>
                <div className={`${s.searchTrenings__title} bElement`}>
                    <CustomTitleBase
                        title={"Search"}
                        subtile={
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo dignissimos ab nostrum neque."
                        }
                        nameSvg={"bottle"}
                    />
                </div>
                <div className={`${s.searchTrenings__wrapper} bElement bFlex bFlexWrap`}>
                    <div className={`${s.searchTrenings__search}`}>
                        <input
                            className={`${""} bInput`}
                            onChange={(e) => changeSearch(e.target.value)}
                            value={searchValue}
                            type="text"
                            placeholder="Enter data"
                        />
                    </div>
                    <div className={`${s.searchTrenings__check} bFlex bFlexCenter`}>{checksItemsBase}</div>
                </div>
            </div>
        </div>
  )
}
