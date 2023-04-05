function DownHole(){
    const handleDownHole = () => {
        const formData = {
            pounds: 1200,
            stage: "Blue",
            moisture: .05,
            site_id: 2
        }
        fetch(`/api/sand_useds`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then(resp => resp.json())
          .then(truck => console.log(truck))
    }
    return(
        <div>
            <button onClick={() => handleDownHole()}>Down Hole</button>
        </div>
    )
}

export default DownHole;