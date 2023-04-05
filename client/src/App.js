import { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom'
import DisplaySite from './components/DisplaySite';
import Header from "./components/Header";
import Homepage from './components/Homepage';
import DownHole from "./forms/DownHole";
import TruckLoad from "./forms/TruckLoad";


function App() {
  const [ sites, setSites ] = useState([])
  const [ siteId, setSiteId] = useState(0)
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
  console.log(siteId)
  return (
    <div>
      <Header sites={sites} setSiteId={setSiteId}/>
      <TruckLoad />
      <DownHole />
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path={`/site/:location/:id`} element={<DisplaySite siteId={siteId}/>}/>
      </Routes>
      <div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
        <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio1" autoComplete="off"/>
        <label className="btn btn-outline-danger" htmlFor="vbtn-radio1">Radio 1</label>
        <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio2" autoComplete="off"/>
        <label className="btn btn-outline-danger" htmlFor="vbtn-radio2">Radio 2</label>
        <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio3" autoComplete="off"/>
        <label className="btn btn-outline-danger" htmlFor="vbtn-radio3">Radio 3</label>
      </div>
      <button onClick={() => handleSiteInfo()}>Hello</button>
      <button onClick={() => handleFinishedSite()}>Finished</button>
      <button onClick={() => createSite()}>Create <br/> Site</button>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
