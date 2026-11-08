// LISTS (dictionary with id)
// - ducks in inventory
// - ducks in field
// - items in inventory
// - items in field
// - gamestates (time, weather, acheivements/points)
// 

let USER_DUCKS = []
let FIELD_DUCKS = []
let USER_ITEMS = []
let FIELD_ITEMS = []
// let TIME = 0
let COUNTER = 0

/**
 * sets the interior of the "duck list" sidebar to the user's ducks
 */
function loadDucks() {
    let duckList = document.getElementById("duck-list");
    let listString = "<ul class='styled-list'>"

    console.log("loading the following ducks: " + USER_DUCKS)
    if (USER_DUCKS) {

        USER_DUCKS.map(duck => {
            console.log("loading " + duck.name)
            listString += "<li><img class='inventory-icon' src=" + duck.image + "> " + duck.name + "</li>"
        })

        duckList.innerHTML = duckList.innerHTML + listString
    } else {
        duckList.innerHTML = "<p>No Ducks D:</p>"
    }
}

/**
 * sets the interior of the "inventory" sidebar to the user's inventory items
 */
function loadItems() {
    let itemList = document.getElementById("items-list");
    let listString = "<ul class='styled-list'>"

    console.log("loading the following ducks: " + USER_ITEMS)
    if (USER_ITEMS) {
        USER_ITEMS.map(item => {
            console.log("loading " + item.name)
            listString += "<li><img class='inventory-icon' src=" + item.image + "> " + item.name + " - " + item.count + "</li>"
        })
        itemList.innerHTML = itemList.innerHTML + listString
    } else {
        itemList.innerHTML = "<p>No items D:</p>"
    }
}

/**
 * Resets the user's inventory of items to "undefined" so it gets refilled on reload
 */
function resetItems() {
    USER_ITEMS = undefined
    localStorage.setItem("user_items", JSON.stringify(USER_ITEMS))
    loadItems()
}
/**
 * Resets the user's inventory of ducks to "undefined" so it gets refilled on reload
 */
function resetDucks() {
    USER_DUCKS = undefined
    localStorage.setItem("user_ducks", JSON.stringify(USER_DUCKS))
    loadDucks()
}

function newDuck(parent1, parent2) {
    let duck = {
        name: "Duck #" + COUNTER,
        image: "../images/duck.png",
        status: 3,
        id: COUNTER,
        parent1: parent1,
        parent2: parent2
    }
    COUNTER++
    return duck
}

/**
 * Code that runs on page loading
 */
window.addEventListener("load", (e) => {
    console.log("window loaded")

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
        console.log(USER_DUCKS)
    }

    if (USER_ITEMS == undefined) {
        console.log("no inventory, giving starter items...")
        USER_ITEMS = []
        USER_ITEMS.push({
            name: "food",
            image: "../images/seeds.png",
            count: 5
        })
        console.log(USER_ITEMS)
    }

    loadDucks()
    loadItems()
});


