import { Navigate, Outlet } from "react-router-dom";


export function Protected(){
    let user = JSON.parse(localStorage.getItem("user"));
    return user==null ? <Navigate to={'/login'} /> : <Outlet />
}