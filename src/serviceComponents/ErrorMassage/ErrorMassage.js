import { GetSvg } from "../GetSvg/GetSvg";

export const ErrorMassage = ({ textError = "Text error" }) => {
    return (
        <div className="bElement" style={{ animation: "show 1s linear"}}>
            <div className="bFlexColumnCenter">
                <div style={{ width: "250px", height: "250px" }}>
                    <GetSvg nameSvg={"errorIcon"} />
                </div>
                <div className="bElement baseFontTitleSmall bBold" style={{ textAlign: "center" }}>
                    {textError}
                </div>
            </div>
        </div>
    );
};
