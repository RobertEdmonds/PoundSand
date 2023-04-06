import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function DisplaySite({sites}){
    const { location, id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/site/${location}/${id}`)
    },[navigate, location, id])
    return(
        <div>
            {sites.filter(site => site.id === id)
            .map(site => {
                return(
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                )
            })}
        </div>
    )
}

export default DisplaySite;