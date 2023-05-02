

function DisplaySand({sandUsed, sandTime}){
    let sandDateArray = sandUsed.filter(truck => truck.date === sandTime)
    const handleUseSandDelete = (id) => {
        fetch(`/api/sand_useds/${id}`, {
            method: "DELETE",
          }).then(() => showUseSandDelete(id));
    }

    const showUseSandDelete = (id) => {
        sandDateArray = sandDateArray.filter(sand => sand.id !== id)
    }
    return(
        <div className="modal fade modal-dialog-scrollable modal-xl" id="staticSand"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">{sandTime}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Pounds</th>
                                <th scope="col">Stage</th>
                                <th scope="col">Moisture%</th>
                                <th scope="col">Total Per Day</th>
                            </tr>
                        </thead>
                        <tbody>
                        {sandDateArray.map(sand => {
                            const sandDate = sand.date.split('-')
                                return(
                                    <tr key={sand.id}>
                                        <th scope="row">{sandDate[1]}/{sandDate[2]}/{sandDate[0]}</th>
                                        <td>{sand.pounds}</td>
                                        <td>{sand.stage}</td>
                                        <td>{sand.moisture}</td>
                                        <td>{sand.total_amount_per_day}</td>
                                        <td><button type="button" className="btn btn-info" onClick={() => handleUseSandDelete(sand.id)}>Delete</button></td>
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

export default DisplaySand;