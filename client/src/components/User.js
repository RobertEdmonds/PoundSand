import { useEffect, useState } from "react"

export default function User(){
    const [ usersArray, setUsersArray ] = useState([])
    useEffect(() => {
        fetch('/api/users')
        .then(resp => resp.json())
        .then(users => setUsersArray(users))
    },[])
    return(
        <div className="container text-center">
            <div className="row">
            {usersArray.map(user => {
                return(
                    <div className="col" key={user.id}>
                        <div className="card" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-primary" onClick={() => console.log(user)}>Reset Password</button>
                                <button className="btn btn-primary" onClick={() => console.log(user)}>Give Admin Privilege </button>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="button" >Add New Employee</button>
            </div>
        </div>
    )
}