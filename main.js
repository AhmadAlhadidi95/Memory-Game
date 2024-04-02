overLays()

let yourTime = document.querySelector(".timer b")
let yourTries = document.querySelector(".tries b")
let allCards = document.querySelectorAll("section .card-box")

let duration = 1000
let countdown

document.querySelector(".overLay input[type='button']").addEventListener("click", function () {
    
    let enterName = prompt(`Enter your name`)
    let theNameIs = document.querySelector(".user b")
    
    enterName == null || enterName == "" ? theNameIs.innerHTML = `Player` : theNameIs.innerHTML = enterName

    localStorage.length == 0 ? document.querySelector(".bestTries").style.display = "none" : null

    mainRoom()

    countdown = setInterval(() => {yourTime.innerHTML = parseInt(yourTime.textContent) + 1}, duration)

    document.getElementById("music").play()

    document.querySelector(".overLay").remove()
    
})


function mainRoom() {

    document.getElementById("name").innerHTML = localStorage.getItem("name")
    document.getElementById("tries").innerHTML = localStorage.getItem("topTries")
    document.getElementById("seconds").innerHTML = localStorage.getItem("topSeconds")

    let arrayOfCardsKeys = [...allCards.keys()]

    shuffle(arrayOfCardsKeys)

    allCards.forEach((card, i) => {

        card.style.order = arrayOfCardsKeys[i]

        card.addEventListener("click", () => {flipped(card)})

    })

}

function flipped(theCard) {

    theCard.classList.add("flipped")

    let onlyFlippedCards = document.querySelectorAll("section .flipped")

    if (onlyFlippedCards.length === 2) {
        
        document.querySelector("section").style.pointerEvents = "none"

        setTimeout(() => {document.querySelector("section").style.pointerEvents = "painted"}, duration)

        matchedOrNot(onlyFlippedCards[0], onlyFlippedCards[1])

        overLays(false)
        
    }

}

function matchedOrNot(firstCard, secondCard) {

    if (firstCard.dataset.tech === secondCard.dataset.tech) {
        
        firstCard.classList.remove("flipped")
        secondCard.classList.remove("flipped")

        firstCard.classList.add("matched")
        secondCard.classList.add("matched")

        document.getElementById("success").play()

    } else {

        setTimeout(() => {

            firstCard.classList.remove("flipped")
            secondCard.classList.remove("flipped")

        }, duration)

        yourTries.innerHTML = parseInt(yourTries.textContent) + 1

    }

}

function shuffle(array) {
    // Setting the variables
    let currentNumber = array.length,
        stashNumber,
        randomNumber
    // While current number bigger than 0
    while (currentNumber > 0) {
        // Choice random number Between 0 and 23
        randomNumber = Math.floor(Math.random() * currentNumber)
        // Decrease current number
        currentNumber--
        // hide the current number in the stash. For example: the hide number is 7
        stashNumber = array[currentNumber]
        // Make the currunt number is the random number. For example: the current number is 4
        array[currentNumber] = array[randomNumber]
        // Now, change the random number with that in the stash. For example: 4 with 7
        array[randomNumber] = stashNumber
    }
    // Make return to the array
    return array
}

function overLays(theState = true) {

    if (theState) {
        
        let startOverLay = document.createElement("div")
        startOverLay.className = `overLay`
    
        let startButton = document.createElement("input")
        startButton.type = "button"
        startButton.value = "Start the game"
    
        startOverLay.appendChild(startButton)
    
        document.body.prepend(startOverLay)
        
    } else {
        
        if (document.querySelectorAll("section .matched").length === allCards.length) {

            clearInterval(countdown)

            if (localStorage.length == 0) {

                localStorage.setItem("name", document.querySelector(".user b").textContent)
                localStorage.setItem("topTries", yourTries.textContent)
                localStorage.setItem("topSeconds", yourTime.textContent)
                
            } else if (parseInt(yourTries.textContent) <= parseInt(localStorage.getItem("topTries")) && parseInt(yourTime.textContent) <= parseInt(localStorage.getItem("topSeconds"))) {
                
                localStorage.setItem("name", document.querySelector(".user b").textContent)
                localStorage.setItem("topTries", yourTries.textContent)
                localStorage.setItem("topSeconds", yourTime.textContent)

            }
            
            Swal.fire({

                imageUrl: `/images/win.png`,
                title: `Good for you`,
                text: `You won, with ${yourTries.textContent} tries and ${yourTime.textContent} seconds`,
                confirmButtonText: `Do you want to play again?`,
                confirmButtonColor: `#0b5c0d`,

            }).then(result => {result.isConfirmed ? addEventListener("click", () => {location.reload()}) : null})
        }

    }

}