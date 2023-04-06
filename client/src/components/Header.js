function Header({sites, handleSiteDisplayButton, buttonInfo}){

    return(
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Pound Sand</span>
                <div className="btn-group">
                    <button className="btn btn-secondary btn-lg" type="button">
                        {buttonInfo}
                    </button>
                    <button type="button" className="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        {sites.map(site => {
                            return(
                                <li onClick={() => handleSiteDisplayButton(site)} key={site.id}>{site.location}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;