import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SetPWReset({userInfo}){
    const [ password, setPassword ] = useState('')
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ error, setError ] = useState([])
    const navigate = useNavigate()
    
    const handleSubmit = () => {
        const dataForm = {
            password,
            password_confirmation: passwordConfirmation,
            log_number: -1
        }
        if (password !== passwordConfirmation) {
            alert("Passwords don't match");
        } else {
        fetch(`/api/reset_password/${userInfo.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForm),
          }).then((r) => {
            setLoading(false);
            if (r.ok) {
              r.json().then((user) => {
                    setSuccess(true)
                      navigate("/employee");
              })
              setPassword("");
              setPasswordConfirmation('');
            } else {
              r.json().then((err) => {
                  setError(err.errors)
              });
            }
          });
        }
    }

    return(
        <div className="modal fade" id="ResetPWModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{userInfo.name}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div className="modal-body">
                    {success ? ( 
                            <div className="alert alert-success" role="alert">Success</div>
                        ):(
                        error.map((err) => {
                            return(
                                <div key={err} className="alert alert-danger" role="alert">{err}</div>
                                )
                        }))}
                        <h5>Username: {userInfo.username}</h5>
                        <form className="container text-center">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="formGroupExampleInput" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={e => setPassword(e.target.value.trim())} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">Password Confirmation</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="formGroupExampleInput2" 
                                    placeholder="Password Confirmation"
                                    value={passwordConfirmation}
                                    onChange={e => setPasswordConfirmation(e.target.value)}/>
                            </div>
                        </form>
                    </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    {loading ? (
                                <button className="btn btn-primary" type="button" disabled>
                                    Loading...
                                    <br/>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </button>
                            ):(
                    <button type="button" className="btn btn-primary" onClick={() => handleSubmit()}>Save changes</button>
                            )}
                </div>
                </div>
            </div>
        </div>
    )
}