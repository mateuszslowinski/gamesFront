import { Outlet } from "react-router-dom";
import {getToken} from "../hooks/getToken";
import {NotAuthorized} from "../pages/NotAuthorized/NotAuthorized";

export const ProtectedRoutes = ()=>{
    const isToken = getToken();
    return isToken ? <Outlet/> : <NotAuthorized/>
}