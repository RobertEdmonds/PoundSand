import { useState } from "react"

export default function AddEmployee({handleAddUser}){
    const [ success, setSuccess ] = useState(false)
    const [ error, setError ] = useState([])
    const [ name, setName ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('')

    const createUser = () => {
        const formData = {
            name,
            username,
            password,
            password_confirmation: passwordConfirmation
        }
        fetch("/api/signup", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((resp) => {
                if(resp.ok){
                    resp.json().then((user) => {
                        setSuccess(true)
                        handleAddUser(user)
                    })
                    setName('')
                    setUsername('')
                    setPassword('')
                    setPasswordConfirmation('')
                }else{
                    resp.json().then((err) => {
                        setError(err.errors)
                    })
                }
            })
    }

    return(
        <div 
            className="modal fade " 
            id="newUser" 
            tabIndex="-1" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true"
            >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Employee</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                {success ? ( 
                        <div className="alert alert-success" role="alert">Success</div>
                    ):(
                    error.map((err) => {
                        return(
                            <div key={err} className="alert alert-danger" role="alert">{err}</div>
                            )
                    }))}
                <form>
                    <div className="mb-3">
                        <label htmlFor="inputTruck" className="form-label">Full Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputTruck"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputMine" className="form-label">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputMine"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputShipTo" className="form-label">Password</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputShipTo"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPO" className="form-label">Password Confirmation</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputPO"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                    </div>
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => createUser()}>Add Employee</button>
                </div>
                </div>
            </div>
        </div>
    )
}