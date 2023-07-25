import UpdateCompany from "../forms/UpdateCompany";

export default function Companies({companyList, user, showCompanyUpdate}){
    

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
                            {user.boss  && user.username === "RobertEdmonds" && (
                              <UpdateCompany company={company} showCompanyUpdate={showCompanyUpdate}/>  
                            )}
                        </div>
                    </div>
                </div>
            )
          })}
          </div>
        </div>
    )
}