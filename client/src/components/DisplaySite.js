import { useState } from "react";
import {  useParams } from "react-router-dom";
import DownHole from "../forms/DownHole";
import TruckLoad from "../forms/TruckLoad";
import DisplayNav from "./DisplayNav";

function DisplaySite({sites, 
    onSite, 
    tSandUsed,
    handleAddSand,
    handleUseSand
    }){
    const { location, id} = useParams()
    const [ displayInfo, setDisplayInfo ] = useState(false)
    const [ changeWeight, setChangeWeight ] = useState(false)

    const handleWeightChange = (bool) => {
        setChangeWeight(bool)
    }

    const sandUsed = sites.filter(site => site.id === parseInt(id)).map(site => site.sand_useds)
    const dictionaryUsed = {}
        for(let i = 0; i < sandUsed[0].length; i++){
            if(dictionaryUsed.hasOwnProperty(sandUsed[0][i].date)){
                dictionaryUsed[sandUsed[0][i].date] += 1
            }else{
                dictionaryUsed[sandUsed[0][i].date] = 1
            }
        }
    const displaySandUsed = [] 
    let count = 0
    for(let i = 0; i < Object.values(dictionaryUsed).length; i++){
        displaySandUsed.push(sandUsed[0][(Object.values(dictionaryUsed)[i])+ count - 1])
        count += (Object.values(dictionaryUsed)[i])
    } 

    const truckAmount = sites.filter(site => site.id === parseInt(id)).map(site => site.trucks)
    const dictionaryTruck = {}
        for(let i = 0; i < truckAmount[0].length; i++){
            if(dictionaryTruck.hasOwnProperty(truckAmount[0][i].date)){
                dictionaryTruck[truckAmount[0][i].date] += 1
            }else{
                dictionaryTruck[truckAmount[0][i].date] = 1
            }
        }
    const displayTruckLoad = [] 
    let amount = 0
    for(let i = 0; i < Object.values(dictionaryTruck).length; i++){
        displayTruckLoad.push(truckAmount[0][(Object.values(dictionaryTruck)[i])+ amount - 1])
        amount += (Object.values(dictionaryTruck)[i])
    }
  
    return(
        <div>
            <DisplayNav location={location} handleWeightChange={handleWeightChange} setDisplayInfo={setDisplayInfo}/>
            <DownHole id={id} handleUseSand={handleUseSand}/>
            <TruckLoad id={id} handleAddSand={handleAddSand}/>
            <div className="container text-center">
                <div className="row justify-content-md-center">
                    <div className="col-6">
                        Total Sand On Site:
                        <br/>
                        {changeWeight ? (onSite / 2000) : (onSite)}
                    </div>
                    <div className="col-6">
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
                {displayTruckLoad.map(truck => {
                    const truckDate = truck.date.split("-")
                        return(
                            <tr key={truck.id}>
                                <th scope="row">{truckDate[1]}/{truckDate[2]}/{truckDate[0]}</th>
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
                {displaySandUsed.map(sand => {
                    const sandDate = sand.date.split('-')
                        return(
                            <tr key={sand.id}>
                                <th scope="row">{sandDate[1]}/{sandDate[2]}/{sandDate[0]}</th>
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
        </div>
    )
}

export default DisplaySite;