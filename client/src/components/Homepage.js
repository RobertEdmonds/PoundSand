import { useState } from "react";
import EditSite from "../forms/EditSite";

function Homepage({sites, handleSiteDisplayButton, companyList, user, handleUpdatedSite, showSiteDeletion}){
    const [ location, setLocation ] = useState('')
    const [ crew, setCrew ] = useState('')
    const [ po, setPo ] = useState('')
    const [ companyId, setCompanyId ] = useState('')
    const [ estTotal, setEstTotal ] = useState('')
    const [ id, setId ] = useState('')

    const handleEditSite = (site) => {
        setLocation(site.location)
        setCrew(site.crew)
        setPo(site.po)
        setCompanyId(site.company_id)
        setId(site.id)
        setEstTotal(site.est_total)
    }

    const handleDeleteSite = (site) => {
        fetch(`/api/sites/${site.id}`, {
            method: "DELETE",
        }).then(() => {
            showSiteDeletion(site)
        })
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
                                {!!user.email ? (<></>) : (
                                    <p className="card-text">{companyList.filter(company => company.id === site.company_id)[0].name}</p>
                                )}
                                <p className="card-text">Est. Total: <br/>{`${(site.est_total).toLocaleString("en-US")}(${(site.est_total / 2000).toLocaleString("en-US")})`}</p>
                                <p className="card-text">Start Date: {siteDate[1]}/{siteDate[2]}/{siteDate[0]}</p>
                            </div>
                            <ul className="list-group list-group-flush" >
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Total Sand On-Site</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{`${(site.total_on_site).toLocaleString("en-US")}(${(site.total_on_site / 2000).toLocaleString("en-US")})`}</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Total Sand Used</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{`${(site.total_sand_used).toLocaleString("en-US")}(${(site.total_sand_used / 2000).toLocaleString("en-US")})`}</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Total Sand Delivered</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{`${(site.total_delivered).toLocaleString("en-US")}(${(site.total_delivered / 2000).toLocaleString("en-US")})`}</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Trash Sand</li>
                                <li className="list-group-item" style={site.completed ? {backgroundColor: "tan"}: {color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{`${(site.trash_sand).toLocaleString("en-US")}(${(site.trash_sand / 2000).toLocaleString("en-US")})`}</li>
                            </ul>
                            <div className="card-body">
                                <button className="btn btn-primary" onClick={() => handleSiteDisplayButton(site)} style={{fontWeight: "bold"}}>Go {site.location}</button>
                                <br/>
                                {user.boss ? (
                                  <button 
                                    type="button" 
                                    className="btn btn-outline-primary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#editSiteModal"
                                    onClick={() => handleEditSite(site)} 
                                    style={{fontWeight: "bold"}}>
                                  Edit Site
                                  </button>
                                ) : (<></>)}
                                {user.boss  && user.username === "RylanJohnson" && (
                                  <button 
                                    type="button" 
                                    className="btn btn-outline-primary" 
                                    onClick={() => handleDeleteSite(site)} 
                                    style={{fontWeight: "bold"}}>
                                  Delete Site
                                  </button>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
            {user.boss ? (
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
            estTotal={estTotal}
            setEstTotal={setEstTotal}
            companyList={companyList}
            handleUpdatedSite={handleUpdatedSite}
            />
            ): (<></>)}
            </div>
        </div>
    )
}

export default Homepage;