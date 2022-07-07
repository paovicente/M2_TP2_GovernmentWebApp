let copySenate = [...senate.results[0].members] //traigo los miembros del senate

function changeTable(copy){
  
    let senateTable = document.querySelector(".bodyTable")
    let rowData
   
    senateTable.innerHTML=""//reinicio la tabla
    for (data of copy){
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

let checks = Array.from(document.querySelectorAll(".ideology"))

function sameParty(senator,isChecked){

    let flag = false
    let i = 0

    while (i < isChecked.length && flag == false){
        if (isChecked[i].value === senator.party)
            flag = true
        i++
    }
    return flag
}

let form = document.querySelector(".formCheck")
form.addEventListener('change',function(){
  
    let isChecked = checks.filter(element => element.checked === true)
    let filteredByParty = copySenate.filter(senator => sameParty(senator,isChecked)) 
    
    filteredByParty.sort(function(senator1,senator2){
        if (senator1.party > senator2.party)
            return 1
        else
            if (senator1.party < senator2.party)
                return -1
        return 0
    })

    changeTable(filteredByParty)   
})

//en is checked van a estar aquellos valores que no hayan sido previamente seleccionados