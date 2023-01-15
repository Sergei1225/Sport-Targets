import s from './CustomLink.module.scss';
import { Link, useMatch } from "react-router-dom";

export const CustomLink = ({ children, to, baseStyle }) => {
    
    const match = useMatch(to);
    
    if(!baseStyle) baseStyle = s.customLink;

    const styleLink = match ? s.customLink__activeLink : "";

    return <Link className={`${baseStyle} ${styleLink}`} to={to}>{children}</Link>;
};
