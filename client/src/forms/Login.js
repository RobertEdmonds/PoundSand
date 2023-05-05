import {useState} from 'react';
import { useNavigate } from "react-router-dom";


function Login({setUser, setCompanyUser}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([])
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const dataForm = {
          username,
          password,
        };
        fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),
        }).then((r) => {
          setLoading(false);

          if (r.ok) {
            r.json().then((user) => {
              if(user.hasOwnProperty('email')){
                setCompanyUser(user)
              }else{
                if(user.log_number === 0){
                    setUser(user)
                    navigate(`/reset_password/${user.id}`)
                }else{
                    setUser(user)
                    navigate("/");
                }
              }
            })
            setUsername("");
            setPassword("");
          } else {
            r.json().then((err) => {
                setError(err.errors)
            });
          }
        });
      }

    const handleCompanySite = () => {
      navigate('/company_sign_up')
    }

    return(
        <>
            {error.map((err) => {
            return <div className="alert alert-danger" role="alert" key={err}>{err}</div>;
            })}
            <div className="container text-center fs-2 p-3 mb-2 bg-info text-dark">
                <div className="col-md-auto">
                    Pound Sand
                </div>
            </div>
            <form onSubmit={handleSubmit} className="container text-center">
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="formGroupExampleInput" 
                        placeholder="Username" 
                        value={username}
                        onChange={e => setUsername(e.target.value.trim())} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="formGroupExampleInput2" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </div>
                {loading ? (
                    <button className="btn btn-primary" type="button" disabled>
                        Loading...
                        <br/>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </button>
                ):(
                  <>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="button" class="btn btn-link" onClick={() => handleCompanySite()}>Sign Up</button>
                  </>
                )}
            </form>
            {/* <button onClick={() => setLoading(!loading)}></button> */}
        </>
    )
}

export default Login;