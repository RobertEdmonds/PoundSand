import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "../components/Header"
import Homepage from "../components/Homepage";
import CompanySite from "../components/CompanySite";

export default function CompanyAuthorized({companyUser, setCompanyUser}){
    const [ companySites, setCompanySites ] = useState([])
    const [ completedBool, setCompletedBool ] = useState(false)
    const [ showSite, setShowSite ] = useState(null)
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
        fetch(`/api/sites/${site.id}`)
        .then(resp => {
            if(resp.ok){
                resp.json().then(singleSite => {
                    setShowSite(singleSite)
                    setButtonInfo(site.location)
                    setTSandUsed(site.total_sand_used)
                    setOnSite(site.total_on_site)
                    setSiteDelivery(site.total_delivered)
                    navigate(`/site/${site.location}/${site.crew}/${site.id}`)
                })
            }
        })
        // setButtonInfo(site.location)
        // setTSandUsed(site.total_sand_used)
        // setOnSite(site.total_on_site)
        // setSiteDelivery(site.total_delivered)
        // navigate(`/site/${site.location}/${site.crew}/${site.id}`)
    }

    return(
        <div>
            <Header 
                user={companyUser}
                setUser={setCompanyUser}
                sites={companySites}
                completedBool={completedBool}
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
                    user={companyUser} 
                    tSandUsed={tSandUsed}
                    onSite={onSite}
                    siteDelivery={siteDelivery}
                    showSite={showSite}
                />}/>
            </Routes>
        </div>
    )
}