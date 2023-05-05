import { Routes, Route, Navigate } from "react-router-dom";
import CompanySignUp from "../forms/CompanySignUp";
import Login from "../forms/Login";

function Unauthenticated({setUser}){
    return(
        <Routes>
            <Route exact path='/' element={<Login setUser={setUser}/>}/>
            <Route path="/company_sign_up" element={<CompanySignUp />}/>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Unauthenticated;