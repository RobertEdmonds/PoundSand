import { useState } from "react"

export default function AddCompany({handleAddCompany}){
    const [ name, setName ] = useState('')
    const [ code, setCode ] = useState('')
    const [ success, setSuccess ] = useState(false)
    const [ error, setError ] = useState([])

    function createCompany(){
        const formData = {
            name,
            code, 
        }
        setError([])
        setSuccess(false)
        console.log(formData)
        fetch('/api/companies', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        }).then(resp => {
            if(resp.ok){
                resp.json().then(company => {
                    setSuccess(true)
                    setName('')
                    setCode('')
                    handleAddCompany(company)
                })
            }else{
                resp.json().then((err) => setError(err.errors))
        }})
    }

    return(
        <>
        <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#createCompanyModal">
            Create Company
        </button>
        <div className="modal fade" id="createCompanyModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">New Company</h1>
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
                            <label htmlFor="inputStage" className="col-sm-2 col-form-label">Company Name</label>
                            <div className="input-group">
                            <input type="text" 
                                className="form-control" 
                                id="inputStage"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputStage" className="col-sm-2 col-form-label">Company Code</label>
                            <div className="input-group">
                            <input type="text" 
                                className="form-control" 
                                id="inputStage"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => createCompany()}>Save Company</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}