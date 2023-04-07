function DisplayNav({location, handleWeightChange}){
    return(
        <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand" >{location}</span>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#truckLoad">Add Sand</button>
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#downHole">Sand Used</button>
                    </div>
                    <div className="btn-group d-grid d-md-flex justify-content-md-end" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">Pounds</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onChange={()=> handleWeightChange()}/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio2">Tons</label>
                    </div>
                </div>
            </nav>
    )
}
export default DisplayNav;