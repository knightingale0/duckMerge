function itemToList(element, list) {
    console.log("item to list", element);

    let listItem = document.createElement("li");
    let image = element.childNodes[0]
    image.className = "inventory-icon"
    console.log(image)

    listItem.appendChild(image)

    listItem.innerHTML += `<button onclick='listItemToElementFromButton(this)'>click</button>${element.dataset.name}`;
    
    listItem.appendChild(element);
    console.log()
    element.style.display = 'none';
    list.appendChild(listItem);
}

function listItemToElementFromButton(button) {
    console.log("AGH");
    let elem = button.parentNode.querySelector('.thing');

    elem.style.display = 'block';
    field.appendChild(elem);
    button.parentNode.remove();
}

window.addEventListener("load", (e) => {

    // add an event listener so li elements in the inventory, when clicked, do the move thing

})