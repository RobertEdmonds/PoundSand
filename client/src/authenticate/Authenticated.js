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
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/sites')
        .then(resp => resp.json().then(site => setSites(site)))
    },[])

    const handleSiteDisplayButton = (site) => {
        setButtonInfo(site.location)
        navigate(`/site/${site.location}/${site.id}`)
      }

    function handleLogout() {
        fetch("/api/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
            navigate("/login");
          }
        });
    }

    return(
        <div>
            <Header sites={sites} handleSiteDisplayButton={handleSiteDisplayButton} buttonInfo={buttonInfo} setButtonInfo={setButtonInfo}/>
            <Routes>
                <Route path='/homepage' element={<Homepage sites={sites} handleSiteDisplayButton={handleSiteDisplayButton}/>}/>
                <Route path={`/site/:location/:id`} element={<DisplaySite sites={sites} setButtonInfo={setButtonInfo}/>}/>
                {!!user && user.log_number === 1 && (
                    <Route path={`/reset_password/:id`} element={<ResetPW setUser={setUser} user={user}/>}/>
                )}
                <Route path='*' element={<Navigate to='/homepage' />} />
            </Routes>
            <SandSite />
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Authenticated;