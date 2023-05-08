import { useState } from "react"

export default function TrashSand(){
    const [ pounds, setPounds ] = useState(null)
    const [ success, setSuccess ] = useState(false)
    const [ error, setError ] = useState([])

    const handleTrashSand = () => {
        
    }

    return(
        <div className="modal fade" id="downHole" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Sand Used</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
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
                        <label htmlFor="inputPounds" className="col-sm-2 col-form-label"> Tons </label>
                        <div className="input-group">
                        <input type="number"
                            pattern="[0-9]*" 
                            className="form-control" 
                            id="inputPounds"
                            value={pounds}
                            onChange={(e) => setPounds(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleTrashSand()}>Save Sand Used</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}