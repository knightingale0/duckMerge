let user_inventory = { "normal duck food": 1 }
let user_ducks = ["duck"]

function listBuilder(items) {
    let toReturn = "<ul>"
    items.map(i => toReturn += "<li>" + i + "</li>")
    return toReturn + "</ul>"
}

function loadDucks() {
    let duckList = document.getElementById("duck-list");
    duckList.innerHTML = duckList.innerHTML + listBuilder(user_ducks)
}

function loadInventory() {
    let inventory = document.getElementById("inventory")
    let inv_list = []

    Object.keys(user_inventory).forEach(function (e) {
        inv_list.push(e + " - " + user_inventory[e]);
    });
    inventory.innerHTML = inventory.innerHTML + listBuilder(inv_list)
}


window.onload = (e) => {
    console.log("window loaded")
    loadDucks()
    loadInventory()


    for (let duck of document.querySelectorAll(".duck")) {
        duck.addEventListener("click", (e) => {
        e.target.style.top = +e.target.style.top.replace("px","") + 10 + "px";
    })}
    
};


