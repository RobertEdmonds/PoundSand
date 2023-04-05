import Header from "./components/Header";
import DownHole from "./forms/DownHole";
import TruckLoad from "./forms/TruckLoad";


function App() {
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
      location: "Utah",
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


  return (
    <div>
      <Header/>
      <TruckLoad />
      <DownHole />
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
