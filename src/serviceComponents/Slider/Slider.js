import s from "./Slider.module.scss";

import { useState, Children, useEffect, cloneElement } from "react";

export const SliderChildren = ({ style, styleItem }) => {
    return <div style={style} className={` ${styleItem} ${s.slider__item_green}`}></div>;
};

export const Slider = ({ children, width, height }) => {
    const [offset, setOffest] = useState(0);
    const [slides, setSlides] = useState([]);
    const countArray = Children.toArray(children).length;

    useEffect(() => {
        setSlides(
            Children.map(children, (child) => {
                return cloneElement(child, {
                    styleItem: s.slider__item,
                });
            })
        );
    }, []);

    const changeOffset = (param, items) => {
        if (param === "+") {
            offset === (items - 1) * 100 ? setOffest(0) : setOffest((offset) => offset + 100);
        } else {
            offset === 0
                ? setOffest((offset) => offset + (items - 1) * 100)
                : setOffest((offset) => offset - 100);
        }
    };

    return (
        <>
            <div
                className={s.slider__wrapper}
                style={{
                    width: `${width}`,
                    height: `${height}`,
                }}
            >
                <div
                    style={{
                        transform: `translate(-${offset}%)`,
                    }}
                    className={s.slider__wrapperLine}
                >
                    {slides}
                </div>
            </div>

            <div className={s.slider__btns}>
                {`${offset / 100 + 1} / ${countArray}`}
                <button onClick={() => changeOffset("+", countArray)}>Вперед</button>
                <button onClick={() => changeOffset("-", countArray)}>Назад</button>
            </div>
        </>
    );
};
