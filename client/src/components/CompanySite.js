import { useState, useParams } from "react"

export default function CompanySite(){
    const { location, crew, id} = useParams()
    const [ displayInfo, setDisplayInfo ] = useState(false)
    const [ changeWeight, setChangeWeight ] = useState(false)
    const [ dateDirection, setDateDirection ] = useState(false)
    const [ truckTime, setTruckTime ] = useState("")
    const [ sandTime, setSandTime ] = useState('')

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
            <DisplayTruck truckArray={truckArray} truckTime={truckTime} goToEditForm={goToEditForm}/>
            <DisplaySand sandUsed={sandUsed} sandTime={sandTime} showUseSandDelete={showUseSandDelete}/>
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
        </div>
    )
}