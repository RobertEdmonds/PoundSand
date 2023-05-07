import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "../components/Header"
import Homepage from "../components/Homepage";
import CompanySite from "../components/CompanySite";

export default function CompanyAuthorized({companyUser, setCompanyUser}){
    const [ companySites, setCompanySites ] = useState([])
    const [ completedBool, setCompletedBool ] = useState(false)
    const [ tSandUsed, setTSandUsed ] = useState(0)
    const [ onSite, setOnSite ] = useState(0)
    const [ siteDelivery, setSiteDelivery ] = useState(0)
    const [ buttonInfo, setButtonInfo ] = useState('Job Sites')
    const navigate = useNavigate()

    useEffect(()=> {
        fetch(`/api/company_sites/${companyUser.code}`)
        .then(resp => resp.json())
        .then(company => setCompanySites(company[0].sites))
    },[companyUser])

    const handleSiteDisplayButton = (site) => {
        fetch(`/api/`)
        setButtonInfo(site.location)
        setTSandUsed(site.total_sand_used)
        setOnSite(site.total_on_site)
        setSiteDelivery(site.total_delivered)
        navigate(`/site/${site.location}/${site.crew}/${site.id}`)
    }

    console.log(completedBool)
    return(
        <div>
            <Header 
                user={companyUser}
                setUser={setCompanyUser}
                sites={companySites}
                buttonInfo={buttonInfo} 
                setButtonInfo={setButtonInfo}
                setCompletedBool={setCompletedBool}
                handleSiteDisplayButton={handleSiteDisplayButton}
            />
            <Routes>
                <Route path='/' element={<Homepage 
                    sites={companySites}
                    handleSiteDisplayButton={handleSiteDisplayButton}
                />}/>
                <Route path={`/site/:location/:crew/:id`} element={<CompanySite 
                    tSandUsed={tSandUsed}
                    onSite={onSite}
                    siteDelivery={siteDelivery}
                />}/>
            </Routes>
        </div>
    )
}