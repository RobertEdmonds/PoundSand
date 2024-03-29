import { useState } from "react"
import moment from 'moment';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function EditTruckLoad({editTruck, 
    handleEditSand,
    setTruck,
    truck,
    setMine,
    mine,
    setTare,
    tare,
    setGross,
    gross,
    setShip,
    ship,
    setPo,
    po,
    ticket, 
    setTicket,
    sites
}){
    const [ date, setDate ] = useState([])
    const [ error, setError ] = useState([])
    const [ success, setSuccess ] = useState(false)

    const handleTruckLoad = () => {
        const correctTime = moment(date.$d).format('MMMM Do YYYY, h:mm:ss a')
        const correctDate = moment(date.$d).format()
        const formData = {
            truck, 
            mine: mine.trim(),
            time: correctTime,
            date: correctDate,  
            tare_weight: tare, 
            gross_weight: gross, 
            ship_to: ship,
            ticket_number: ticket, 
            po: po, 
        }
        setError([])
        setSuccess(false)
        fetch(`/api/trucks/${editTruck.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then(resp => {
            if(resp.ok){
                resp.json().then(truck => {
                    handleEditSand(truck, editTruck)
                    setSuccess(true)
                })
                setTruck('')
                setMine('')
                setDate([])
                setTare("")
                setGross("")
                setTicket('')
                setPo('')
            }else{
                resp.json().then(err => setError(err.errors))
            }
        })
    }

    return(
        <div 
        className="modal fade modal-lg" 
        id="editTruckLoad" 
        tabIndex="-1" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true"
        >
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Truck {editTruck.truck}</h1>
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                    sx={{ color: "success.main", width: "90%" }}
                    // label="Start Time
                    value={date}
                    onChange={(e) => setDate(e)}
                    // renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
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
                        <label htmlFor="inputMine" className="form-label">Ticket #</label>
                        <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputMine"
                            value={ticket}
                            onChange={(e) => setTicket(e.target.value)}
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
                        value={gross}
                        onChange={(e) => setGross(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputShipTo" className="form-label">Ship To</label>
                    <select 
                    className="form-select form-select-lg mb-3" 
                    aria-label=".form-select-lg example"
                    value={ship}
                    onChange={(e) => setShip(e.target.value)}>
                        {sites.map(site => {
                            return(
                                <option key={site.id} value={site.location}>{site.location}</option>
                            )
                        })}
                    </select>
                </div>
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
                <button type="button" className="btn btn-primary" onClick={() => handleTruckLoad()}>Save Changes</button>
            </div>
            </div>
        </div>
    </div>
    )
}