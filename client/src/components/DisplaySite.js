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
                    console.log(sandUsed[0][i].date)
                    dictionaryUsed[sandUsed[0][i].date] += 1
                }else{
                    console.log(sandUsed[0][i].date)
                    dictionaryUsed[sandUsed[0][i].date] = 1
                }
            }       
    console.log(dictionaryUsed)
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
                        <th scope="col">Sand on Site</th>
                        <th scope="col">Sand Used</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                {for(let i = 0; i < dictionaryUsed; i++){
                    if(){
                        return(
                    <tr >
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                        )
                    }
                    }   
                }
                </tbody>
            </table>
        </div>
    )
}

export default DisplaySite;