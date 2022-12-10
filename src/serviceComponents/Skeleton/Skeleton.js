import s from "./Skeleton.module.scss";
import { memo } from "react";

const Skeleton = memo(({ itemsLine, itemsContent, view }) => {
    //console.log('рендер скелета');
    const createBaseTrening = (line, content) => {
        let lineItems = [];
        let items = [];

        if (line) {
            for (let n = 0; n < content; n++) {
                lineItems[n] = (
                    <div
                        key={Math.trunc(Math.random() * 1000000)}
                        className={s.skeleton__line}
                    ></div>
                );
            }
        }

        if (content) {
            for (let l = 0; l < content; l++) {
                items[l] = (
                    <div className={s.skeleton__wrapper} key={Math.trunc(Math.random() * 1000000)}>
                        <div className={s.skeleton__img}>
                            <div className={s.skeleton__circle}></div>
                        </div>
                        <div className={s.skeleton__content}>{lineItems}</div>
                    </div>
                );
            }
        }

        return <>{items}</>;
    };
    const createEndTarget = (line, content) => {
        let lineItems = [];
        let items = [];

        if (line) {
            for (let n = 0; n < content; n++) {
                lineItems[n] = (
                    <div
                        key={Math.trunc(Math.random() * 1000000)}
                        className={s.skeleton__progress_line}
                    ></div>
                );
            }
        }

        if (content) {
            for (let l = 0; l < content; l++) {
                items[l] = (
                    <div className={s.skeleton__progress_item} key={Math.trunc(Math.random() * 1000000)}>
                        <div className={s.skeleton__img}>
                            <div className={s.skeleton__progress_circle}></div>
                        </div>
                        <div className={s.skeleton__progress_content}>{lineItems}</div>
                    </div>
                );
            }
        }

        return <div className={s.skeleton__progress}>{items}</div>;
    };

    switch (view) {
        case "baseTrening":
            return createBaseTrening(itemsLine, itemsContent);
        case "endTarget":
            return createEndTarget(itemsLine, itemsContent);
        default:
    }
});



export default Skeleton;
