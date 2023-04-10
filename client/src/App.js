import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom'
import DisplaySite from './components/DisplaySite';
import Header from "./components/Header";
import Homepage from './components/Homepage';
import Login from './forms/Login';
import SandSite from './forms/SandSite';

function App() {
  const [ sites, setSites ] = useState([])
  const [ buttonInfo, setButtonInfo ] = useState('Job Sites')
  const [ user, setUser ] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/sites')
    .then(resp => resp.json().then(site => setSites(site)))
  },[])
  function handleSiteInfo(){
    fetch('/api/sites')
    .then(resp => resp.json())
    .then(site => console.log(site))
  }

  function handleFinishedSite(){
    fetch('/api/completed_sites')
    .then(resp => resp.json())
    .then(comp => console.log(comp))
  }

  function createSite(){
    const formData = {
      location: "Texas",
    }
    fetch('/api/sites', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(resp => resp.json())
    .then(site => console.log(site))
  }

  const handleSiteDisplayButton = (site) => {
    setButtonInfo(site.location)
    navigate(`/site/${site.location}/${site.id}`)
  }
  // console.log(siteId)
  return (
    <div>
      <Header sites={sites} handleSiteDisplayButton={handleSiteDisplayButton} buttonInfo={buttonInfo} setButtonInfo={setButtonInfo}/>
      <Routes>
        <Route path='/' element={<Homepage sites={sites} handleSiteDisplayButton={handleSiteDisplayButton}/>}/>
        <Route path={`/site/:location/:id`} element={<DisplaySite sites={sites} setButtonInfo={setButtonInfo}/>}/>
        {!user && (
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        )}
      </Routes>
      <SandSite />
    </div>
  );
}

export default App;
