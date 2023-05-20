import { useState } from "react"

export default function TrashSand({id, trashSand, setTrashSand, onSite, setOnSite}){
    const [ pounds, setPounds ] = useState('')
    const [ success, setSuccess ] = useState(false)
    const [ error, setError ] = useState([])

    const handleTrashSand = () => {
        const formData = {
            trash_sand: parseInt(pounds)
        }
        setError([])
        setSuccess(false)
        fetch(`/api/sites/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then(resp => {
            if(resp.ok){
                const profile = JSON.parse(localStorage.getItem('MY_SAND_SITE'));
                    Object.keys(formData).forEach((key) => {
                        profile[key] = (formData[key] + profile[key]);
                    });
                localStorage.setItem('MY_SAND_SITE', JSON.stringify(profile))
                setTrashSand(trashSand + parseInt(pounds))
                setOnSite(onSite - parseInt(pounds))
                setSuccess(true)
                setPounds('')
            }else{
                resp.json().then(err => setError(err.errors))
            }
          })
    }

    return(
        <div className="modal fade" id="trashSand" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Trash Sand</h1>
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
                    <div className="mb-3 row" style={{width: "95%", paddingLeft: "10%"}}>
                        <label htmlFor="inputPounds" className="col-sm-2 col-form-label"> Pounds </label>
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
                        <button type="button" className="btn btn-primary" onClick={() => handleTrashSand()}>Save Trash</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}