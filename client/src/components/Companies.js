export default function Companies({companyList, user, showCompanyDeletion}){
    // const handleDeleteCompany = (id) => {
    //     fetch(`/api/sites/${id}`, {
    //         method: "DELETE",
    //     }).then(() => {
    //         showCompanyDeletion(id)
    //     })
    // }

    return(
        <div className="container text-center">
        <div className="row">
        {companyList.map(company => {
            return(
                <div className="col" key={company.id}>
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">{company.name}</h5>
                            <h5 className="card-title">{company.code}</h5>
                            {/* {user.boss  && user.username === "RylanJohnson" && (
                                  <button 
                                    type="button" 
                                    className="btn btn-outline-primary" 
                                    onClick={() => handleDeleteCompany(company.id)} 
                                    style={{fontWeight: "bold"}}>
                                  Delete Company
                                  </button>
                                )} */}
                        </div>
                    </div>
                </div>
            )
          })}
          </div>
        </div>
    )
}