let user_inventory = [] 
let user_ducks = ["duck"]

const duck = {
    name: "name",
    image: "../images/duck.png",
    status: 5
}

const item = {
    name: "item name",
    image: "../images/seeds.png",
    count: 3
}

function listBuilder(items) {
    let toReturn = "<ul>"
    items.map(i => toReturn += "<li>" + i + "</li>")
    return toReturn + "</ul>"
}

function populateInventory(){
    for (let i = 0; i < 3; i++){
        user_inventory.push()
    }
}

function populateDucks(){
    for (let i = 0; i < 3; i++){
        user_ducks.push()
    }
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


const dragElement = (element) => {
    // Keeps track of the cursor's starting positions
    let shiftX = 0;
    let shiftY = 0;

    const dragMouseDown = (e) => {
        e.preventDefault(); // Prevents default browser text selection
        
        // Calculate the cursor position relative to the element's edges
        // This stops the element from "snapping" its top-left corner to your cursor
        shiftX = e.clientX - element.getBoundingClientRect().left;
        shiftY = e.clientY - element.getBoundingClientRect().top;

        // Attach listeners to the 'document' so dragging continues smoothly 
        // even if the user accidentally moves the mouse outside the element boundaries
        document.addEventListener('mousemove', elementDrag);
        document.addEventListener('mouseup', closeDragElement);
        element.style.cursor = 'grabbing';
    };

    const elementDrag = (e) => {
        e.preventDefault();
        
        // Calculate the new coordinates relative to the viewport
        let newX = e.clientX - shiftX;
        let newY = e.clientY - shiftY;

        // Apply the updated coordinates to the element styles
        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
    };

    const closeDragElement = () => {
        // Stop moving when mouse button is released by cleaning up the listeners
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('mouseup', closeDragElement);
        element.style.cursor = 'grab';
    };

    // Trigger the process when the user clicks down on the element
    element.addEventListener('mousedown', dragMouseDown);
};

window.onload = (e) => {
    console.log("window loaded")

    populateInventory()
    populateDucks()

    loadDucks()
    loadInventory()


    for (let duck of document.querySelectorAll(".duck")) {
        dragElement(duck);
        //duck.addEventListener("click", (e) => {
        // e.target.style.top = +e.target.style.top.replace("px","") + 10 + "px";
        // e.target.dataset.grabbed = true;
        //})
    }
    
};


