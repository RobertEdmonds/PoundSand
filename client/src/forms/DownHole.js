import { useState } from "react"
import moment from 'moment'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function DownHole({id, handleUseSand}){
    const [ pounds, setPounds ] = useState('')
    const [ stage, setStage ] = useState('')
    const [ moisture, setMoisture ] = useState('')
    const [ error, setError ] = useState([])
    const [ date, setDate ] = useState([])
    const [ success, setSuccess ] = useState(false)


    const handleDownHole = () => {
        const correctDate = moment(date.$d).format('MMMM Do YYYY, h:mm:ss a')
        const formData = {
            pounds: Math.round(parseInt(pounds) * 2000),
            stage,
            moisture,
            site_id: parseInt(id),
            date: correctDate
        }
        setError([])
        setSuccess(false)
        fetch(`/api/sand_useds`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then(resp => {
            if(resp.ok){
                resp.json().then(sand => {
                    setSuccess(true)
                    setPounds('')
                    setStage('')
                    setMoisture(0.0)
                    setDate([])
                    handleUseSand(sand)
                })
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
                        <label htmlFor="inputPounds" className="col-sm-2 col-form-label"> Tons </label>
                        <div className="input-group">
                        <input type="number"
                            pattern="[0-9]*"
                            min='0'
                            max='9999'  
                            className="form-control" 
                            id="inputPounds"
                            
                            value={pounds}
                            onChange={(e) => setPounds(e.target.value)}
                            />
                        </div>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                        sx={{ color: "success.main", width: "90%", paddingLeft: "10%" }}
                        // label="Start Time"
                        value={date}
                        onChange={(e) => setDate(e)}
                        // renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <div className="mb-3 row" style={{width: "95%", paddingLeft: "10%"}}>
                        <label htmlFor="inputStage" className="col-sm-2 col-form-label">Stage</label>
                        <div className="input-group">
                        <input type="text" 
                            className="form-control" 
                            id="inputStage"
                            value={stage}
                            onChange={e => setStage(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row" style={{width: "95%", paddingLeft: "10%"}}>
                        <label htmlFor="inputMoisture" className="col-sm-2 col-form-label">Moisture%</label>
                        <div className="input-group">
                        <input type="number"
                            pattern="[0-9]*" 
                            min='0'
                            max='15' 
                            className="form-control" 
                            id="inputMoisture"
                            value={moisture}
                            onChange={e => setMoisture(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleDownHole()}>Save Sand Used</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default DownHole;