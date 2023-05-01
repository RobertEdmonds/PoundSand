import { useState } from "react"

function TruckLoad({id, handleAddSand, location}){
    const [ truck, setTruck ] = useState('')
    const [ mine, setMine ] = useState('')
    const [ tare, setTare ] = useState(0)
    const [ gross, setGross ] = useState(0)
    // const [ ship, setShip ] = useState('')
    const [ po, setPo ] = useState('')
    const [ error, setError ] = useState([])
    const [ success, setSuccess ] = useState(false)

    const handleTruckLoad = () => {
        const formData = {
            truck, 
            mine,  
            tare_weight: tare, 
            gross_weight: gross, 
            ship_to: location, 
            po: po, 
            site_id: parseInt(id)
        }
        setError([])
        setSuccess(false)
        fetch(`/api/trucks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then(resp => {
            if(resp.ok){
                resp.json().then(truck => {
                    handleAddSand(truck)
                    setSuccess(true)
                })
                setTruck('')
                setMine('')
                setTare(0)
                setGross(0)
                // setShip('')
                setPo('')
            }else{
                resp.json().then(err => setError(err.errors))
            }
        })
    }

    return(
        <div 
            className="modal fade modal-lg" 
            id="truckLoad" 
            tabIndex="-1" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true"
            >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Sand</h1>
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
                <form>
                    <div className="mb-3">
                        <label htmlFor="inputTruck" className="form-label">Truck #</label>
                        <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputTruck"
                            value={truck}
                            onChange={(e) => setTruck(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputMine" className="form-label">Mine</label>
                        <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputMine"
                            value={mine}
                            onChange={(e) => setMine(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputTareWeight" className="form-label">Tare Weight(pounds)</label>
                        <div className="col-sm-10">
                        <input 
                            type="number"
                            min="0" 
                            className="form-control" 
                            id="inputTareWeight"
                            placeholder="0"
                            value={tare}
                            onChange={(e) => setTare(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputGrossWeight" className="form-label">Gross Weight(pounds)</label>
                        <div className="col-sm-10">
                        <input 
                            type="number"
                            min="0" 
                            className="form-control" 
                            id="inputGrossWeight"
                            placeholder="0"
                            value={gross}
                            onChange={(e) => setGross(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="inputShipTo" className="form-label">Ship To</label>
                        <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputShipTo"
                            value={ship}
                            onChange={(e) => setShip(e.target.value)}
                            />
                        </div>
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="inputPO" className="form-label">PO #</label>
                        <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputPO"
                            value={po}
                            onChange={(e) => setPo(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => handleTruckLoad()}>Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )

}

export default TruckLoad;