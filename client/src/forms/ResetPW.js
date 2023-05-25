import {useState} from 'react';
import { useNavigate } from "react-router-dom";


function ResetPW({setUser, user}){
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([])
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError([])
        const dataForm = {
          password,
          password_confirmation: passwordConfirmation
        };
        if (password !== passwordConfirmation) {
          alert("Passwords don't match");
        } else {
        fetch(`/api/reset/${user.id}`, {
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
        <>
            {error.map((err) => {
            return <div className="alert alert-danger" role="alert" key={err}>{err}</div>;
            })}
            <form onSubmit={handleSubmit} className="container text-center">
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="formGroupExampleInput" 
                        placeholder="Password" 
                        onChange={e => setPassword(e.target.value.trim())} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password Confirmation</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="formGroupExampleInput2" 
                        placeholder="Password Confirmation"
                        onChange={e => setPasswordConfirmation(e.target.value)}/>
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
        </>
    )
}

export default ResetPW;