import { useState } from "react"

export default function UpdateCompany({ company, showCompanyUpdate }){
    const [ access, setAccess ] = useState(company.active)

    const handleUpdateCompany = (id) => {
        setAccess(!access)
        const dataForm = {
        }
        fetch(`/api/companies/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForm),
          })
          .then(resp => resp.json())
          .then(activeCompany => showCompanyUpdate(activeCompany))
    }

    return(
        <button 
            type="button" 
            className={(access ? "btn btn-primary" : "btn btn-danger")} 
            onClick={() => handleUpdateCompany(company.id)} 
            style={{fontWeight: "bold"}}>
            {access ? "Active Company" : "Inactive Company"}
       </button> 
    )
} 

