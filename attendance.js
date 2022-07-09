let documentTitle = document.title
let copyChamber

if (documentTitle === "Senate Attendance")
    copyChamber = [...senate.results[0].members] //traigo los miembros del senate
else if (documentTitle === "House Attendance")
    copyChamber = [...house.results[0].members]

function filterIdeology(ideology,copyChamber){

    let ideologyMembers = copyChamber.filter(person => person.party === ideology)
    
    return ideologyMembers
}

function sumPercentages(personsParty){

    let sum = 0.0

    for (person of personsParty){
        if (person.votes_with_party_pct != undefined)
            sum += parseFloat(person.votes_with_party_pct)      
    }
    
    return parseFloat(sum.toFixed(2))   
}

function generateTableIdeology(democrats,republicans,independents,numParty){

    const nameParty = ["Democrats","Republicans","Independents"]
    let sumTotal = 0.0
    let averagesTotal = 0.0
    let quantityAverages = 0

    let bodyTable = document.querySelector(".bodyTable")

    for (party of nameParty){
        let row = document.createElement("tr")

        let head = document.createElement("th")
        head.innerHTML = party
        head.className += "bg-dark text-warning"
        row.appendChild(head)

        
        let cell = document.createElement("td")
        cell.innerHTML = numParty[nameParty.indexOf(party)]
        cell.className += "bg-secondary text-dark"
        row.appendChild(cell)

        sumTotal += numParty[nameParty.indexOf(party)]

        cell = document.createElement("td")
        cell.className += "bg-secondary text-dark"
        if (numParty[nameParty.indexOf(party)] != 0){   //para no hacer una division por cero
            let nameArray = party.toLowerCase()
            let sum = 0
            switch (nameArray){
                case "democrats": sum = sumPercentages(democrats)
                break;
                case "republicans": sum = sumPercentages(republicans)
                break;
                case "independents": sum = sumPercentages(independents)
                break;
                default:
                break;
            }
            //SEPARAR EN UNA FUNCION APARTE-------------------------
            let average = parseFloat((sum/numParty[nameParty.indexOf(party)]).toFixed(2))
            averagesTotal += average

            quantityAverages++
            //----------------------
            cell.innerHTML = average+"%"         
        }else
            cell.innerHTML = "0%"

        row.appendChild(cell)
        
        bodyTable.appendChild(row)
    }

    row = document.createElement("tr")

    head = document.createElement("th")
    head.innerHTML = "Total"
    head.className += "bg-dark text-warning"
    row.appendChild(head)

    cell = document.createElement("td")
    cell.innerHTML = sumTotal
    cell.className += "bg-secondary text-dark fw-bold"
    row.appendChild(cell)

    cell = document.createElement("td")
    cell.innerHTML = averagesTotal/quantityAverages + "%"
    cell.className += "bg-secondary text-dark fw-bold"
    row.appendChild(cell)

    bodyTable.appendChild(row)
}

const democrats = filterIdeology("D",copyChamber)
const republicans = filterIdeology("R",copyChamber)
const independents = filterIdeology("ID",copyChamber)

const numParty = [democrats.length,republicans.length,independents.length]

generateTableIdeology(democrats,republicans,independents,numParty)
