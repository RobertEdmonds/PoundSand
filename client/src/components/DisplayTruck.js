function DisplayTruck({truckArray, truckTime, goToEditForm, user, showTruckDelete}){
    const truckDateArray = truckArray.filter(truck => truck.date === truckTime)
    // {Math.ceil((displayMoisture.reduce((a, v) => a + v,0)/displayMoisture.length) * 100)/100}
    
    const mineArray = []
    for(let i = 0; i < truckDateArray.length; i++){
        if(mineArray.filter(truck => truck.mine.trim().toUpperCase() === truckDateArray[i].mine.trim().toUpperCase()).length > 0){
            const fixMine = mineArray.findIndex(truck => truck.mine.trim().toUpperCase() === truckDateArray[i].mine.trim().toUpperCase())
            mineArray[fixMine] = truckDateArray[i]   
        }else{
            mineArray.push(truckDateArray[i])
        }
    }

    const goToDeleteForm = (truck) => {
        fetch(`/api/trucks/${truck.id}`, {
            method: "DELETE",
          }).then(() => showTruckDelete(truck));
    }

    return(
        <div className="modal fade modal-dialog-scrollable modal-xl" id="staticTruck" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <th scope="col">Truck Load <br/> Pounds(Tons)</th>
                        <th scope="col">Mine</th>
                        <th scope="col">PO #</th>
                        <th scope="col">Ticket #</th>
                        <th scope="col">Total Per Day</th>
                    </tr>
                </thead>
                <tbody>
                {truckDateArray.sort((a, b) => a.created_at > b.created_at ? -1 : 1).reverse().map(truck => {
                    const truckDate = truck.date.split("-")
                        return(
                            <tr key={truck.id}>
                                <th scope="row">{truckDate[1]}/{truckDate[2]}/{truckDate[0]} <br/> {truck.created_at.slice(11, 16)} </th>
                                <td>{`${truck.total.toLocaleString("en-US")}(${(truck.total / 2000).toLocaleString('en-US')})`}</td>
                                <td>{truck.mine}</td>
                                <td>{truck.po}</td>
                                <td>{truck.ticket_number}</td>
                                <td>{`${truck.total_amount_per_day.toLocaleString("en-US")}(${(truck.total_amount_per_day / 2000).toLocaleString("en-US")})`}</td>
                                {!user.email && (
                                    <td><button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#editTruckLoad" onClick={() => goToEditForm(truck)}>Edit</button></td>
                                )}
                                {!user.email && (
                                    <td><button type="button" className="btn btn-info" onClick={() => goToDeleteForm(truck)}>Delete</button></td>
                                )}
                            </tr>
                        )
                    })
                }        
                </tbody>
                </table>
                </div>
                <div className="modal-body">
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Mine</th>
                        <th scope="col">Mine Total Per Day</th>
                    </tr>
                </thead>
                <tbody>
                    {mineArray.map(site => {
                        return(
                            <tr key={site.id}>
                                <th className="row">{site.mine}</th>
                                <td>{`${site.mine_total_per_day.toLocaleString("en-US")}(${(site.mine_total_per_day / 2000).toLocaleString("en-US")})`}</td>
                            </tr>
                        )
                    })}
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