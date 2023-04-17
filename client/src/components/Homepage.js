function Homepage({sites, handleSiteDisplayButton}){
    return(
        <div className="container text-center">
            <div className="row">
            {sites.map(site => {
                const siteDate = site.start_date.split("-")
                return(
                    <div className="col" key={site.id}>
                        <div className="card" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">{site.location}</h5>
                                <p className="card-text">Start Date: {siteDate[1]}/{siteDate[2]}/{siteDate[0]}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Total Sand On-Site</li>
                                <li className="list-group-item">{site.total_on_site}</li>
                                <li className="list-group-item">Total Sand Used</li>
                                <li className="list-group-item">{site.total_sand_used}</li>
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