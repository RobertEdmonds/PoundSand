export default function Companies({companyList}){
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
                        </div>
                    </div>
                </div>
            )
          })}
          </div>
        </div>
    )
}