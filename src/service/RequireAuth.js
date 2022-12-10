import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";

export const RequireAuth = ({ children }) => {
    const location = useLocation();
    const data = useGlobalContext();
    ///console.log(data.dataContext)

    if (!data.dataContext) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};
