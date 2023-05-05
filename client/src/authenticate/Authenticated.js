import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Homepage from '../components/Homepage';
import DisplaySite from '../components/DisplaySite';
import ResetPW from '../forms/ResetPW';
import User from '../components/User';

function Authenticated({user, setUser}){
    const [ sites, setSites ] = useState([])
    const [ allSites, setAllSites ] = useState([])
    const [ completedSites, setCompletedSites ] = useState([])
    const [ buttonInfo, setButtonInfo ] = useState('Job Sites')
    const [ tSandUsed, setTSandUsed ] = useState(0)
    const [ onSite, setOnSite ] = useState(0)
    const [ siteDelivery, setSiteDelivery ] = useState(0)
    const [ completedBool, setCompletedBool ] = useState(false)
    const [ companyList, setCompanyList ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/sites')
        .then(resp => resp.json().then(site => {
            setAllSites(site)
            setSites(site)
            const data = window.localStorage.getItem('MY_SAND_SITE')
            if(data === null){
                navigate('/')
            }else{
                const site = JSON.parse(data)
                if(site.showSite && !site.employee){
                    setButtonInfo(site.location)
                    setTSandUsed(site.total_sand_used)
                    setOnSite(site.total_on_site)
                    setSiteDelivery(site.total_delivered)
                    setCompletedBool(site.completed)
                    navigate(`/site/${site.location}/${site.crew}/${site.id}`)
                }else if(site.showSite && site.employee){
                    setButtonInfo("Employee")
                    navigate('/employee')
                }
            }
        }))
    },[navigate, setSites])

    useEffect(() => {
        fetch('/api/companies')
        .then(resp => resp.json())
        .then(companies => setCompanyList(companies))
    },[])

    useEffect(() => {
        fetch('/api/completed_sites')
        .then(resp => resp.json())
        .then(comp => setCompletedSites(comp))
    },[])

    const handleAddCompany = (company) => {
        setCompanyList([...companyList, company])
    }

    const handleSiteDisplayButton = (site) => {
        setButtonInfo(site.location)
        setTSandUsed(site.total_sand_used)
        setOnSite(site.total_on_site)
        setSiteDelivery(site.total_delivered)
        window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({id: site.id, 
            location: site.location, 
            crew: site.crew,
            total_sand_used:site.total_sand_used, 
            total_on_site: site.total_on_site,
            total_delivered: site.total_delivered,
            completed: site.completed,  
            showSite: true}))
        navigate(`/site/${site.location}/${site.crew}/${site.id}`)
    }

    const handleAddSite = (newSite) => {
        setSites([...sites, newSite])
    }

    const handleAddSand = (truck) => {
        const updatedSite = sites.filter(site => {
            if(site.id === truck.site_id){
                site.total_on_site += truck.total
                site.total_delivered += truck.total 
                site.trucks.push(truck)
                setOnSite(site.total_on_site)
                setSiteDelivery(site.total_delivered)
                window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({id: site.id, 
                    location: site.location,
                    crew: site.crew, 
                    total_sand_used:site.total_sand_used, 
                    total_on_site: site.total_on_site,
                    total_delivered: site.total_delivered,
                    completed: site.completed,  
                    showSite: true}))
                return site
            }else{
                return site
            }
        })
        setSites(updatedSite)
    }

    const handleEditSand = (truck, beforeEdit) => {
        if(truck.site_id === beforeEdit.site_id){
            const updatedSite = sites.filter(site => {
                if(site.id === truck.site_id){
                    site.total_on_site -= beforeEdit.total
                    site.total_delivered -= beforeEdit.total 
                    site.total_on_site += truck.total
                    site.total_delivered += truck.total 
                    const deletePrevious = site.trucks.filter(foundTruck => foundTruck.id !== truck.id)
                    site.trucks = deletePrevious
                    site.trucks.push(truck)
                    setOnSite(site.total_on_site)
                    setSiteDelivery(site.total_delivered)
                    window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({id: site.id, 
                        location: site.location,
                        crew: site.crew, 
                        total_sand_used:site.total_sand_used, 
                        total_on_site: site.total_on_site,
                        total_delivered: site.total_delivered,
                        completed: site.completed,  
                        showSite: true}))
                    return site
                }else{
                    return site
                }
            })
            setSites(updatedSite)
        }else{
            const updatedMultipleSites = sites.filter(site => {
                if(site.id === truck.site_id){
                    site.total_on_site += truck.total
                    site.total_delivered += truck.total 
                    site.trucks.push(truck)
                    return site
                }else if(site.id === beforeEdit.site_id){
                    site.total_on_site -= beforeEdit.total
                    site.total_delivered -= beforeEdit.total
                    setOnSite(site.total_on_site)
                    setSiteDelivery(site.total_delivered)
                    const deleteSite = site.trucks.filter(truck => truck.id !== beforeEdit.id)
                    site.trucks = deleteSite
                    return site
                }else{
                    return site
                }
            })
            setSites(updatedMultipleSites)
        }
    }

    const handleUseSand = (useSand) => {
        const updatedSite = sites.filter(site => {
            if(site.id === useSand.site_id){
                site.total_sand_used += useSand.pounds
                site.total_on_site -= useSand.pounds
                site.sand_useds.push(useSand)
                setOnSite(onSite - useSand.pounds) 
                setTSandUsed(site.total_sand_used)
                window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({id: site.id, 
                    location: site.location,
                    crew: site.crew,
                    total_sand_used:site.total_sand_used, 
                    total_on_site: site.total_on_site,
                    total_delivered: site.total_delivered,
                    completed: site.completed,  
                    showSite: true}))
                return site
            }else{
                return site
            }
        })
        setSites(updatedSite)
    }

    const showUseSandDelete = (sandDelete) => {
        const updatedSite = sites.filter(site => {
            if(site.id === sandDelete.site_id){
                const showDelete = site.sand_useds.filter(sand => sand.id !== sandDelete.id)
                site.sand_useds = showDelete
                setOnSite(onSite + sandDelete.pounds) 
                setTSandUsed(site.total_sand_used - sandDelete.pounds)
                return site
            }else{
                return site
            }
        })
        setSites(updatedSite)
    }

    const handleSiteCompletion = (id) => {
        const form = {
            completed: !completedBool,
          };
          fetch(`/api/sites/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }).then(resp => resp.json())
          .then(site => {
            setCompletedBool(!completedBool)
            if(site.completed){
                setCompletedSites([...completedSites, site])
            }else{
                setSites([...sites, site])
            }
          })
    }
    

    const handleSiteSearch = (value) => {
        const searchSite = allSites.filter(site => {
            return(site.location.toUpperCase().includes(value.toUpperCase()) || site.crew.toUpperCase().includes(value.toUpperCase()))
        })
        setSites(searchSite)
    }

    return(
        <div>
            <Header 
            sites={sites} 
            handleSiteDisplayButton={handleSiteDisplayButton} 
            buttonInfo={buttonInfo} 
            setButtonInfo={setButtonInfo}
            setUser={setUser} 
            handleAddSite={handleAddSite}
            setCompletedBool={setCompletedBool}
            setSites={setSites}
            handleSiteSearch={handleSiteSearch}
            user={user}
            companyList={companyList}
            handleAddCompany={handleAddCompany}
            />
            <Routes>
                <Route path='/' element={<Homepage sites={(completedBool ? completedSites : sites)} handleSiteDisplayButton={handleSiteDisplayButton}/>}/>
                <Route path={`/site/:location/:crew/:id`} element={<DisplaySite 
                sites={(completedBool ? completedSites : sites)} 
                setButtonInfo={setButtonInfo}
                tSandUsed={tSandUsed}
                onSite={onSite}
                siteDelivery={siteDelivery}
                handleAddSand={handleAddSand}
                handleUseSand={handleUseSand}
                completedBool={completedBool}
                handleSiteCompletion={handleSiteCompletion}
                handleEditSand={handleEditSand}
                showUseSandDelete={showUseSandDelete}
                />}/>
                {user.log_number === 0 && (
                    <Route path={`/reset_password/:id`} element={<ResetPW setUser={setUser} user={user}/>}/>
                )}
                {user.boss && (
                <Route path={'/employee'} element={<User />}/>
                )}
            </Routes>
            {user.log_number === 0 && (
                <Navigate to={`/reset_password/${user.id}`} />
            )}
        </div>
    )
}

export default Authenticated;