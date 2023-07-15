import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Picture from '../forms/AquaProp1.png'

export default function CompanySignUp({setCompanyUser}){
    const [ name, setName] = useState("")
    const [ username, setUsername] = useState("")
    const [ email, setEmail] = useState('')
    const [ code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([])
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const dataForm = {
          name,
          email,
          username,
          password,
          password_confirmation: passwordConfirmation, 
          code,
        };
        fetch("/api/company_personnel_sign_up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),
        }).then((r) => {
          setLoading(false);

          if (r.ok) {
            r.json().then((user) => {
                    setCompanyUser(user)
                    navigate("/");
                })
            setName("");
            setEmail("");
            setUsername("");
            setPassword("")
            setCode("");
            setPasswordConfirmation("")
          } else {
            r.json().then((err) => {
                setError(err.errors)
            });
          }
        });
      }

    const handleLogin = () => {
      navigate('/')
    }

    return(
        <>
            {error.map((err) => {
            return <div className="alert alert-danger" role="alert" key={err}>{err}</div>;
            })}
            <div style={{width: "100%", height: "20rem", backgroundPosition: "center", backgroundImage: `url(${Picture})`}}>
            </div>
            <form onSubmit={handleSubmit} className="container text-center" style={{fontWeight: "bold", color: "white"}}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Email Address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        // id="formGroupExampleInput" 
                        placeholder="johnsmith@gmail.com" 
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        // id="formGroupExampleInput" 
                        placeholder="John Smith" 
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        // id="formGroupExampleInput" 
                        placeholder="JohnSmith" 
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        // id="formGroupExampleInput2" 
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password Confirmation</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        // id="formGroupExampleInput2" 
                        placeholder="Password Confirmation"
                        onChange={e => setPasswordConfirmation(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Company ID</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        // id="formGroupExampleInput" 
                        value={code}
                        onChange={e => setCode(e.target.value)} />
                </div>
                {loading ? (
                    <button className="btn btn-primary" type="button" disabled>
                        Loading...
                        <br/>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </button>
                ):(
                  <>
                    <button type="submit" className="btn btn-primary" style={{fontWeight: "bold"}}>Sign Up</button>
                    <button type="button" className="btn btn-link" onClick={() => handleLogin()} style={{fontWeight: "bold"}}>Login</button>
                  </>
                )}
            </form>
            {/* <button onClick={() => setLoading(!loading)}></button> */}
        </>
    )
}