import {useState} from 'react';
import { useNavigate } from "react-router-dom";

function Header({sites, setSiteId}){
    const [ buttonInfo, setButtonInfo ] = useState('Job Site')
    const navigate = useNavigate()

    const handleHeaderButton = (site) => {
        setButtonInfo(site.location)
        setSiteId(site)
        navigate(`/site/${site.location}/${site.id}`)
    }
    return(
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <h1 className="navbar-brand">Pound Sand</h1>
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
                                <li onClick={() => handleHeaderButton(site)} key={site.id}>{site.location}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;