import { HeaderTrenings } from "./HeaderTrening/HeaderTrenings";
import { ListTrenings } from "./ListTrenings/ListTrenings";
import { FiltersTren } from "./FiltersTren/FiltersTren";
import { SearchTrenings } from "./SearchTrenings/SearchTrenings";
import { TargetShow } from "../TargetPage/TargetShow/TargetShow";

export const TreningsPage = () => {
    return (
        <section className={""}>
            <HeaderTrenings />
            <TargetShow/>
            <SearchTrenings />
            <FiltersTren />
            <ListTrenings />
        </section>
    );
};
