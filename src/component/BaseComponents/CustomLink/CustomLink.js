import s from './CustomLink.module.scss';
import { Link, useMatch } from "react-router-dom";

export const CustomLink = ({ children, to, baseStyle, ...props }) => {
    const match = useMatch(to);
    
    if(!baseStyle) baseStyle = s.customLink;

    const styleLink = match ? s.customLink__activeLink : baseStyle;

    return <Link className={styleLink} to={to}>{children}</Link>;
};
