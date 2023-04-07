function DownHole(){
    const handleDownHole = () => {
        const formData = {
            pounds: 1200,
            stage: "Blue",
            moisture: .05,
            site_id: 2
        }
        fetch(`/api/sand_useds`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then(resp => resp.json())
          .then(truck => console.log(truck))
    }
    return(
        <div className="modal fade" id="downHole" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Sand Used</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    ...
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleDownHole}>Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default DownHole;