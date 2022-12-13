import { HeaderTrenings } from "./HeaderTrening/HeaderTrenings";
import { ListTrenings } from "./ListTrenings/ListTrenings";
import { FiltersTren } from "./FiltersTren/FiltersTren";
import { SearchTrenings } from "./SearchTrenings/SearchTrenings";

export const TreningsPage = () => {
    return (
        <section className={""}>
            <HeaderTrenings />
            <SearchTrenings />
            <FiltersTren />
            <ListTrenings />
        </section>
    );
};
