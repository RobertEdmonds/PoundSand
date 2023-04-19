import { useNavigate } from "react-router-dom";
import SandSite from "../forms/SandSite";

function Header({sites, 
    handleSiteDisplayButton, 
    buttonInfo, 
    setButtonInfo,
    setUser,
    handleAddSite,
    setCompletedBool,
    user
}){
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
        setCompletedBool(false)
        window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({showSite: false}))
        setButtonInfo('Job Sites')
    }

    const handleCompletedBool = () =>{
        navigate('/')
        setCompletedBool(true)
        window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({showSite: false}))
        setButtonInfo('Completed Sites')
    }
    
    const handleEmployee = () => {
        window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({showSite: true, employee: true}))
        navigate('/employee')
    }

    function handleLogout() {
        fetch("/api/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
    }

    return(
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Pound Sand</span>
                {user.boss && (
                    <SandSite handleAddSite={handleAddSite}/>
                )}
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
                    <button className="btn btn-secondary btn-lg" type="button">
                        {buttonInfo}
                    </button>
                    <button type="button" className="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        {sites.map(site => {
                            return(
                                <li className="dropdown-item" onClick={() => handleSiteDisplayButton(site)} key={site.id}>{site.location}</li>
                            )
                        })}
                        <li className="dropdown-item" onClick={() => handleGoHome()}>Active Sites</li>
                        <li className="dropdown-item" onClick={() => handleCompletedBool()}>Completed Sites</li>
                        {user.boss && (
                            <li className="dropdown-item" onClick={() => handleEmployee()}>Employee</li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;