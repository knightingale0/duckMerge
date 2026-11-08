function itemToList(element, list) {
    console.log("item to list");

    let listItem = document.createElement("li");

    // let button = document.createElement("button");
    // button.innerText = "click";
    // button.onclick = 'listItemToElementFromButton(this)';
    // // button.addEventListener('click', function(event) {
    // //     const button = event.currentTarget; 
    // //     listItemToElement(button.parentNode);
    // //     console.log("asdg");
    // // });
    // listItem.appendChild(button);

    listItem.innerHTML += `<button onclick='listItemToElementFromButton(this)'>click</button><p>${element.dataset.name}</p>`;
    
    
    
    listItem.appendChild(element);
    element.display = 'none';
    list.appendChild(listItem);
}


function listItemToElementFromButton(button) {
    console.log("AGH");
    let elem = button.parentNode.querySelector('.item');

    field.appendChild(elem);
    button.parentNode.remove();
}

function listItemToElement(item) {
    let elem = item.querySelector('.item');

    field.appendChild(elem);
    item.remove();
}