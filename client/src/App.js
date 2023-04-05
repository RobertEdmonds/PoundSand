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


  return (
    <div>
      <Header/>
      <TruckLoad />
      <DownHole />
      <button onClick={() => handleSiteInfo()}>Hello</button>
      <button onClick={() => handleFinishedSite()}>Finished</button>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
