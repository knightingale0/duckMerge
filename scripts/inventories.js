function itemToList(element, list) {
    console.log("item to list");

    let listItem = document.createElement("li");
    listItem.innerHTML = `<p>${element.dataset.name}</p>`;
    listItem.appendChild(element);
    element.display = 'none';
    list.appendChild(listItem);

    element.remove();
}




function listItemToElement(item) {
    let elem = document.createElement('div');
    elem.classList = item.classList;
    elem.width = item.width;
    elem.height = item.height;
    elem.left = item.left;
    elem.top = item.top;
    elem.dataset = item.dataset;

    let img = document.createElement('img');
    img.src = item.image;
    img.width = "100%";
    img.height = "100%";
    elem.appendChild(img);

    field.appendChild(elem);
}