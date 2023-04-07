import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DownHole from "../forms/DownHole";
import TruckLoad from "../forms/TruckLoad";
import DisplayNav from "./DisplayNav";


function DisplaySite({sites, setButtonInfo}){
    const { location, id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/site/${location}/${id}`)
        setButtonInfo(location)
    },[navigate, location, id, setButtonInfo])

    const handleWeightChange = () => {

    }

    console.log(id)
    return(
        <div>
            <DisplayNav location={location} handleWeightChange={handleWeightChange}/>
            <DownHole />
            <TruckLoad />
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
            {sites.filter(site => site.id === id)
            .map(site => {
                return(
                    <tr>
                        {}
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>   
                )
            })}
                </tbody>
            </table>
        </div>
    )
}

export default DisplaySite;