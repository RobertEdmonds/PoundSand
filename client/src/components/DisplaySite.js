import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DownHole from "../forms/DownHole";
import TruckLoad from "../forms/TruckLoad";
import DisplayNav from "./DisplayNav";


function DisplaySite({sites, 
    setButtonInfo, 
    onSite, 
    tSandUsed,
    handleAddSand,
    handleUseSand
    }){
    const { location, id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/site/${location}/${id}`)
        setButtonInfo(location)
    },[navigate, location, id, setButtonInfo])

    const handleWeightChange = () => {

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
        displayTruckLoad.push(truckAmount[0][(Object.values(dictionaryUsed)[i])+ amount - 1])
        amount += (Object.values(dictionaryUsed)[i])
    }
    console.log(displayTruckLoad)    
    return(
        <div>
            <DisplayNav location={location} handleWeightChange={handleWeightChange}/>
            <DownHole id={id} handleUseSand={handleUseSand}/>
            <TruckLoad id={id} handleAddSand={handleAddSand}/>
            <div className="container text-center">
                <div className="row justify-content-md-center">
                    <div className="col-6">
                        Total Sand On Site:
                        <br/>
                        {onSite}
                    </div>
                    <div className="col-6">
                        Total Sand Used:
                        <br/>
                        {tSandUsed}
                    </div>
                </div>
            </div>
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
                        return(
                            <tr key={sand.id}>
                                <th scope="row">{sand.date}</th>
                                <td>{sand.pounds}</td>
                                <td>{sand.stage}</td>
                                <td>{sand.moisture}</td>
                                <td>{sand.total_amount_per_day}</td>
                            </tr>
                        )
                    })
                }        
                </tbody>
            </table>
        </div>
    )
}

export default DisplaySite;