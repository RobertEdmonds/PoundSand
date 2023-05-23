import { useState } from "react";
import {  useParams } from "react-router-dom";
import DownHole from "../forms/DownHole";
import TruckLoad from "../forms/TruckLoad";
import DisplayNav from "./DisplayNav";
import DisplayTruck from "./DisplayTruck";
import DisplaySand from "./DisplaySand";
import EditTruckLoad from "../forms/EditTruckLoad";
import TrashSand from "../forms/TrashSand";

function DisplaySite({sites, 
    onSite, 
    setOnSite,
    tSandUsed,
    siteDelivery,
    handleAddSand,
    handleUseSand,
    completedBool,
    handleSiteCompletion,
    handleEditSand,
    showUseSandDelete,
    user,
    trashSand,
    setTrashSand,
    correction,
    setCorrection,
    handleCorrection
    }){
    const { location, crew, id} = useParams()
    const [ displayInfo, setDisplayInfo ] = useState(false)
    const [ dateDirection, setDateDirection ] = useState(false)
    const [ editTruck, setEditTruck ] = useState([])
    const [ truckTime, setTruckTime ] = useState("")
    const [ sandTime, setSandTime ] = useState('')
    const [ truck, setTruck ] = useState('')
    const [ mine, setMine ] = useState('')
    const [ tare, setTare ] = useState(0)
    const [ gross, setGross ] = useState(0)
    const [ ship, setShip ] = useState('')
    const [ po, setPo ] = useState('')

    const handleDateChange = (bool) => {
        setDateDirection(bool)
    }

    const sandUsed = sites.filter(site => site.id === parseInt(id)).map(site => site.sand_useds)[0]
    const dictionaryUsed = {}
        for(let i = 0; i < sandUsed.length; i++){
            if(dictionaryUsed.hasOwnProperty(sandUsed[i].date)){
                dictionaryUsed[sandUsed[i].date] += 1
            }else{
                dictionaryUsed[sandUsed[i].date] = 1
            }
        }
    const displaySandUsed = [] 
    let count = 0
    for(let i = 0; i < Object.values(dictionaryUsed).length; i++){
        displaySandUsed.push(sandUsed[(Object.values(dictionaryUsed)[i])+ count - 1])
        count += (Object.values(dictionaryUsed)[i])
    }

    const truckArray = sites.filter(site => site.id === parseInt(id)).map(site => site.trucks)[0]
    const dictionaryTruck = {}
        for(let i = 0; i < truckArray.length; i++){
            if(dictionaryTruck.hasOwnProperty(truckArray[i].date)){
                dictionaryTruck[truckArray[i].date] += 1
            }else{
                dictionaryTruck[truckArray[i].date] = 1
            }
        }
    const displayTruckLoad = [] 
    let amount = 0
    for(let i = 0; i < Object.values(dictionaryTruck).length; i++){
        displayTruckLoad.push(truckArray[(Object.values(dictionaryTruck)[i])+ amount - 1])
        amount += (Object.values(dictionaryTruck)[i])
    }

    const goToEditForm = (truck) => {
        setTruck(truck.truck)
        setMine(truck.mine)
        setTare(truck.tare_weight)
        setGross(truck.gross_weight)
        setShip(truck.ship_to)
        setPo(truck.po)
        setEditTruck(truck)
    }

    let displayMoisture = sandUsed.map(sand => sand.moisture)

    const dictionaryStage = {}
    for(let i = 0; i < sandUsed.length; i++){
        if(dictionaryStage.hasOwnProperty(sandUsed[i].stage)){
            dictionaryStage[sandUsed[i].stage] += sandUsed[i].pounds
        }else{
            dictionaryStage[sandUsed[i].stage] = sandUsed[i].pounds
        }
    }

    return(
        <div>
            <DisplayNav 
            location={location} 
            setDisplayInfo={setDisplayInfo} 
            handleDateChange={handleDateChange}
            completedBool={completedBool}
            correction={correction}
            setCorrection={setCorrection}
            handleCorrection={handleCorrection}
            crew={crew}
            user={user}
            />
            <DownHole id={id} handleUseSand={handleUseSand}/>
            <TruckLoad id={id} location={location} handleAddSand={handleAddSand}/>
            <EditTruckLoad editTruck={editTruck}
                handleEditSand={handleEditSand}
                setTruck={setTruck}
                truck={truck}
                setMine={setMine}
                mine={mine}
                setTare={setTare}
                tare={tare}
                setGross={setGross}
                gross={gross}
                setShip={setShip}
                ship={ship}
                setPo={setPo}
                po={po}
                sites={sites}
                 />
            <TrashSand id={id} trashSand={trashSand} setTrashSand={setTrashSand} onSite={onSite} setOnSite={setOnSite}/>
            <DisplayTruck truckArray={truckArray} truckTime={truckTime} goToEditForm={goToEditForm} user={user}/>
            <DisplaySand sandUsed={sandUsed} sandTime={sandTime} showUseSandDelete={showUseSandDelete} user={user}/>
            <div className="container text-center" style={{width: "100%"}}>
                <div className="row align-items-start" >
                    <div className="col badge fs-4" style={{backgroundColor: "tan", color: "black"}}>
                        Total Delivered:
                        <br/>
                        Pounds: {(siteDelivery).toLocaleString("en-US")}
                        <br/>
                        Tons: {(siteDelivery / 2000).toLocaleString("en-US")}
                    </div>
                    <div className="col badge fs-4" style={{backgroundColor: "tan", color: "black"}}>
                        Total Sand On Site:
                        <br/>
                        Pounds: {(onSite).toLocaleString("en-US")}
                        <br/>
                        Tons: {(onSite / 2000).toLocaleString("en-US")}
                    </div>
                    <div className="col badge fs-4" style={{backgroundColor: "tan", color: "black"}}>
                        Total Sand Used:
                        <br/>
                        Pounds: {tSandUsed.toLocaleString("en-US")}
                        <br/>
                        Tons: {(tSandUsed / 2000).toLocaleString("en-US")}
                    </div>
                    <div className="col badge fs-4" style={{backgroundColor: "tan", color: "black"}}>
                        Trash Sand:
                        <br/>
                        Pounds: {trashSand.toLocaleString("en-US")}
                        <br/>
                        Tons: {(trashSand / 2000).toLocaleString("en-US")}
                    </div>
                </div>
            </div>
            {displayInfo ? (
                <table className="table" style={{backgroundColor: "rgb(21, 75, 126)", color: "white", fontWeight: "bold"}}>
                <thead >
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Truck Load <br/> Pounds(Tons)</th>
                        <th scope="col">Mine</th>
                        <th scope="col">PO #</th>
                        <th scope="col">Total Per Day</th>
                    </tr>
                </thead>
                <tbody>
                {(dateDirection ? displayTruckLoad.reverse() : displayTruckLoad).map(truck => {
                    const truckDate = truck.date.split("-")
                        return(
                            <tr key={truck.id}>
                                <th scope="row"><button type="button" 
                                className="btn btn-primary" 
                                data-bs-toggle="modal" 
                                data-bs-target="#staticTruck" 
                                style={{fontWeight: "bold"}}
                                onClick={() => setTruckTime(truck.date)}>{truckDate[1]}/{truckDate[2]}/{truckDate[0]}</button></th>
                                <td>{`${truck.total.toLocaleString("en-US")}(${(truck.total / 2000).toLocaleString("en-US")})`}</td>
                                <td>{truck.mine}</td>
                                <td>{truck.po}</td>
                                <td>{`${truck.total_amount_per_day.toLocaleString("en-US")}(${(truck.total_amount_per_day / 2000).toLocaleString("en-US")})`}</td>
                            </tr>
                        )
                    })
                }        
                </tbody>
            </table>
            ):(
            <>
                <table className="table" style={{backgroundColor: "rgb(21, 75, 126)", color: "white", fontWeight: "bold"}}>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Pounds(Tons)</th>
                            <th scope="col">Stage</th>
                            <th scope="col">Moisture% <br/> Av:  {Math.ceil((displayMoisture.reduce((a, v) => a + v,0)/displayMoisture.length) * 100)/100}</th>
                            <th scope="col">Total Per Day</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(dateDirection ? displaySandUsed.reverse() : displaySandUsed).map(sand => {
                        const sandDate = sand.date.split('-')
                            return(
                                <tr key={sand.id}>
                                    <th scope="row"><button 
                                    type="button" 
                                    className="btn btn-primary"
                                    data-bs-toggle="modal" 
                                    data-bs-target="#staticSand"
                                    style={{fontWeight: "bold"}} 
                                    onClick={() => setSandTime(sand.date)}>{sandDate[1]}/{sandDate[2]}/{sandDate[0]}</button></th>
                                    <td>{`${sand.pounds.toLocaleString("en-US")}(${(sand.pounds / 2000).toLocaleString("en-US")})`}</td>
                                    <td>{sand.stage}</td>
                                    <td>{sand.moisture}</td>
                                    <td>{`${sand.total_amount_per_day.toLocaleString("en-US")}(${(sand.total_amount_per_day / 2000).toLocaleString("en-US")})`}</td>
                                </tr>
                            )
                        })
                    }        
                    </tbody>
                </table>
                <table className="table" style={{backgroundColor: "rgb(21, 75, 126)", color: "white", fontWeight: "bold"}}>
                    <thead>
                        <tr>
                            <th scope="col">Stage</th>
                            <th scope="col">Total Pounds(Tons)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.entries(dictionaryStage).map((value) => {
                       console.log(value[0])
                        return(
                            <tr key={value[0]}>
                                <td>{value[0]}</td>
                                <td>{`${value[1].toLocaleString("en-US")}(${(value[1] / 2000).toLocaleString("en-US")})`}</td>
                            </tr> 
                        )
                        })
                    }
                    </tbody>
                </table>
            </>
            )}
            {user.boss && (
            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="button" onClick={() => handleSiteCompletion(parseInt(id))} style={{fontWeight: "bold"}}>{completedBool ? "Reopen Site" : "Complete This Site"}</button>
            </div>
            )}
        </div>
    )
}

export default DisplaySite;