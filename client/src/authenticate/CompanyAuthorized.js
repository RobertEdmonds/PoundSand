import { useEffect } from "react"
import Header from "../components/Header"

export default function CompanyAuthorized({companyUser, setCompanyUser}){
    console.log(companyUser)
    useEffect(()=> {
        fetch(`/api/company_sites/${companyUser.code}`)
        .then(resp => resp.json())
        .then(sites => console.log(sites))
    },[companyUser])
    return(
        <div>
            <Header 
                user={companyUser}
                setUser={setCompanyUser}
            />
        </div>
    )
}