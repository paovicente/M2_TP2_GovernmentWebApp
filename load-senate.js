let copySenate = [...senate.results[0].members] //traigo los miembros del senate
console.log(copySenate[0]) //trae el primer miembro del senado

function setHeaders(senateTable,rowData){
    let headerName = document.createElement("th")
    let headerParty = document.createElement("th")
    let headerState = document.createElement("th")
    let headerYears = document.createElement("th")
    let headerVotes = document.createElement("th")

    headerName.innerHTML = "Name"
    headerParty.innerHTML = "Party"
    headerState.innerHTML = "State"
    headerYears.innerHTML = "Years in Office"
    headerVotes.innerHTML = "% Votes w/ Party"

    rowData.appendChild(headerName)
    rowData.appendChild(headerParty)
    rowData.appendChild(headerState)
    rowData.appendChild(headerYears)
    rowData.appendChild(headerVotes)

    senateTable.appendChild(rowData)
}

function createTable(copySenate){
  
    let senateTable = document.querySelector("#senate-data")

    let rowData = document.createElement("tr")
    //seteo los headers
    setHeaders(senateTable,rowData) 

    for (data of copySenate){
        rowData = document.createElement("tr")  //creo la fila

        let cellFullName = document.createElement("td") //creo la celda
        let linkName = document.createElement("a")      
        
        linkName.setAttribute("href", data.url); 
        let text = document.createTextNode(`${data.first_name} ${data.last_name}`)
        linkName.appendChild(text)  //le agrego el texto al link
        cellFullName.appendChild(linkName)  //agrego el link a la celda

        let cellParty = document.createElement("td")
        let cellState = document.createElement("td")
        let cellSeniority = document.createElement("td")
        let cellPercentage = document.createElement("td")

        cellParty.innerHTML = `${data.party}`
        cellState.innerHTML = `${data.state}`
        cellSeniority.innerHTML = `${data.seniority}`
        cellPercentage.innerHTML = `${data.votes_with_party_pct}%` 
        
        rowData.appendChild(cellFullName)
        rowData.appendChild(cellParty)
        rowData.appendChild(cellState)
        rowData.appendChild(cellSeniority)
        rowData.appendChild(cellPercentage)
                
        senateTable.appendChild(rowData)
    }
}

createTable(copySenate)