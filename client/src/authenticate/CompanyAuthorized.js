import { useEffect, useState } from "react"
import { Routes, Route } from 'react-router-dom';
import Header from "../components/Header"
import Homepage from "../components/Homepage";

export default function CompanyAuthorized({companyUser, setCompanyUser}){
    const [ companySites, setCompanySites ] = useState([])
    const [ completedBool, setCompletedBool ] = useState(false)

    useEffect(()=> {
        fetch(`/api/company_sites/${companyUser.code}`)
        .then(resp => resp.json())
        .then(company => setCompanySites(company[0].sites))
    },[companyUser])

    console.log(completedBool)
    return(
        <div>
            <Header 
                user={companyUser}
                setUser={setCompanyUser}
                sites={companySites}
                setCompletedBool={setCompletedBool}
            />
            <Routes>
            <Route path='/' element={<Homepage sites={companySites} />}/>
            </Routes>
        </div>
    )
}