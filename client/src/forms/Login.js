import {useState} from 'react';
import { useNavigate } from "react-router-dom";


function Login({setUser}){
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
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),
        }).then((r) => {
          setLoading(false);
          if (r.ok) {
            r.json().then((user) => {
              setUser(user)
              navigate("/");
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

    return(
        <>
            {error.map((err) => {
            return <div className="alert alert-danger" role="alert" key={err}>{err}</div>;
            })}
            <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary">Login</button>
                )}
            </form>
            <button onClick={() => setLoading(!loading)}></button>
        </>
    )
}

export default Login;