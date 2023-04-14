import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Authenticated from './authenticate/Authenticated'
import Unauthenticated from './authenticate/Unauthenticated'

function App() {
  const [ user, setUser ] = useState(null)
  // const [ sites, setSites ] = useState([]) 

  useEffect(() => {
    fetch("/api/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setUser(user)
        });
      }
    });
  }, [setUser]);

  

  // function handleFinishedSite(){
  //   fetch('/api/completed_sites')
  //   .then(resp => resp.json())
  //   .then(comp => console.log(comp))
  // }

  return (
    <>
    <Router>
      {user ? (
          <Authenticated
            setUser={setUser}
            user={user}
          />
        ) : (
          <Unauthenticated
            setUser={setUser}
          />
        )
      }
    </Router>
    </>
  );
}

export default App;
