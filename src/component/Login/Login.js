import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../service/GlobalContext';

export const Login = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const {changeData} = useGlobalContext();

    ///console.log(location.state.from.pathname);


  return (
    <div>
        Login
        <div>
            {location.state.from.pathname}
        </div>
        <button onClick={() => {
            changeData([]);
            navigate(-1)
        }}>
            out
        </button>

    </div>
  )
}
