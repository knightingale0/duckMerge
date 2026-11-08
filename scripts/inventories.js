function itemToList(element) {
    console.log("item to list");

    let classNameString = element.className
    let top = element.style.top
    let left = element.style.left

    let elem = element.outerHTML


    element.remove();
}




function listItemToElement(item) {
    let elem = document.createElement('div');
    elem.classList.add(item.classList);
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