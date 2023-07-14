import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Authenticated from './authenticate/Authenticated'
import CompanyAuthorized from './authenticate/CompanyAuthorized';
import Unauthenticated from './authenticate/Unauthenticated'

function App() {
  const [ user, setUser ] = useState(null)
  const [ companyUser, setCompanyUser ] = useState(null)

  useEffect(() => {
    fetch("/api/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setUser(user)
        });
      }
    });
  }, [setUser]);

  useEffect(() => {
      fetch('/api/company_personnel')
      .then(resp => {
        if(resp.ok) {
          resp.json().then(user => setCompanyUser(user))
        }
      })
  },[setCompanyUser])

  console.log("app", companyUser)
  return (
    <>
    <Router>
      {user && (
        <Authenticated
          setUser={setUser}
          user={user}
        />
      )}
      {companyUser && (
        <CompanyAuthorized
          setCompanyUser={setCompanyUser}
          companyUser={companyUser}
        />
      )}
      {user === null && companyUser === null &&(
          <Unauthenticated
            setUser={setUser}
            setCompanyUser={setCompanyUser}
          />
        )
      }
    </Router>
    </>
  );
}

export default App;
