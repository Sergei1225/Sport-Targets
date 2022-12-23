import { CustomTitle, CustomButton } from "../../BaseComponents/CustomComponents";

import { useNavigate } from "react-router-dom";

export const TargetItem = (props) => {
    let { name, baseImg, descr, id, deleteItem, workingParts } = props;
    const navigate = useNavigate();

    if (!name) name = "TITLE";
    if (!baseImg) baseImg = "https://skyfitness.ua/wp-content/uploads/2021/06/sf1.jpg";
    if (!descr)
        descr =
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error magni dolor amet maiores harum, voluptatum culpa libero modi, distinctio necessitatibus ipsum nobis porro maxime exercitationem officia animi. Ipsum, quibusdam perspiciatis.";

    if (!workingParts || workingParts.length === 0) workingParts = ["legs", "arms"];
    if (workingParts.length > 3) workingParts = workingParts.slice(0, 3);
    const workingLine = workingParts.join(" | ");

    return (
        <div className={`${""} basePositionBlock `}>
            <div className={`${""} baseFlex`}>
                <div className={`${""} basePositionElementNoMT`}>
                    <CustomTitle
                        title={name}
                        subtile={
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem dicta quam itaque autem impedit at voluptates magni assumenda molestiae beatae hic, veritatis illo ratione animi quisquam nulla eveniet, quibusdam error."
                        }
                    />
                    <div className={`${""} basePositionElement`}>{workingLine}</div>
                </div>

                <div style={{ maxWidth: "300px" }} className={`${""} `}>
                    <img
                        className={`${""} baseImgCover`}
                        //src="https://cdn.forbes.ru/forbes-static/1082x722/new/2021/11/0Y5A6637-61a4d69e3e467-61a4d69e738d8.webp"
                        src={baseImg}
                        alt="imgTarget"
                    />
                </div>
            </div>
            <div className={`${""} baseFlex`}>
                {name === "TITLE" ? (
                    <CustomButton
                        funk={() => navigate("/chooseExerciseTargetWeigth")}
                        innerValue={"Choose exercise"}
                    />
                ) : (
                    <CustomButton
                        funk={() => deleteItem && deleteItem(id)}
                        innerValue={"Delete item"}
                    />
                )}
            </div>
        </div>
    );
};
