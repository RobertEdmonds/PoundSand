import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function DisplaySite({siteId}){
    const { location, id } = useParams()
    const navigate = useNavigate()
    console.log("id", id)
    console.log("location", location)
    console.log(siteId)
    useEffect(() => {
        navigate(`/site/${location}/${id}`)
    },[navigate, location, id])
    return(
        <div>
            <h1>{location}</h1>
        </div>
    )
}

export default DisplaySite;