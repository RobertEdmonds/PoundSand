function DisplayNav({
    location, 
    crew, 
    id,
    setDisplayInfo, 
    handleDateChange, 
    completedBool, 
    user,
    correction,
    setCorrection,
    sites,
    handleCorrection}){

    return(
        <nav className="navbar bg-body-tertiary" style={{padding: "0"}}>
                <div className="container-fluid" style={{backgroundColor: "rgb(45, 45, 45)", paddingBottom: "2rem"}}>
                    {!user.email ? (
                        <span className="navbar-brand" style={{color: "white", fontWeight: "bold"}}>Location: {location} <br/> Crew: {crew} <br/> PO#: {sites.find(site => site.id === parseInt(id)).po}</span>
                    ):(
                        <span className="navbar-brand" style={{color: "white", fontWeight: "bold"}}>Location: {location} <br/> Crew: {crew} <br/> PO#: {sites.po}</span>
                    )}
                    {completedBool || !!user.email ? (<></>) : (
                    <div className="d-grid gap-2 col-3 mx-auto">
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#truckLoad" style={{fontWeight: "bold"}}>Add Sand</button>
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#downHole" style={{fontWeight: "bold"}}>Sand Used</button>
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#trashSand" style={{fontWeight: "bold"}}>Trash Sand</button>
                    </div>
                    )}
                    <div className="btn-group d-grid d-md-flex justify-content-md-end" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnSand" id="btnSandUsed" autoComplete="off" defaultChecked/>
                        <label className="btn btn-outline-primary" htmlFor="btnSandUsed" onClick={()=> setDisplayInfo(false)} style={{fontWeight: "bold"}}>Sand Used</label>

                        <input type="radio" className="btn-check" name="btnSand" id="btnSandHere" autoComplete="off"/>
                        <label className="btn btn-outline-primary" htmlFor="btnSandHere" onClick={()=> setDisplayInfo(true)} style={{fontWeight: "bold"}}>Sand Here</label>
                    </div>
                    <div className="btn-group d-grid d-md-flex justify-content-md-end" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnDate" id="btnDown" autoComplete="off" defaultChecked/>
                        <label className="btn btn-outline-primary" htmlFor="btnDown" onClick={()=> handleDateChange(false)} style={{fontWeight: "bold"}}>Ascending</label>

                        <input type="radio" className="btn-check" name="btnDate" id="btnUp" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnUp" onClick={()=> handleDateChange(true)} style={{fontWeight: "bold"}}>Descending</label>
                    </div>
                    {user.boss && (
                    <div className="row g-3 align-items-center">
                        <div className="col-auto" style={{paddingRight: "0px"}}>
                            <label htmlFor="inputPassword6" className="col-form-label">
                                {completedBool ? (
                                <button type="button" className="btn btn-primary" style={{fontWeight: "bold"}} disabled>
                                    Correction = {correction}%
                                </button>
                                ):(
                                <button type="button" className="btn btn-primary" style={{fontWeight: "bold"}} onClick={() => handleCorrection(id)}>
                                    Correction
                                </button>
                                )}
                            </label>
                        </div>
                        {!completedBool && !user.email  &&(
                        <div className="col-auto" style={{paddingLeft: "0px"}}>
                            <input type="number"
                            pattern="[0-9]*" 
                            step="0.1"
                            min='-15'
                            max='15' 
                            id="inputPassword6" 
                            className="form-control" 
                            style={{width: "5rem"}}
                            value={correction}
                            onChange={e => setCorrection(e.target.value)}
                            />
                        </div>
                        )}    
                    </div>
                    )}
                </div>
            </nav>
    )
}
export default DisplayNav;