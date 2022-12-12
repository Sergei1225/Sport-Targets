import { HeaderTrenings } from "./HeaderTrening/HeaderTrenings";
// import BaseTrenings from "./BaseTrenings/BaseTrenings";
import {FiltersTren} from "./FiltersTren/FiltersTren";
import {SearchTrenings} from "./SearchTrenings/SearchTrenings";

export const TreningsPage = () => {
    return (
        <section className={""}>
            <HeaderTrenings />
            <SearchTrenings />
            <FiltersTren />
            {/* <BaseTrenings /> */}
        </section>
    );
};
