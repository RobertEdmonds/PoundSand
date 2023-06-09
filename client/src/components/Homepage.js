import { useState } from "react";
import EditSite from "../forms/EditSite";

function Homepage({sites, handleSiteDisplayButton, companyList, user, handleUpdatedSite}){
    const [ location, setLocation ] = useState('')
    const [ crew, setCrew ] = useState('')
    const [ po, setPo ] = useState('')
    const [ companyId, setCompanyId ] = useState('')
    const [ id, setId ] = useState('')

    const handleEditSite = (site) => {
        console.log(site)
        setLocation(site.location)
        setCrew(site.crew)
        setPo(site.po)
        setCompanyId(site.company_id)
        setId(site.id)
    }

    return(
        <div className="container text-center">
            <div className="row">
            {sites.sort((a,b) => a.id < b.id ? 1 : -1).map(site => {
                const siteDate = site.start_date.split("-")
                return(
                    <div className="col" key={site.id} style={{fontWeight: "bold", color: "white"}}>
                        <div className="card" style={site.completed ? {width: "18rem", color: "black", backgroundColor: "tan"}: {width: "18rem", color: "white", backgroundColor: "rgb(21, 75, 126)"}}>
                            <div className="card-body">
                                <h5 className="card-title h2">{site.location}</h5>
                                <h5 className="card-title h3">{site.crew}</h5>
                                {!!user.email ? (<></>): (
                                <p className="card-text">{companyList.filter(company => company.id === site.company_id)[0].name}</p>
                                )}
                                <p className="card-text">Start Date: {siteDate[1]}/{siteDate[2]}/{siteDate[0]}</p>
                            </div>
                            <ul className="list-group list-group-flush" >
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Total Sand On-Site</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{(site.total_on_site).toLocaleString("en-US")}</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Total Sand Used</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{(site.total_sand_used).toLocaleString("en-US")}</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Total Sand Delivered</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{(site.total_delivered).toLocaleString("en-US")}</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Trash Sand</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{(site.trash_sand).toLocaleString("en-US")}</li>
                            </ul>
                            <div className="card-body">
                                <button className="btn btn-primary" onClick={() => handleSiteDisplayButton(site)} style={{fontWeight: "bold"}}>Go {site.location}</button>
                                <br/>
                                {user.boss && (
                                  <button 
                                    type="button" 
                                    className="btn btn-outline-primary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#editSiteModal"
                                    onClick={() => handleEditSite(site)} 
                                    style={{fontWeight: "bold"}}>
                                  Edit Site
                                  </button>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
            <EditSite 
            location={location} 
            crew={crew}
            po={po}
            companyId={companyId}
            setLocation={setLocation}
            setCrew={setCrew}
            setPo={setPo}
            setCompanyId={setCompanyId}
            id={id}
            companyList={companyList}
            handleUpdatedSite={handleUpdatedSite}
            />
            </div>
        </div>
    )
}

export default Homepage;