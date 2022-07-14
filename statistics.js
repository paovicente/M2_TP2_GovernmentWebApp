let documentTitle = document.title
let copyChamber

if (documentTitle === "Senate Attendance" || documentTitle === "Senate Loyalty")
    copyChamber = [...senate.results[0].members] //traigo los miembros del senate
else if (documentTitle === "House Attendance" || documentTitle === "House Loyalty")
    copyChamber = [...house.results[0].members]


//-----------------OBJECT
const statisticsObject = {
    "number_of_democrats": 0,
    "number_of_republicans": 0,
    "number_of_independents": 0,
    "votes_party_democrats_pct": 0,
    "votes_party_republicans_pct": 0,
    "votes_party_independents_pct": 0,
    "mostEngaged": [],
    "leastEngaged": [],
    "mostLoyalty": [],
    "leastLoyalty": []
}

//-----------------FUNCIONES 

function filterIdeology(ideology, copyChamber) {

    let ideologyMembers = copyChamber.filter(person => person.party === ideology)

    return ideologyMembers
}

function sumPercentages(arrayParty, propertyPercentage) {

    let sum = 0
    arrayParty.forEach(element => {
        if (element.votes_with_party_pct != undefined)
          sum += parseFloat(element.votes_with_party_pct)
    })
    statisticsObject[propertyPercentage] = parseFloat(sum.toFixed(2))

    return propertyPercentage
}

function averageParty(propertyPercentage, propertyQuantity){  
    let average = parseFloat((statisticsObject[propertyPercentage]/propertyQuantity).toFixed(2))
    statisticsObject[propertyPercentage] = average
    return average
}

function finalRow(bodyTable){
    
    let row = document.createElement("tr")

    let head = document.createElement("th")
    head.innerHTML = "Total"
    head.className += "bg-dark text-warning"
    row.appendChild(head)

    let cell = document.createElement("td")
    let sumPer = statisticsObject.number_of_democrats + statisticsObject.number_of_republicans + statisticsObject.number_of_independents
    cell.innerHTML = sumPer
    cell.className += "bg-secondary text-dark fw-bold"
    row.appendChild(cell)

    cell = document.createElement("td")

    let notZero = (statisticsObject.number_of_democrats != 0) + (statisticsObject.number_of_republicans != 0) + (statisticsObject.number_of_independents!=0)

    let averagesTotal = statisticsObject.votes_party_democrats_pct + statisticsObject.votes_party_republicans_pct 
    + statisticsObject.votes_party_independents_pct
    cell.innerHTML = (averagesTotal / notZero).toFixed(2) + "%"
    
    cell.className += "bg-secondary text-dark fw-bold"
    row.appendChild(cell)

    bodyTable.appendChild(row)
}

function generateTableIdeology(arrayParty, propertyPercentage, propertyQuantity, nameParty) {

    let average = 0.0

    let row = document.createElement("tr")

    let head = document.createElement("th")
    head.innerHTML = nameParty
    head.className += "bg-dark text-warning"
    row.appendChild(head)

    let cell = document.createElement("td")
    cell.innerHTML = propertyQuantity
    cell.className += "bg-secondary text-dark"
    row.appendChild(cell)

    cell = document.createElement("td")
    cell.className += "bg-secondary text-dark"
    if (propertyQuantity != 0) {   //para no hacer una division por cero
        propertyPercentage = sumPercentages(arrayParty, propertyPercentage)
        
        average = averageParty(propertyPercentage, propertyQuantity)
        
        cell.innerHTML = average + "%"
    } else
        cell.innerHTML = "0%"

    row.appendChild(cell)

    bodyTable.appendChild(row)

    if (nameParty === "Independents")//cambiar si quiero agregar mas filas y independents no fuera la última
        finalRow(bodyTable)
}

function generateInfoTableEngaged(propertyEngaged, typeTable){

    statisticsObject[propertyEngaged].forEach(element =>{
        let row = document.createElement("tr")

        let cell = document.createElement("td")   
        let linkName = document.createElement("a")   
          
        linkName.setAttribute("href", element.url); 
        linkName.className += "fw-bold"

        let text = document.createTextNode(`${element.first_name} ${element.last_name}`)

        linkName.appendChild(text)  //le agrego el texto al link
        cell.appendChild(linkName)  //agrego el link a la celda
        row.appendChild(cell)

        cell = document.createElement("td")
        if (element.missed_votes)
            cell.innerHTML = element.missed_votes
        else
            cell.innerHTML = 0

        row.appendChild(cell)

        cell = document.createElement("td")
        cell.innerHTML = element.missed_votes_pct
        row.appendChild(cell)

        if (typeTable === "least-table")
            bodyLeastEngaged.appendChild(row)
        else
            bodyMostEngaged.appendChild(row)
    })

}

function generateTableEngaged(copyChamber, typeTable, propertyEngaged){
    let chamber = copyChamber.map(element => element)
    
    chamber = chamber.filter(element => element.missed_votes_pct)
    
    let orderedByMissedVotes = chamber.sort(function orderByMissedVotes(person1, person2){

        return person1.missed_votes_pct - person2.missed_votes_pct  //least to greatest
    })
    
    let quantityElements = orderedByMissedVotes.length * 0.1 
    quantityElements = Math.ceil(quantityElements)
    
    if (typeTable === "most-table")
        statisticsObject[propertyEngaged] = orderedByMissedVotes.slice(0,quantityElements)
    else if (typeTable === "least-table"){
        statisticsObject[propertyEngaged] = orderedByMissedVotes.slice(orderedByMissedVotes.length-1-quantityElements,orderedByMissedVotes.length-1)
        statisticsObject[propertyEngaged] = statisticsObject[propertyEngaged].reverse()
    }
    
    generateInfoTableEngaged(propertyEngaged, typeTable)

}
//--------------------VARIABLES, CONSTANTES Y LLAMADOS A FUNCIONES
const democrats = filterIdeology("D", copyChamber)
const republicans = filterIdeology("R", copyChamber)
const independents = filterIdeology("ID", copyChamber)

statisticsObject.number_of_democrats = democrats.length
statisticsObject.number_of_republicans = republicans.length
statisticsObject.number_of_independents = independents.length

let bodyTable = document.querySelector(".bodyTable")

generateTableIdeology(democrats, "votes_party_democrats_pct", statisticsObject.number_of_democrats, "Democrats")
generateTableIdeology(republicans, "votes_party_republicans_pct", statisticsObject.number_of_republicans, "Republicans")
generateTableIdeology(independents, "votes_party_independents_pct", statisticsObject.number_of_independents, "Independents")

let bodyLeastEngaged = document.querySelector(".bodyLeastEngaged")
generateTableEngaged(copyChamber,"least-table","leastEngaged")

console.log(statisticsObject)
let bodyMostEngaged = document.querySelector(".bodyMostEngaged")
generateTableEngaged(copyChamber,"most-table","mostEngaged")
console.log(statisticsObject)