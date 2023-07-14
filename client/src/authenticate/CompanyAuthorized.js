import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "../components/Header"
import Homepage from "../components/Homepage";
import CompanySite from "../components/CompanySite";

export default function CompanyAuthorized({companyUser, setCompanyUser}){
    const [ companySites, setCompanySites ] = useState([])
    const [ fullList, setFullList ] = useState([])
    const [ completedBool, setCompletedBool ] = useState(false)
    const [ showSite, setShowSite ] = useState(null)
    const [ tSandUsed, setTSandUsed ] = useState(0)
    const [ onSite, setOnSite ] = useState(0)
    const [ siteDelivery, setSiteDelivery ] = useState(0)
    const [ buttonInfo, setButtonInfo ] = useState('Job Sites')
    const navigate = useNavigate()

    useEffect(()=> {
        console.log("here")
        fetch(`/api/company_sites/${companyUser.company.id}`)
        console.log('after fetch')
        .then(resp => resp.json())
        .then(company => {
            setCompanySites(company[0].sites)
            setFullList(company[0].sites)
        })
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
    }

    const handleSiteSearch = (value) => {
        const searchSite = fullList.filter(site => {
            return(site.location.toUpperCase().includes(value.toUpperCase()) || site.crew.toUpperCase().includes(value.toUpperCase()))
        })
        setCompanySites(searchSite)
    }
    
    console.log("full", fullList)
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
                handleSiteSearch={handleSiteSearch}
            />
            <Routes>
                <Route path='/' element={<Homepage 
                    sites={companySites}
                    handleSiteDisplayButton={handleSiteDisplayButton}
                    user={companyUser}
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