import { useState } from "react";

export default function EditSite({
    location, 
    crew,
    po,
    companyId,
    estTotal,
    setEstTotal,
    setLocation,
    setCrew,
    setPo,
    setCompanyId,
    id,
    companyList,
    handleUpdatedSite
}){

    const [ success, setSuccess ] = useState(false)
    const [ error, setError ] = useState([])

    const updateSite = () => {
        const formData = {
            location,
            crew, 
            po,
            est_total: parseInt(estTotal),
            company_id: parseInt(companyId)
        }
        setSuccess(false)
        setError([])
        fetch(`/api/update_site/${parseInt(id)}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then(resp => {
            if(resp.ok){
                resp.json().then(site => {
                    setSuccess(true)
                    handleUpdatedSite(site)
                })
            }else{
                resp.json().then((err) => setError(err.errors))
            }
          })
    }
    console.log(estTotal)
    return(
        <>
            <div className="modal fade" id="editSiteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Site</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {success ? ( 
                            <div className="alert alert-success" role="alert">Success</div>
                        ):(
                        error.map((err) => {
                            return(
                                <div key={err} className="alert alert-danger" role="alert">{err}</div>
                                )
                        }))}
                        <form className="row">
                            <div className="mb-3 row">
                                <label htmlFor="inputStage" className="col-sm-2 col-form-label">Location</label>
                                <div className="input-group">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputStage"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputStage" className="col-sm-2 col-form-label">Crew Name</label>
                                <div className="input-group">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputStage"
                                    value={crew}
                                    onChange={e => setCrew(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputStage" className="col-sm-2 col-form-label">PO#</label>
                                <div className="input-group">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputStage"
                                    value={po}
                                    onChange={e => setPo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputEstTotal" className="col-sm-2 col-form-label"> Estimated Total </label>
                                <div className="input-group">
                                <input type="number"
                                    pattern="[0-9]*" 
                                    className="form-control" 
                                    id="inputEstTotal"
                                    value={estTotal}
                                    onChange={(e) => setEstTotal(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3" style={{paddingTop: "2rem"}}>
                                <select 
                                className="form-select form-select-lg mb-3" 
                                aria-label=".form-select-lg example"
                                placeholder="Choose A Company"
                                value={companyId}
                                onChange={(e) => setCompanyId(e.target.value)}>
                                    <option value="No Go">Choose A Company</option>
                                    {companyList.map(company => {
                                        return(
                                            <option key={company.id} value={company.id}>{company.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => updateSite()}>Save New Site</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}