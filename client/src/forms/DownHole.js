import { useState } from "react"

function DownHole({id}){
    const [ pounds, setPounds ] = useState(0)
    const [ stage, setStage ] = useState('')
    const [ moisture, setMoisture ] = useState(0.0)
    const [ error, setError ] = useState([])

    const handleDownHole = () => {
        const formData = {
            pounds,
            stage,
            moisture,
            site_id: parseInt(id)
        }
        fetch(`/api/sand_useds`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then(resp => {
            if(resp.ok){
                resp.json().then(truck => console.log(truck))
            }else{
                resp.json().then((err) => setError(err.errors))
            }
          })
    }
    return(
        <div className="modal fade" id="downHole" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Sand Used</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id="liveAlertPlaceholder">
                    <ul>
                        {error.map((err) => {
                        return(
                                <li key={err}>{err}</li>
                            )
                        })}
                    </ul>
                </div>
                <form onSubmit={handleDownHole}>
                    <div className="mb-3 row">
                        <label htmlFor="inputPounds" className="col-sm-2 col-form-label"> Pounds </label>
                        <div className="col-sm-10">
                        <input type="number"
                            pattern="[0-9]*" 
                            className="form-control" 
                            id="inputPounds"
                            value={pounds}
                            onChange={(e) => setPounds(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputStage" className="col-sm-2 col-form-label">Stage</label>
                        <div className="col-sm-10">
                        <input type="text" 
                            className="form-control" 
                            id="inputStage"
                            value={stage}
                            onChange={e => setStage(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputMoisture" className="col-sm-2 col-form-label">Moisture</label>
                        <div className="col-sm-10">
                        <input type="number"
                            step="0.01"
                            min='0'
                            max='5' 
                            className="form-control" 
                            id="inputMoisture"
                            value={moisture}
                            onChange={e => setMoisture(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Save Sand Used</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default DownHole;