import { useNavigate } from "react-router-dom";
import AddCompany from "../forms/AddCompany";
import SandSite from "../forms/SandSite";
import Title from '../components/AquaPorp2.png'

function Header({sites, 
    handleSiteDisplayButton, 
    buttonInfo, 
    setButtonInfo,
    setUser,
    handleAddSite,
    setCompletedBool,
    user,
    handleSiteSearch,
    handleAddCompany,
    companyList
}){
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
        setCompletedBool(false)
        const dataForm = {
            work_site: null,
            employee: false
        }
        fetch(`/api/user_work_site/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForm),
          });
        user.work_site = null
        user.employee = null
        // window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({showSite: false}))
        setButtonInfo('Job Sites')
    }

    const handleCompletedBool = () =>{
        navigate('/')
        setCompletedBool(true)
        const dataForm = {
            work_site: null,
            employee: false
        }
        fetch(`/api/user_work_site/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForm),
          });
        user.work_site = null
        user.employee = null
        // window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({showSite: false}))
        setButtonInfo('Completed Sites')
    }
    
    const handleEmployee = () => {
        const dataForm = {
            work_site: null,
            employee: true
        }
        fetch(`/api/user_work_site/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForm),
          });
        user.work_site = null
        user.employee = true
        // window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({showSite: true, employee: true}))
        navigate('/employee')
    }

    const handleCompanyView = () => {
        const dataForm = {
            work_site: null,
            employee: false
        }
        fetch(`/api/user_work_site/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForm),
          });
        user.work_site = null
        user.employee = null
        // window.localStorage.setItem("MY_SAND_SITE", JSON.stringify({showSite: false}))
        navigate('/companies')
        setButtonInfo('Companies')
    }

    function handleLogout() {
        fetch("/api/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
    }
    

    return(
        <nav className="navbar bg-body-tertiary" style={{padding: "0"}}>
            <div className="container-fluid" style={{backgroundColor: "rgb(45, 45, 45)", paddingBottom: "1rem"}}>
                <span className="navbar-brand mb-0 h1" ><img src={Title} alt="AquaProp" style={{width: "15rem"}} /></span>
                {user.boss && (
                    <>
                    <SandSite handleAddSite={handleAddSite} companyList={companyList}/>
                    <AddCompany handleAddCompany={handleAddCompany}/>
                    </>
                )}
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-primary" onClick={handleLogout} style={{fontWeight: "bold"}}>Logout</button>
                    <button className="btn btn-primary btn-lg" type="button">
                        {buttonInfo}
                    </button>
                    <button type="button" className="btn btn-lg btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        {sites.map(site => {
                            return(
                                <li className="dropdown-item" onClick={() => handleSiteDisplayButton(site)} key={site.id}>{site.location}</li>
                            )
                        })}
                        <li className="dropdown-item" onClick={() => handleGoHome()}>{!!user.email ? "All Sites" : "Active Sites"}</li>
                        {!user.email && (
                        <li className="dropdown-item" onClick={() => handleCompletedBool()}>Completed Sites</li>
                        )}
                        {user.boss && (
                            <>
                            <li className="dropdown-item" onClick={() => handleEmployee()}>Employee</li>
                            <li className="dropdown-item" onClick={() => handleCompanyView()}>Companies</li>
                            </>
                        )}
                    </ul>
                    {buttonInfo === "Job Sites" || buttonInfo === "Completed Sites" ? (
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSiteSearch(e.target.value)}/>
                    </form>
                    ) : (<></>)}
                </div>
            </div>
        </nav>
    )
}

export default Header;