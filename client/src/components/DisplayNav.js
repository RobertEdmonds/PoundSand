function DisplayNav({location, handleWeightChange, setDisplayInfo, handleDateChange}){
    return(
        <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand" >{location}</span>
                    <div className="d-grid gap-2 col-3 mx-auto">
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#truckLoad">Add Sand</button>
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#downHole">Sand Used</button>
                    </div>
                    <div className="btn-group d-grid d-md-flex justify-content-md-end" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnSand" id="btnSandUsed" autoComplete="off" defaultChecked/>
                        <label className="btn btn-outline-primary" htmlFor="btnSandUsed" onClick={()=> setDisplayInfo(false)}>Sand Used</label>

                        <input type="radio" className="btn-check" name="btnSand" id="btnSandHere" autoComplete="off"/>
                        <label className="btn btn-outline-primary" htmlFor="btnSandHere" onClick={()=> setDisplayInfo(true)}>Sand Here</label>
                    </div>
                    <div className="btn-group d-grid d-md-flex justify-content-md-end" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnDate" id="btnDown" autoComplete="off" defaultChecked/>
                        <label className="btn btn-outline-primary" htmlFor="btnDown" onClick={()=> handleDateChange(false)}>Ascending</label>

                        <input type="radio" className="btn-check" name="btnDate" id="btnUp" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnUp" onClick={()=> handleDateChange(true)}>Descending</label>
                    </div>
                    <div className="btn-group d-grid d-md-flex justify-content-md-end" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnWeight" id="btnPounds" autoComplete="off" defaultChecked/>
                        <label className="btn btn-outline-primary" htmlFor="btnPounds" onClick={()=> handleWeightChange(false)}>Pounds</label>

                        <input type="radio" className="btn-check" name="btnWeight" id="btnTons" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnTons" onClick={()=> handleWeightChange(true)}>Tons</label>
                    </div>
                </div>
            </nav>
    )
}
export default DisplayNav;