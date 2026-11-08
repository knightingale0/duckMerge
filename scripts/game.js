
let USER_DUCKS = []
let FIELD_DUCKS = []
let USER_ITEMS = []
let FIELD_ITEMS = []
let POND_ITEMS = []
let MERGE_ITEMS = []
// save gamestates (time, weather, acheivements/points)
let COUNTER = 0

function loadInventory(listID, savedItems, kind) {

    let itemList = document.querySelector(listID);
    itemList.replaceChildren();

    if (!savedItems.length) {
        itemList.textContent = kind === "duck" ? "No Ducks D:" : "No items D:";
        return;
    }

    let ul = document.createElement("ul");
    ul.className = "styled-list";

    for (let item of savedItems) {
        let li = document.createElement("li");
        li.dataset.id = item.id;

        let img = document.createElement("img");
        img.src = item.image;

        li.append(img, document.createTextNode(item.name));

        li.addEventListener("click", () => {
            listItemToElement(item.id, kind);
        });

        ul.appendChild(li);
    }

    itemList.appendChild(ul);
}

function renderFieldObjects(savedItems){

    for (let item of savedItems) {
        let div = document.createElement("div");
        div.className = "";
        for (let name of item.classes){
            div.className += " " + name
        }

        div.dataset.id = item.id;
        div.dataset.name = item.name;

        let img = document.createElement("img");
        img.src = item.image;

        div.appendChild(img);
        field.appendChild(div);
    }

}

function resetItems() {
    USER_ITEMS = []
    localStorage.setItem("user_items", JSON.stringify(USER_ITEMS))
    save()
    loadInventory("#item-list", USER_ITEMS, "item")
}

function resetDucks() {
    USER_DUCKS = []
    localStorage.setItem("user_ducks", JSON.stringify(USER_DUCKS))
    save()
    loadInventory("#duck-list", USER_DUCKS, "duck")
}

function resetAll() {
    USER_ITEMS = []
    USER_DUCKS = []
    COUNTER = 1
    save()
    loadInventory("#duck-list", USER_DUCKS, "duck")
    loadInventory("#item-list", USER_ITEMS, "item")
}

function newDuck(parent1, parent2) {
    let name = `Duck #${COUNTER}`
    let imagePath = "images/duck.png"
    let duck = {
        "id": COUNTER,
        "name": name,
        "image": imagePath,
        "status": 3,
        "parent1": parent1,
        "parent2": parent2,
        "classes": ["thing", "duck", "grab"],
        "top": 0,
        "left": 0,
        "z-index": 7
    }
    COUNTER++
    return duck
}

function newItem(name, imagePath, food) {
    let item = {
        "id": COUNTER,
        "name": name,
        "image": imagePath,
        "classes": ["thing", "item", "grab"],
        "top": 0,
        "left": 0,
        "z-index": 7
    }
    if (food) {
        item.classes.push("food");
    }
    COUNTER++
    return item
}

function generateNewDuck() {
    let duck = newDuck(-1, -1)
    if (!USER_DUCKS) {
        USER_DUCKS = []
    }
    USER_DUCKS.push(duck)
    save()
    loadInventory("#duck-list", USER_DUCKS, "duck")
}

function generateMoreSeeds() {
    let seeds = newItem("Seeds", "./images/plant1.png")
    if (!USER_ITEMS) {
        USER_ITEMS = []
    }
    USER_ITEMS.push(seeds)
    save()
    loadInventory("#item-list", USER_ITEMS, "item")
}

/**
 * Code that runs on page loading
 */
window.addEventListener("load", (e) => {
    console.log("window loaded")

    let localCounter = localStorage.getItem("counter")
    let counter = 0
    if (localCounter != "undefined" && localCounter != null) {
        counter = JSON.parse(localStorage.getItem("counter"))
    }
    COUNTER = counter

    let localDucks = localStorage.getItem("user_ducks")
    let localItems = localStorage.getItem("user_items")

    let user_ducks = []
    if (localDucks != "undefined") {
        user_ducks = JSON.parse(localStorage.getItem("user_ducks"))
    }
    let user_items = []
    if (localItems != "undefined") {
        user_items = JSON.parse(localStorage.getItem("user_items"))
    }

    USER_DUCKS = user_ducks
    USER_ITEMS = user_items

    if (USER_DUCKS == []) {
        console.log("no ducks, giving starter ducks...")
        USER_DUCKS = []
        USER_DUCKS.push(newDuck(-1, -1))
        USER_DUCKS.push(newDuck(-1, -1))
    }

    if (USER_ITEMS == []) {
        console.log("no inventory, giving starter items...")
        USER_ITEMS = []
        USER_ITEMS.push(newItem("Apple", "./images/apple.png", food = true))
        USER_ITEMS.push(newItem("Seeds", "./images/plant2.png"))
    }

    loadInventory("#duck-list", USER_DUCKS, "duck")
    loadInventory("#item-list", USER_ITEMS, "item")

    let localFieldDucks = localStorage.getItem("field_ducks")
    let localFieldItems = localStorage.getItem("field_items")

    let field_ducks = []
    if (localFieldDucks != "undefined") {
        user_ducks = JSON.parse(localStorage.getItem("field_ducks"))
    }
    let field_items = []
    if (localFieldItems != "undefined") {
        field_items = JSON.parse(localStorage.getItem("field_items"))
    }

    FIELD_DUCKS = field_ducks
    FIELD_ITEMS = field_items

    // renderFieldObjects(FIELD_DUCKS)
    // renderFieldObjects(FIELD_ITEMS)
});


