// LISTS (dictionary with id)
// - ducks in inventory
// - ducks in field
// - items in inventory
// - items in field
// - items in pond
// - items in merge box
// - gamestates (time, weather, acheivements/points)

let USER_DUCKS = []
let FIELD_DUCKS = []
let USER_ITEMS = []
let FIELD_ITEMS = []
let POND_ITEMS = []
let MERGE_ITEMS = []
let COUNTER = 1

function loadDucks() {
    let duckList = document.getElementById("duck-list");
    let listString = "<ul class='styled-list'>"

    if (USER_DUCKS && USER_DUCKS.length > 0) {

        USER_DUCKS.map(duck => {
            let image = duck.split('"')[15]
            let name = duck.split('"')[1]
            let id = duck.split('"')[5]
            listString += `<li data-id="${id}"><img class='inventory-icon' src='${image}'>${name}</li>`
        })

        duckList.innerHTML = listString
    } else {
        duckList.innerHTML = "<p>No Ducks D:</p>"
    }
    localStorage.setItem("user_ducks", JSON.stringify(USER_DUCKS))
    localStorage.setItem("counter", JSON.stringify(COUNTER))
}

function loadItems() {
    let itemList = document.getElementById("item-list");
    let listString = "<ul class='styled-list'>"

    if (USER_ITEMS && USER_ITEMS.length > 0) {
        USER_ITEMS.map(item => {
            let imagePath = item.split('"')[9]
            let name = item.split('"')[1]
            let id = item.split('"')
            listString += `<li><img class='inventory-icon' src='${imagePath}'>${name}</li>`
        })
        itemList.innerHTML = listString
    } else {
        itemList.innerHTML = "<p>No items D:</p>"
    }
    localStorage.setItem("user_items", JSON.stringify(USER_ITEMS))
}

function resetItems() {
    USER_ITEMS = []
    localStorage.setItem("user_items", JSON.stringify(USER_ITEMS))
    loadItems()
}

function resetDucks() {
    USER_DUCKS = []
    localStorage.setItem("user_ducks", JSON.stringify(USER_DUCKS))
    loadDucks()
}

function resetAll() {
    USER_ITEMS = undefined
    USER_DUCKS = undefined
    COUNTER = 1
    localStorage.setItem("user_items", JSON.stringify(USER_ITEMS))
    localStorage.setItem("user_ducks", JSON.stringify(USER_DUCKS))
    localStorage.setItem("counter", JSON.stringify(COUNTER))
    loadDucks()
    loadItems()
}

function newDuck(parent1, parent2) {
    let name = `Duck #${COUNTER}`
    let imagePath = "images/duck.png"
    let duck = `<div data-name="${name}" data-status="3" data-id="${COUNTER}" data-parent1="${parent1}" data-parent2="${parent2}" class="thing duck grab" style="left: 0px; top: 0px; z-index: 7;"><img src="${imagePath}"></div>`
    COUNTER++
    return duck
}

function newItem(name, image) {
    let item = `<div data-name="${name}" class="thing item grab" style="left: 0px; top: 0px; z-index: 7;" data-id="${COUNTER}"><img src="${image}"></div>`
    COUNTER++
    return item
}

function generateNewDuck() {
    let duck = newDuck(-1, -1)
    if (!USER_DUCKS) {
        USER_DUCKS = []
    }
    USER_DUCKS.push(duck)
    loadDucks()
}

function generateMoreSeeds() {
    let seeds = newItem("seeds", "./images/seeds.png")
    if (!USER_ITEMS) {
        USER_ITEMS = []
    }
    USER_ITEMS.push(seeds)
    loadItems()
}

/**
 * Code that runs on page loading
 */
window.addEventListener("load", (e) => {
    console.log("window loaded")

    let localCounter = localStorage.getItem("counter")
    let counter = undefined
    if (localCounter != "undefined" && localCounter != null) {
        counter = JSON.parse(localStorage.getItem("counter"))
    }
    COUNTER = counter

    let localDucks = localStorage.getItem("user_ducks")
    let localItems = localStorage.getItem("user_items")

    let user_ducks = undefined
    if (localDucks != "undefined") {
        user_ducks = JSON.parse(localStorage.getItem("user_ducks"))
    }
    let user_items = undefined
    if (localItems != "undefined") {
        user_items = JSON.parse(localStorage.getItem("user_items"))
    }

    USER_DUCKS = user_ducks
    USER_ITEMS = user_items

    if (USER_DUCKS == undefined) {
        console.log("no ducks, giving starter ducks...")
        USER_DUCKS = []
        USER_DUCKS.push(newDuck(-1, -1))
        USER_DUCKS.push(newDuck(-1, -1))
    }

    if (USER_ITEMS == undefined) {
        console.log("no inventory, giving starter items...")
        USER_ITEMS = []
        USER_ITEMS.push(newItem("Seeds", "./images/seeds.png"))
    }

    loadDucks()
    loadItems()
});


