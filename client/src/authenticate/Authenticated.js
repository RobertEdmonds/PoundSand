import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Homepage from '../components/Homepage';
import DisplaySite from '../components/DisplaySite';
import SandSite from '../forms/SandSite';
import ResetPW from '../forms/ResetPW';

function Authenticated({user, setUser}){
    const [ sites, setSites ] = useState([])
    const [ buttonInfo, setButtonInfo ] = useState('Job Sites')
    const [ tSandUsed, setTSandUsed ] = useState(0)
    const [ onSite, setOnSite ] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/sites')
        .then(resp => resp.json().then(site => {
            setSites(site)
            const data = window.localStorage.getItem('MY_SAND_SITE')
            if(data === null){
                navigate('/')
            }else{
                const site = JSON.parse(data)
                if(site.showSite){
                    setButtonInfo(site.location)
                    setTSandUsed(site.total_sand_used)
                    setOnSite(site.total_on_site)
                    navigate(`/site/${site.location}/${site.id}`)
                }
            }
        }))
    },[navigate])

    const handleSiteDisplayButton = (site) => {
        setButtonInfo(site.location)
        setTSandUsed(site.total_sand_used)
        setOnSite(site.total_on_site)
        window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({id: site.id, location: site.location, total_sand_used:site.total_sand_used, total_on_site: site.total_sand_used,  showSite: true}))
        navigate(`/site/${site.location}/${site.id}`)
    }

    const handleAddSite = (newSite) => {
        setSites([...sites, newSite])
    }

    const handleAddSand = (truck) => {
        const updatedSite = sites.filter(site => {
            if(site.id === truck.site_id){
                site.total_on_site += truck.total 
                setOnSite(site.total_on_site)
                return site
            }else{
                return site
            }
        })
        setSites(updatedSite)
    }

    const handleUseSand = (useSand) => {
        const updatedSite = sites.filter(site => {
            if(site.id === useSand.site_id){
                site.total_sand_used += useSand.pounds
                site.total_on_site -= useSand.pounds
                setOnSite(onSite - useSand.pounds) 
                setTSandUsed(site.total_sand_used)
                return site
            }else{
                return site
            }
        })
        setSites(updatedSite)
    }

    function handleLogout() {
        fetch("/api/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
    }
    console.log(sites)
    return(
        <div>
            <Header 
            sites={sites} 
            handleSiteDisplayButton={handleSiteDisplayButton} 
            buttonInfo={buttonInfo} 
            setButtonInfo={setButtonInfo} 
            />
            <Routes>
                <Route path='/' element={<Homepage sites={sites} handleSiteDisplayButton={handleSiteDisplayButton}/>}/>
                <Route path={`/site/:location/:id`} element={<DisplaySite 
                sites={sites} 
                setButtonInfo={setButtonInfo}
                tSandUsed={tSandUsed}
                onSite={onSite}
                handleAddSand={handleAddSand}
                handleUseSand={handleUseSand}
                />}/>
                {!!user && user.log_number === 0 && (
                    <Route path={`/reset_password/:id`} element={<ResetPW setUser={setUser} user={user}/>}/>
                )}
            </Routes>
            {!!user && user.log_number === 0 && (
                <Navigate to={`/reset_password/${user.id}`} />
            )}
            <SandSite handleAddSite={handleAddSite}/>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Authenticated;