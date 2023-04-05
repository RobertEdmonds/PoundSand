// import { format } from 'date-fns'

function TruckLoad(){
    const handleTruckLoad = () => {
        const formData = {
            truck: "5440", 
            mine: "Blue",  
            tare_weight: 32399, 
            gross_weight: 99399, 
            ship_to: "texas", 
            po: "702000069", 
            site_id: 2
        }
        fetch(`/api/trucks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then(resp => resp.json())
          .then(truck => console.log(truck))
    }

    return(
        <button onClick={() => handleTruckLoad()}>Truck</button>
    )

}

export default TruckLoad;