import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Homepage from '../components/Homepage';
import DisplaySite from '../components/DisplaySite';
import ResetPW from '../forms/ResetPW';
import User from '../components/User';
import Companies from '../components/Companies';

function Authenticated({user, setUser}){
    const [ sites, setSites ] = useState([])
    const [ allSites, setAllSites ] = useState([])
    const [ buttonInfo, setButtonInfo ] = useState('Job Sites')
    const [ tSandUsed, setTSandUsed ] = useState(0)
    const [ onSite, setOnSite ] = useState(0)
    const [ trashSand, setTrashSand ] = useState(0)
    const [ siteDelivery, setSiteDelivery ] = useState(0)
    const [ correction, setCorrection ] = useState(0)
    const [ siteEstTotal, setSiteEstTotal ] = useState(0)
    const [ completedBool, setCompletedBool ] = useState(false)
    const [ companyList, setCompanyList ] = useState([])
    const [ userWorkSite, setUserWorkSite ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/companies')
        .then(resp => resp.json())
        .then(companies => setCompanyList(companies))
        if(user.work_site > 0){
            fetch(`/api/show_site/${user.work_site}`)
            .then(r => r.json())
            .then(site => {
                setUserWorkSite(site)
                setButtonInfo(site.location)
                setTSandUsed(site.total_sand_used)
                setOnSite(site.total_on_site)
                setSiteDelivery(site.total_delivered)
                setCompletedBool(site.completed)
                setTrashSand(site.trash_sand)
                setCorrection(site.correction)
                setSiteEstTotal(site.est_total)
                navigate(`/site/${site.location}/${site.crew}/${site.id}`)
            }) 
        }else if(user.employee){
            setButtonInfo("Employee")
            navigate('/employee')
        }
        fetch('/api/sites')
        .then(resp => resp.json().then(site => {
            // window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({showSite: false}))
        setAllSites(site)
        setSites(site)}))
    },[navigate, setSites, user ])

    // useEffect(() => {
    //     fetch('/api/companies')
    //     .then(resp => resp.json())
    //     .then(companies => setCompanyList(companies))
    // },[])

    const showCompanyUpdate = (company) => {
        const updatedCompanies = companyList.map(business => {
            if(business.id === company.id){
                return company
            }else{
                return business
            }
        })
        setCompanyList(updatedCompanies)
    }

    const handleAddCompany = (company) => {
        setCompanyList([...companyList, company])
    }

    const showSiteDeletion = (site) => {
        const updatedSites = sites.filter(work => work.id !== site.id)
        setSites(updatedSites)
    }

    async function handleSiteDisplayButton(site){
        setButtonInfo(site.location)
        setTSandUsed(site.total_sand_used)
        setOnSite(site.total_on_site)
        setSiteDelivery(site.total_delivered)
        setTrashSand(site.trash_sand)
        setCorrection(site.correction)
        setSiteEstTotal(site.est_total)
        await fetch(`/api/show_site/${site.id}`)
            .then(r => r.json())
            .then(site => {
                setUserWorkSite(site)
            }) 
        const dataForm = {
            work_site: site.id,
            employee: null
        }
        fetch(`/api/user_work_site/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForm),
          });
        user.work_site = site.id
        navigate(`/site/${site.location}/${site.crew}/${site.id}`)
    }

    const handleAddSite = (newSite) => {
        setSites([...sites, newSite])
    }

    const handleUpdatedSite = (fixedSite) => {
        const updatedSite = sites.map(site => {
            if(site.id === fixedSite.id){
                return fixedSite
            }else{
                return site
            }
        })
        setSites(updatedSite)
    }

    const handleAddSand = (truck) => {
        const updatedSite = userWorkSite
        updatedSite.trucks.push(truck)
        updatedSite.total_on_site += truck.total
        updatedSite.total_delivered += truck.total
        setOnSite(updatedSite.total_on_site)
        setSiteDelivery(updatedSite.total_delivered) 
        setUserWorkSite(updatedSite)
    }

    const showTruckDelete = (oldTruck) => {
        const updatedSite = userWorkSite
        updatedSite.trucks = updatedSite.trucks.filter(truck => truck.id !== oldTruck.id)
        updatedSite.total_on_site -= oldTruck.total
        updatedSite.total_delivered -= oldTruck.total
        setOnSite(updatedSite.total_on_site)
        setSiteDelivery(updatedSite.total_delivered) 
        setUserWorkSite(updatedSite)
    }

    const handleEditSand = (truck, beforeEdit) => {
        const updatedSite = userWorkSite
        if(truck.site_id === beforeEdit.site_id){
            updatedSite.trucks = updatedSite.trucks.map(foundTruck => {
                if(foundTruck.id === truck.id){
                    return truck 
                }else{
                    return foundTruck
                }
            })
            updatedSite.total_on_site -= beforeEdit.total
            updatedSite.total_delivered -= beforeEdit.total
            updatedSite.total_on_site += truck.total
            updatedSite.total_delivered += truck.total
            updatedSite.trucks.filter(used => used.date === truck.date).sort((a, b) => (a.id > b.id ? -1 : 1))[0].total_amount_per_day = truck.total_amount_per_day
            setOnSite(updatedSite.total_on_site)
            setSiteDelivery(updatedSite.total_delivered) 
        }else{
            updatedSite.trucks = updatedSite.trucks.filter(truck => truck.id !== beforeEdit.id)
            updatedSite.trucks.filter(used => used.date === beforeEdit.date).sort((a, b) => (a.id > b.id ? -1 : 1))[0].total_amount_per_day -= beforeEdit.total
            updatedSite.total_on_site -= beforeEdit.total
            updatedSite.total_delivered -= beforeEdit.total
            setOnSite(updatedSite.total_on_site)
            setSiteDelivery(updatedSite.total_delivered)
        }
        setUserWorkSite(updatedSite)
    }

    const showEditUsedSand = (sand, oldSandUsed) => {
        const updatedSite = userWorkSite
        updatedSite.total_on_site += oldSandUsed.pounds
        updatedSite.total_sand_used -= oldSandUsed.pounds
        updatedSite.total_on_site -= sand.pounds
        updatedSite.total_sand_used += sand.pounds 
        const deletePrevious = updatedSite.sand_useds.map(foundSand => {
            if(foundSand.id === sand.id){
                return sand 
            }else{
                return foundSand
            }
        })
        updatedSite.sand_useds = deletePrevious
                // site.sand_useds.push(sand)
        updatedSite.sand_useds.filter(used => used.date === sand.date).sort((a, b) => (a.id > b.id ? -1 : 1))[0].total_amount_per_day = sand.total_amount_per_day
        setOnSite(updatedSite.total_on_site)
        setTSandUsed(updatedSite.total_sand_used)
        setUserWorkSite(updatedSite)
    }

    const handleUseSand = (useSand) => {
        const updatedSite = userWorkSite
        updatedSite.total_sand_used += useSand.pounds
        updatedSite.total_on_site -= useSand.pounds
        updatedSite.sand_useds.push(useSand)
        setOnSite(onSite - useSand.pounds) 
        setTSandUsed(tSandUsed + useSand.pounds)
        setUserWorkSite(updatedSite)
    }

    const showUseSandDelete = (sandDelete) => {
        const updatedSite = userWorkSite
        updatedSite.sand_useds = updatedSite.sand_useds.filter(sand => sand.id !== sandDelete.id)
        setOnSite(onSite + sandDelete.pounds) 
        setTSandUsed(updatedSite.total_sand_used - sandDelete.pounds)
        setUserWorkSite(updatedSite)
    }

    const handleSiteCompletion = (workSite) => {
        const form = {
            completed: !completedBool,
            trash_sand: 0,
          };
          fetch(`/api/sites/${workSite.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }).then(resp => resp.json())
          .then((site) => {
            setCompletedBool(!completedBool)
            setSites(sites)
            // window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({id: site.id, 
            //     location: site.location,
            //     crew: site.crew,
            //     total_sand_used: site.total_sand_used, 
            //     total_on_site: site.total_on_site,
            //     total_delivered: site.total_delivered,
            //     trash_sand: site.trash_sand,
            //     completed: site.completed,  
            //     correction: site.correction,
            //     estTotal: site.est_total,
            //     showSite: true}))
          })
    }

    const handleSiteSearch = (value) => {
        const searchSite = allSites.filter(site => {
            return(site.location.toUpperCase().includes(value.toUpperCase()) || site.crew.toUpperCase().includes(value.toUpperCase()) || companyList.filter(company => company.id === site.company_id)[0].name.toUpperCase().includes(value.toUpperCase()))
        })
        setSites(searchSite)
    }

    const handleCorrection = (id) => {
        setOnSite(siteDelivery - (tSandUsed + (tSandUsed * (parseFloat(correction)/100))))
        const form = {
            correction: parseFloat(correction / 100),
          };
          fetch(`/api/site_correction/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }).then(resp => resp.json())
        // (correction)
    }

    return(
        <div>
            <Header 
            sites={(completedBool ? sites.filter(site => site.completed) : sites.filter(site => site.completed === false))} 
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
                <Route path='/' element={<Homepage sites={(completedBool ? sites.filter(site => site.completed) : sites.filter(site => site.completed === false))} 
                companyList={companyList} 
                handleSiteDisplayButton={handleSiteDisplayButton}
                user={user}
                handleUpdatedSite={handleUpdatedSite}
                showSiteDeletion={showSiteDeletion}
                />}/>
                <Route path={`/site/:location/:crew/:id`} element={<DisplaySite 
                sites={sites} 
                userWorkSite={userWorkSite}
                setUserWorkSite={setUserWorkSite}
                user={user}
                siteEstTotal={siteEstTotal}
                setButtonInfo={setButtonInfo}
                tSandUsed={tSandUsed}
                onSite={onSite}
                setOnSite={setOnSite}
                siteDelivery={siteDelivery}
                trashSand={trashSand}
                setTrashSand={setTrashSand}
                correction={correction}
                setCorrection={setCorrection}
                handleAddSand={handleAddSand}
                handleUseSand={handleUseSand}
                completedBool={completedBool}
                handleSiteCompletion={handleSiteCompletion}
                handleEditSand={handleEditSand}
                showUseSandDelete={showUseSandDelete}
                handleCorrection={handleCorrection}
                showEditUsedSand={showEditUsedSand}
                showTruckDelete={showTruckDelete}
                />}/>
                {user.log_number === 0 && (
                    <Route path={`/reset_password/:id`} element={<ResetPW setUser={setUser} user={user}/>}/>
                )}
                {user.boss && (
                  <>
                    <Route path={'/employee'} element={<User />}/>
                    <Route path={'/companies'} element={<Companies companyList={companyList} user={user}  showCompanyUpdate={showCompanyUpdate}/>}/>
                  </>
                )}
            </Routes>
            {user.log_number === 0 && (
                <Navigate to={`/reset_password/${user.id}`} />
            )}
        </div>
    )
}

export default Authenticated;