function DisplayTruck({truckArray, truckTime}){
    const truckDateArray = truckArray.filter(truck => truck.date === truckTime)

    return(
        <div className="modal fade modal-xl" id="staticTruck" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">{truckTime}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Truck Load</th>
                        <th scope="col">Mine</th>
                        <th scope="col">PO #</th>
                        <th scope="col">Total Per Day</th>
                    </tr>
                </thead>
                <tbody>
                {truckDateArray.map(truck => {
                    const truckDate = truck.date.split("-")
                        return(
                            <tr key={truck.id}>
                                <th scope="row">{truckDate[1]}/{truckDate[2]}/{truckDate[0]}</th>
                                <td>{truck.total}</td>
                                <td>{truck.mine}</td>
                                <td>{truck.po}</td>
                                <td>{truck.total_amount_per_day}</td>
                            </tr>
                        )
                    })
                }        
                </tbody>
            </table>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayTruck;