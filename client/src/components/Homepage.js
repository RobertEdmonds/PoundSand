function Homepage({sites, handleSiteDisplayButton}){
    
    return(
        <div className="container text-center">
            <div className="row">
            {sites.sort((a,b) => a.id < b.id ? 1 : -1).map(site => {
                const siteDate = site.start_date.split("-")
                return(
                    <div className="col" key={site.id} style={{fontWeight: "bold", color: "white"}}>
                        <div className={site.completed ? "card text-bg-info mb-3" : "card"} style={{width: "18rem", backgroundColor: "rgb(21, 75, 126)"}}>
                            <div className="card-body">
                                <h5 className="card-title h2">{site.location}</h5>
                                <h5 className="card-title h3">{site.crew}</h5>
                                <p className="card-text">Start Date: {siteDate[1]}/{siteDate[2]}/{siteDate[0]}</p>
                            </div>
                            <ul className="list-group list-group-flush" >
                                <li className="list-group-item" style={{color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Total Sand On-Site</li>
                                <li className="list-group-item" style={{color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{(site.total_on_site).toLocaleString("en-US")}</li>
                                <li className="list-group-item" style={{color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Total Sand Used</li>
                                <li className="list-group-item" style={{color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{(site.total_sand_used).toLocaleString("en-US")}</li>
                                <li className="list-group-item" style={{color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Total Sand Delivered</li>
                                <li className="list-group-item" style={{color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{(site.total_delivered).toLocaleString("en-US")}</li>
                                <li className="list-group-item" style={{color: "white", backgroundColor: "rgb(21, 75, 126)"}}>Trash Sand</li>
                                <li className="list-group-item" style={{color: "white", backgroundColor: "rgb(21, 75, 126)"}}>{(site.trash_sand).toLocaleString("en-US")}</li>
                            </ul>
                            <div className="card-body">
                                <button className="btn btn-primary" onClick={() => handleSiteDisplayButton(site)} style={{fontWeight: "bold"}}>Go {site.location}</button>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Homepage;