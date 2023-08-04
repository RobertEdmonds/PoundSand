import { useState } from "react"
import {  useParams } from "react-router-dom";
import { utils, writeFileXLSX } from 'xlsx';
import DisplayNav from "./DisplayNav"
import DisplayTruck from "./DisplayTruck"
import DisplaySand from "./DisplaySand"

export default function CompanySite({showSite, siteDelivery, onSite, tSandUsed, trashSand,
    siteEstTotal,
    user}){
    const { location, crew} = useParams()
    const [ displayInfo, setDisplayInfo ] = useState(false)
    const [ dateDirection, setDateDirection ] = useState(false)
    const [ truckTime, setTruckTime ] = useState("")
    const [ sandTime, setSandTime ] = useState('')

    const handleDateChange = (bool) => {
        setDateDirection(bool)
    }

    const sandUsed = showSite.sand_useds
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
  
    const truckArray = showSite.trucks
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

    const dictionaryStage = {}
    for(let i = 0; i < sandUsed.length; i++){
        if(dictionaryStage.hasOwnProperty(sandUsed[i].stage)){
            dictionaryStage[sandUsed[i].stage] = [(dictionaryStage[sandUsed[i].stage][0] + sandUsed[i].pounds), sandUsed[i].date]
        }else{
            dictionaryStage[sandUsed[i].stage] = [sandUsed[i].pounds, sandUsed[i].date]
        }
    }


    let orderStage = (Object.entries(dictionaryStage).length + 1)
    const displayStage = Object.entries(dictionaryStage).sort((a, b) => a[1][1] > b[1][1] ? -1 : 1).map((value) => {
        orderStage -= 1
        const stageDate = value[1][1].slice(0, 10).split('-')
        const stageTime = value[1][1].slice(11, 16)
        return(
            <tr key={value[0]}>
                <td>{orderStage}.</td>
                <td>{stageDate[1]}/{stageDate[2]}/{stageDate[0]}({stageTime})</td>
                <td>{value[0]}</td>
                <td>{`${value[1][0].toLocaleString("en-US")}(${(value[1][0] / 2000).toLocaleString("en-US")})`}</td>
            </tr> 
        )
        })

    const handleExcelExport = (trucks, date) => {
        const excelArray = trucks.filter(delivery => delivery.date === date)
        const excelData = []
        for(let i=0; i < excelArray.length; i++){
            excelData.push({"Truck": excelArray[i].truck, "Mine": excelArray[i].mine, "Weight(Pounds)": excelArray[i].total, "Ticket Number": excelArray[i].ticket_number})
        }
        const wb = utils.book_new()
        const ws = utils.json_to_sheet(excelData)

        utils.book_append_sheet(wb, ws, excelArray[0].date)
        writeFileXLSX(wb, "MyExcel.xlsx")
    }

    const handleSandExcelExport = (sandArray, date) => {
        const excelArray = sandArray.filter(delivery => delivery.date === date)
        const excelData = []
        for(let i=0; i < excelArray.length; i++){
            excelData.push({"Date": excelArray[i].date.slice(0, 10), "Time": excelArray[i].date.slice(11, 16), "Weight(Pounds)": excelArray[i].pounds, "Stage": excelArray[i].stage})
        }
        const wb = utils.book_new()
        const ws = utils.json_to_sheet(excelData)

        utils.book_append_sheet(wb, ws, excelArray[0].date)
        writeFileXLSX(wb, "MyExcel.xlsx")
    }

    return(
        <div>
            <DisplayNav 
            location={location} 
            setDisplayInfo={setDisplayInfo} 
            handleDateChange={handleDateChange}
            user={user}
            crew={crew}
            correction={showSite.correction}
            sites={showSite}
            />
            <DisplayTruck truckArray={truckArray} truckTime={truckTime} user={user}/>
            <DisplaySand sandUsed={sandUsed} sandTime={sandTime} user={user}/>
            <div className="container text-center" style={{width: "100%"}}>
                <div className="row align-items-start" >
                    <div className="col badge fs-2" style={{backgroundColor: "rgb(21, 75, 126)", color: "white", fontWeight: "bold"}}>
                        Estimated Job Total:
                        <br/>
                        Pounds: {(siteEstTotal).toLocaleString("en-US")}
                        <br/>
                        Tons: {(siteEstTotal / 2000).toLocaleString("en-US")}
                    </div>
                    <div className="col badge fs-2" style={{backgroundColor: "rgb(21, 75, 126)", color: "white", fontWeight: "bold"}}>
                        Remaining Total:
                        <br/>
                        Pounds: {(siteEstTotal - (tSandUsed + onSite)).toLocaleString("en-US")}
                        <br/>
                        Tons: {((siteEstTotal - (tSandUsed + onSite)) / 2000).toLocaleString("en-US")}
                    </div>
                </div>
            </div>
            <div className="container text-center">
                <div className="row align-items-start">
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
                <thead>
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
                                onClick={() => setTruckTime(truck.date)}>{truckDate[1]}/{truckDate[2]}/{truckDate[0]}</button>
                                <button className="btn btn-secondary" type="button" style={{fontWeight: "bold"}} onClick={() => handleExcelExport(truckArray, truck.date)}>Export</button>
                                </th>
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
                        <th scope="col">Moisture</th>
                        <th scope="col">Total Per Day</th>
                    </tr>
                </thead>
                <tbody>
                {(dateDirection ? displaySandUsed.reverse() : displaySandUsed).map(sand => {
                    const sandDate = sand.date.slice(0, 10).split('-')
                        return(
                            <tr key={sand.id}>
                                <th scope="row"><button 
                                type="button" 
                                className="btn btn-primary"
                                data-bs-toggle="modal" 
                                data-bs-target="#staticSand"
                                style={{fontWeight: "bold"}} 
                                onClick={() => setSandTime(sand.date.slice(0, 10))}>{sandDate[1]}/{sandDate[2]}/{sandDate[0]}</button>
                                <button className="btn btn-secondary" type="button" style={{fontWeight: "bold"}} onClick={() => handleSandExcelExport(sandUsed, sand.date)}>Export</button>
                                </th>
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
                        <th scope="col">Order</th>
                        <th scope="col">Date(Time)</th>
                        <th scope="col">Stage</th>
                        <th scope="col">Total Pounds(Tons)</th>
                    </tr>
                </thead>
                <tbody>
                    {displayStage}
                </tbody>
            </table>
            </>
            )}
        </div>
    )
}