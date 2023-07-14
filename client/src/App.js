import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Authenticated from './authenticate/Authenticated'
import CompanyAuthorized from './authenticate/CompanyAuthorized';
import Unauthenticated from './authenticate/Unauthenticated'

function App() {
  const [ user, setUser ] = useState(null)
  const [ companyUser, setCompanyUser ] = useState(null)
  const [ companySites, setCompanySites ] = useState([])
    const [ fullList, setFullList ] = useState([])

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
      if(companyUser){
        fetch(`/api/company_sites/${companyUser.company.id}`)
        console.log('after fetch')
        .then(resp => console.log(resp.json()))
        .then(company => {
            setCompanySites(company[0].sites)
            setFullList(company[0].sites)
        })
      }
  },[setCompanyUser])

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
          companySites={companySites}
          fullList={fullList}
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
