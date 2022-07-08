let documentTitle = document.title
let copyChamber

if (documentTitle === "Senate Data")
    copyChamber = [...senate.results[0].members] //traigo los miembros del senate
else if (documentTitle === "House Data")
    copyChamber = [...house.results[0].members]

function changeTable(copy){
  
    let chamberTable = document.querySelector(".bodyTable")
    let rowData
   
    chamberTable.innerHTML=""//reinicio la tabla
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
                    
        chamberTable.appendChild(rowData)
    }
}

function getStates(copy){

    let states = []

    for (data of copy){
        states.push(copy[copy.indexOf(data)].state) 
    }

    states = states.filter((element,index) =>{
        return states.indexOf(element) === index
    })
 
    states.sort()
    
    return states
}

function generateOptions(states){

    let selectStates = document.querySelector(".select-state")
    let item = document.querySelector(".default-option")

    item.className += "bg-dark text-warning"
    for (let state of states){
        item = document.createElement("option")

        item.classList.add("bg-dark")
        item.classList.add("option-state")

        item.classList.add("text-warning")
        item.setAttribute("value",state)

        let text = document.createTextNode(state)
        item.appendChild(text)

        selectStates.appendChild(item)
    }

}

function sameParty(element,isChecked){

    let flag = false
    let i = 0

    while (i < isChecked.length && flag == false){
        if (isChecked[i].value === element.party)
            flag = true
        i++
    }
    return flag
}

let checks = Array.from(document.querySelectorAll(".ideology"))

generateOptions(getStates(copyChamber))
let select = document.querySelector(".select-state")

let form = document.querySelector(".formCheck")
form.addEventListener('change',function(){
  
    let isChecked = checks.filter(element => element.checked === true)

    console.log(isChecked[0])
    let filteredByParty = copyChamber.filter(element => sameParty(element,isChecked)) 
    
    filteredByParty.sort(function(person1,person2){
        if (person1.party > person2.party)
            return 1
        else
            if (person1.party < person2.party)
                return -1
        return 0
    })

    console.log("len de filtered by party",filteredByParty.length,filteredByParty)
    changeTable(filteredByParty)
    
    if (select.value != "Select a State"){
        let filteredByState
        
        if (isChecked.length == 0)  //si no hay ninguno checkeado
            filteredByState = copyChamber.filter(person => person.state === select.value)
        else
            filteredByState = filteredByParty.filter(person => person.state === select.value)

            console.log("states: ",filteredByState.length)
        filteredByState = filteredByState.sort(function(person1,person2){
            if (person1.first_name > person2.first_name)
                return 1
            else
                if (person1.first_name < person2.first_name)
                    return -1
            return 0
        })

        changeTable(filteredByState)
    }
     
})




