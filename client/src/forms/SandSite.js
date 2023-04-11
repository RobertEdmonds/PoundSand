import { useState } from "react";

function SandSite(){
    const [ location, setLocation ] = useState('')
    const [ success, setSuccess ] = useState(false)
    const [ error, setError ] = useState([])

    function createSite(){
        const formData = {
            location,
        }
        setError([])
        setSuccess(false)
        fetch('/api/sites', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        }).then(resp => {
            if(resp.ok){
                resp.json().then(truck => {
                    setSuccess(true)
                    console.log(truck)
                })
            }else{
                resp.json().then((err) => setError(err.errors))
        }})
    }

    return(
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createSiteModal">
                Create New Site
            </button>
            <div className="modal fade" id="createSiteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">New Site</h1>
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
                                <label htmlFor="inputStage" className="col-sm-2 col-form-label">Stage</label>
                                <div className="input-group">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputStage"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => createSite()}>Save Sand Used</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SandSite;