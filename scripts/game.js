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
let COUNTER = 1

/**
 * sets the interior of the "duck list" sidebar to the user's ducks
 * saves to local storage
 */
function loadDucks() {
    let duckList = document.getElementById("duck-list");
    let listString = "<ul class='styled-list'>"

    if (USER_DUCKS && USER_DUCKS.length > 0) {

        USER_DUCKS.map(duck => {
            listString += `<li><img class='inventory-icon' src='${duck.image}'>${duck.data?.name}</li>`
        })

        duckList.innerHTML = listString
    } else {
        duckList.innerHTML = "<p>No Ducks D:</p>"
    }
    localStorage.setItem("user_ducks", JSON.stringify(USER_DUCKS))
    localStorage.setItem("counter", JSON.stringify(COUNTER))
}

/**
 * sets the interior of the "inventory" sidebar to the user's inventory items
 * saves to local storage
 */
function loadItems() {
    let itemList = document.getElementById("item-list");
    let listString = "<ul class='styled-list'>"

    if (USER_ITEMS && USER_ITEMS.length > 0) {
        USER_ITEMS.map(item => {
            listString += `<li><img class='inventory-icon' src='${item.image}'>${item.data?.name} - ${item.data?.count}</li>`
        })
        itemList.innerHTML = listString
    } else {
        itemList.innerHTML = "<p>No items D:</p>"
    }
    localStorage.setItem("user_items", JSON.stringify(USER_ITEMS))
}

/**
 * Resets the user's inventory of items to "undefined" so it gets refilled on reload
 */
function resetItems() {
    USER_ITEMS = []
    localStorage.setItem("user_items", JSON.stringify(USER_ITEMS))
    loadItems()
}
/**
 * Resets the user's inventory of ducks to "undefined" so it gets refilled on reload
 */
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
    let duck = {
        classlist: "thing duck grab",
        width: "50px",
        height: "50px",
        left: "0px",
        top: "0px",
        image: "/images/duck.png",
        data: {
            name: "Duck #" + COUNTER,
            status: 3,
            id: COUNTER,
            parent1: parent1,
            parent2: parent2
        }
    }
    COUNTER++
    return duck
}

function generateNewDuck() {
    let duck = newDuck(-1, -1)
    if (!USER_DUCKS) {
        USER_DUCKS = []
    }
    USER_DUCKS.push(duck)
    loadDucks()
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
        USER_ITEMS.push({
            classlist: "thing item grab",
            width: "50px",
            height: "50px",
            left: "0px",
            top: "0px",
            image: "/images/seeds.png",
            data: {
                name: "Seeds",
                count: 3
            }
        })
    }

    loadDucks()
    loadItems()
});


