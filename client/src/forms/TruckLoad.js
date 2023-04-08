import { useState } from "react"


function TruckLoad(){
    const handleTruckLoad = () => {
        const formData = {
            truck: "5440", 
            mine: "Blue",  
            tare_weight: 32399, 
            gross_weight: 99399, 
            ship_to: "texas", 
            po: "702000069", 
            site_id: 2
        }
        fetch(`/api/trucks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then(resp => resp.json())
          .then(truck => console.log(truck))
    }

    return(
        <div className="modal fade" id="truckLoad" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Sand</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form>
                    <div className="mb-3 row">
                        <label htmlFor="inputTruck" className="col-sm-2 col-form-label">Truck #</label>
                        <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputTruck"
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputMine" className="col-sm-2 col-form-label">Mine</label>
                        <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputMine"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputTareWeight" className="col-sm-2 col-form-label">Tare Weight</label>
                        <div className="col-sm-10">
                        <input 
                            type="number"
                            min="0" 
                            className="form-control" 
                            id="inputTareWeight"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputGrossWeight" className="col-sm-2 col-form-label">Gross Weight</label>
                        <div className="col-sm-10">
                        <input 
                            type="number"
                            min="0" 
                            className="form-control" 
                            id="inputGrossWeight"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputShipTo" className="col-sm-2 col-form-label">Ship To</label>
                        <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputShipTo"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPO" className="col-sm-2 col-form-label">PO #</label>
                        <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputPO"/>
                        </div>
                    </div>
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleTruckLoad}>Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )

}

export default TruckLoad;