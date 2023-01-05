import { HeaderTrenings } from "./HeaderTrening/HeaderTrenings";
import { ListTrenings } from "./ListTrenings/ListTrenings";
import { FiltersTren } from "./FiltersTren/FiltersTren";
import { SearchTrenings } from "./SearchTrenings/SearchTrenings";
import { TargetShow } from "../TargetPage/TargetShow/TargetShow";
import { BaseHeader } from "../BaseHeader/BaseHeader";
import { srcImages } from "../../img/srcImages";

import { CBtnStyled } from "../BaseComponents/CustomButton/CustomButton";

export const TreningsPage = () => {
    return (
        <section className={""}>
            {/* <CBtnStyled
                innerValue={"Click button"}
                active={true}
            />
            <button className="bBtn">Click button</button> */}
            {/* <BaseHeader text={"MY TRENINGS"} srcImg={srcImages.redGym} /> */}
            {/* <TargetShow/> */}
            <SearchTrenings />
            {/* <HeaderTrenings />
            <FiltersTren />
            <ListTrenings /> */}

        </section>
    );
};
