import { ListTrenings } from "./ListTrenings/ListTrenings";
import { FiltersTren } from "./FiltersTren/FiltersTren";
import { SearchTrenings } from "./SearchTrenings/SearchTrenings";
import { TargetShow } from "../TargetPage/TargetShow/TargetShow";
import { BaseHeader } from "../BaseHeader/BaseHeader";
import { srcImages } from "../../img/srcImages";
import { ModalTrenings } from "./ModalTrenings/ModalTrenings";

export const TreningsPage = () => {
    return (
        <section className={""}>
            <BaseHeader text={"MY TRENINGS"} srcImg={srcImages.redGym} />
            <TargetShow/>
            <SearchTrenings />
            <FiltersTren />
            <ListTrenings />
            <ModalTrenings/>
        </section>
    );
};
