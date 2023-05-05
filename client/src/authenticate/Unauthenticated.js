import { Routes, Route, Navigate } from "react-router-dom";
import CompanySignUp from "../forms/CompanySignUp";
import Login from "../forms/Login";

function Unauthenticated({setUser, setCompanyUser}){
    return(
        <Routes>
            <Route exact path='/' element={<Login setUser={setUser} setCompanyUser={setCompanyUser}/>}/>
            <Route path="/company_sign_up" element={<CompanySignUp setCompanyUser={setCompanyUser}/>}/>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Unauthenticated;