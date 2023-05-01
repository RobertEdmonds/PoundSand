import { useState } from "react";
import {  useParams } from "react-router-dom";
import DownHole from "../forms/DownHole";
import TruckLoad from "../forms/TruckLoad";
import DisplayNav from "./DisplayNav";
import DisplayTruck from "./DisplayTruck";
import DisplaySand from "./DisplaySand";
import EditTruckLoad from "../forms/EditTruckLoad";

function DisplaySite({sites, 
    onSite, 
    tSandUsed,
    siteDelivery,
    handleAddSand,
    handleUseSand,
    completedBool,
    handleSiteCompletion,
    handleEditSand
    }){
    const { location, crew, id} = useParams()
    const [ displayInfo, setDisplayInfo ] = useState(false)
    const [ changeWeight, setChangeWeight ] = useState(false)
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

    const handleWeightChange = (bool) => {
        setChangeWeight(bool)
    }

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

    
  
    return(
        <div>
            <DisplayNav 
            location={location} 
            handleWeightChange={handleWeightChange} 
            setDisplayInfo={setDisplayInfo} 
            handleDateChange={handleDateChange}
            completedBool={completedBool}
            crew={crew}
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
                 />
            <DisplayTruck truckArray={truckArray} truckTime={truckTime} goToEditForm={goToEditForm}/>
            <DisplaySand sandUsed={sandUsed} sandTime={sandTime}/>
            <div className="container text-center">
                <div className="row align-items-start">
                    <div className="col badge text-bg-info fs-3">
                        Total Delivered:
                        <br/>
                        {changeWeight ? (siteDelivery / 2000) : (siteDelivery)}
                    </div>
                    <div className="col badge text-bg-info fs-3">
                        Total Sand On Site:
                        <br/>
                        {changeWeight ? (onSite / 2000) : (onSite)}
                    </div>
                    <div className="col badge text-bg-info fs-3">
                        Total Sand Used:
                        <br/>
                        {changeWeight ? (tSandUsed / 2000) : tSandUsed}
                    </div>
                </div>
            </div>
            {displayInfo ? (
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
                {(dateDirection ? displayTruckLoad.reverse() : displayTruckLoad).map(truck => {
                    const truckDate = truck.date.split("-")
                        return(
                            <tr key={truck.id}>
                                <th scope="row"><button type="button" 
                                className="btn btn-primary" 
                                data-bs-toggle="modal" 
                                data-bs-target="#staticTruck" 
                                onClick={() => setTruckTime(truck.date)}>{truckDate[1]}/{truckDate[2]}/{truckDate[0]}</button></th>
                                <td>{changeWeight ? (truck.total / 2000) : truck.total}</td>
                                <td>{truck.mine}</td>
                                <td>{truck.po}</td>
                                <td>{changeWeight ? (truck.total_amount_per_day / 2000) : truck.total_amount_per_day}</td>
                            </tr>
                        )
                    })
                }        
                </tbody>
            </table>
            ):(
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Pounds</th>
                        <th scope="col">Stage</th>
                        <th scope="col">Moisture</th>
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
                                onClick={() => setSandTime(sand.date)}>{sandDate[1]}/{sandDate[2]}/{sandDate[0]}</button></th>
                                <td>{changeWeight ? (sand.pounds / 2000) : sand.pounds}</td>
                                <td>{sand.stage}</td>
                                <td>{sand.moisture}</td>
                                <td>{changeWeight ? (sand.total_amount_per_day / 2000) : sand.total_amount_per_day}</td>
                            </tr>
                        )
                    })
                }        
                </tbody>
            </table>
            )}
            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="button" onClick={() => handleSiteCompletion(parseInt(id))}>{completedBool ? "Reopen Site" : "Complete This Site"}</button>
            </div>
        </div>
    )
}

export default DisplaySite;