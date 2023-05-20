function DisplayNav({
    location, 
    crew, 
    setDisplayInfo, 
    handleDateChange, 
    completedBool, 
    user,
    correction,
    setCorrection}){

    console.log(parseFloat(correction))
    return(
        <nav className="navbar bg-body-tertiary" style={{padding: "0"}}>
                <div className="container-fluid" style={{backgroundColor: "rgb(45, 45, 45)", paddingBottom: "2rem"}}>
                    <span className="navbar-brand" style={{color: "white", fontWeight: "bold"}}>Location: {location} <br/> Crew: {crew}</span>
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
                        <div className="col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label" style={{fontWeight: "bold", color: "white"}}>Correction</label>
                        </div>
                        <div className="col-auto">
                            <input type="number"
                            pattern="[0-9]*" 
                            min='-15'
                            max='15' 
                            id="inputPassword6" 
                            className="form-control" 
                            style={{width: "5rem"}}
                            value={correction}
                            onChange={e => setCorrection(e.target.value)}
                            />
                        </div>    
                    </div>
                    )}
                    {/* <div className="btn-group d-grid d-md-flex justify-content-md-end" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnWeight" id="btnPounds" autoComplete="off" defaultChecked/>
                        <label className="btn btn-outline-primary" htmlFor="btnPounds" onClick={()=> handleWeightChange(false)}>Pounds</label>

                        <input type="radio" className="btn-check" name="btnWeight" id="btnTons" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnTons" onClick={()=> handleWeightChange(true)}>Tons</label>
                    </div> */}
                </div>
            </nav>
    )
}
export default DisplayNav;