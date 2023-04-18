import { useEffect, useState } from "react"
import SetPWReset from "../forms/SetPWReset"
import UserAdmin from "../forms/UserAdmin"

export default function User(){
    const [ usersArray, setUsersArray ] = useState([])
    const [ userInfo, setUserInfo ] = useState([])
    
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
                                <button className="btn btn-primary" onClick={() => setUserInfo(user)}data-bs-toggle="modal" data-bs-target="#ResetPWModal">Reset Password</button>
                                <UserAdmin id={user.id} status={user.boss}/>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="button" >Add New Employee</button>
            </div>
            <SetPWReset userInfo={userInfo}/>
        </div>
    )
}