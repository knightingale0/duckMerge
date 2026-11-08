function itemToList(element, list) {
    let isDuck = element.classList.contains("duck");
    let kind = isDuck ? "duck" : "item";
    let fieldItems = isDuck ? FIELD_DUCKS : FIELD_ITEMS;
    let inventory = isDuck ? USER_DUCKS : USER_ITEMS;

    let index = fieldItems.findIndex(
        item => String(item.id) === String(element.dataset.id)
    );
    if (index === -1) return;

    let [item] = fieldItems.splice(index, 1);
    inventory.push(item);

    element.remove();

    loadInventory(isDuck ? "#duck-list" : "#item-list", inventory, kind);
    save();
}

function listItemToElement(id, kind) {
    let isDuck = kind === "duck";
    let inventory = isDuck ? USER_DUCKS : USER_ITEMS;
    let fieldItems = isDuck ? FIELD_DUCKS : FIELD_ITEMS;

    let index = inventory.findIndex(item => String(item.id) === String(id));
    if (index === -1) return;

    let [item] = inventory.splice(index, 1);
    fieldItems.push(item);

    let element = document.createElement("div");
    element.dataset.id = item.id;
    element.dataset.name = item.name;
    element.classList.add(...item.classes);

    let img = document.createElement("img");
    img.src = item.image;
    img.alt = "";
    element.appendChild(img);

    element.style.left = `${item.left}px`;
    element.style.top = `${item.top}px`;
    element.style.zIndex = item["z-index"] ?? 7;

    field.appendChild(element);

    // dragElement(element);
    loadInventory(isDuck ? "#duck-list" : "#item-list", inventory, kind);
    save();
}

function save(){
    console.log("saving all lists")
    localStorage.setItem("user_ducks", JSON.stringify(USER_DUCKS));
    localStorage.setItem("field_ducks", JSON.stringify(FIELD_DUCKS));
    localStorage.setItem("user_items", JSON.stringify(USER_ITEMS));
    localStorage.setItem("field_items", JSON.stringify(FIELD_ITEMS));
    localStorage.setItem("counter", JSON.stringify(COUNTER))
}
