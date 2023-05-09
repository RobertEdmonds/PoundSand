function Homepage({sites, handleSiteDisplayButton}){
    
    return(
        <div className="container text-center">
            <div className="row">
            {sites.sort((a,b) => a.id < b.id ? 1 : -1).map(site => {
                const siteDate = site.start_date.split("-")
                return(
                    <div className="col" key={site.id}>
                        <div className={site.completed ? "card text-bg-info mb-3" : "card"} style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">{site.location}</h5>
                                <h5 className="card-title">{site.crew}</h5>
                                <p className="card-text">Start Date: {siteDate[1]}/{siteDate[2]}/{siteDate[0]}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Total Sand On-Site</li>
                                <li className="list-group-item">{(site.total_on_site).toLocaleString("en-US")}</li>
                                <li className="list-group-item">Total Sand Used</li>
                                <li className="list-group-item">{(site.total_sand_used).toLocaleString("en-US")}</li>
                                <li className="list-group-item">Total Sand Delivered</li>
                                <li className="list-group-item">{(site.total_delivered).toLocaleString("en-US")}</li>
                                <li className="list-group-item">Trash Sand</li>
                                <li className="list-group-item">{site.trash_sand}</li>
                            </ul>
                            <div className="card-body">
                                <button className="btn btn-primary" onClick={() => handleSiteDisplayButton(site)}>Go {site.location}</button>
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