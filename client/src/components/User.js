import { useEffect, useState } from "react"
import AddEmployee from "../forms/AddEmployee"
import SetPWReset from "../forms/SetPWReset"
import UserAdmin from "../forms/UserAdmin"

export default function User(){
    const [ usersArray, setUsersArray ] = useState([])
    const [ allUsers, setAllUsers ] = useState([])
    const [ userInfo, setUserInfo ] = useState([])
    
    useEffect(() => {
        fetch('/api/users')
        .then(resp => resp.json())
        .then(users => {
            setUsersArray(users)
            setAllUsers(users)
        })
    },[])

    const handleAddUser = (newUser) => {
        setUsersArray([...usersArray, newUser])
    }

    const handleEmployeeDelete = (id) => {
        fetch(`/api/employee_delete/${id}`, {
            method: "DELETE",
        }).then(() => {
            setUsersArray(usersArray.filter(user => user.id !== id))
        })
    }

    const handleEmployeeSearch = (value) => {
        const searchUser = allUsers.filter(site => {
            return(site.name.toUpperCase().includes(value.toUpperCase()))
        })
        setUsersArray(searchUser) 
    }
    

    return(
        <>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleEmployeeSearch(e.target.value)}/>
            </form>
            <br/>
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
                                    <button type="button" className="btn btn-danger" onClick={() => handleEmployeeDelete(user.id)}>Delete Employee</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#newUser">Add New Employee</button>
                </div>
                <AddEmployee handleAddUser={handleAddUser}/>
                <SetPWReset userInfo={userInfo}/>
            </div>
        </>
    )
}