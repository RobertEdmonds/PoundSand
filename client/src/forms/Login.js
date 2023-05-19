import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Picture from '../forms/AquaProp1.png'


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
            <div style={{width: "100%", height: "20rem", backgroundPosition: "center", backgroundImage: `url(${Picture})`}}></div>
            <form onSubmit={handleSubmit} className="container text-center" style={{color: 'white', fontWeight: "bolder", fontSize: "2rem"}}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="formGroupExampleInput" 
                        placeholder="Username" 
                        onChange={e => setUsername(e.target.value.trim())} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="formGroupExampleInput2" 
                        placeholder="Password"
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
                    <button type="submit" className="btn btn-primary" style={{fontWeight: "bold"}}>Login</button>
                    <button type="button" className="btn btn-link" onClick={() => handleCompanySite()} style={{fontWeight: "bold"}}>Sign Up</button>
                  </>
                )}
            </form>
            {/* <button onClick={() => setLoading(!loading)}></button> */}
        </>
    )
}

export default Login;