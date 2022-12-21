import { CustomTitle, CustomButton } from "../../BaseComponents/CustomComponents";

import { useNavigate } from "react-router-dom";

export const TargetItem = () => {
    const navigate = useNavigate();

    return (
        <div className={`${""} basePositionBlock `}>
            <div className={`${""} baseFlex`}>
                <div className={`${""} basePositionElementNoMT`}>
                    <CustomTitle
                        title={"reaching a certain weight"}
                        subtile={
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem dicta quam itaque autem impedit at voluptates magni assumenda molestiae beatae hic, veritatis illo ratione animi quisquam nulla eveniet, quibusdam error."
                        }
                    />
                </div>

                <div style={{maxWidth: '300px'}} className={`${""} `}>
                    <img
                        className={`${""} baseImgCover`}
                        //src="https://cdn.forbes.ru/forbes-static/1082x722/new/2021/11/0Y5A6637-61a4d69e3e467-61a4d69e738d8.webp"
                        src='https://skyfitness.ua/wp-content/uploads/2021/06/sf1.jpg'
                        alt="imgTarget"
                    />
                </div>
            </div>
            <div className={`${""} baseFlex`}>
                <CustomButton
                    funk={() => navigate("/chooseExercise")}
                    innerValue={"Choose exercise"}
                />
            </div>
        </div>
    );
};
