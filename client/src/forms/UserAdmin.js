import {useState} from 'react'

export default function UserAdmin({id, status}){
    const [ adminUpdate, setAdminUpdate ] = useState(status)

    const handleAdminUpdate = () => {
        setAdminUpdate(!adminUpdate);
        const dataForm = {
        };
        fetch(`/api/user_employee_update/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForm),
          }).then(r => r.json()).then(r => console.log(r));
    }

    return(
        <button className="btn btn-primary" onClick={() => handleAdminUpdate()}>{adminUpdate ? "Remove Admin Privilege" : "Give Admin Privilege"} </button>
    )
}