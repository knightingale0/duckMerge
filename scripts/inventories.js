function itemToList(element) {
    console.log("item to list");

    let classNameString = element.className
    let top = element.style.top
    let left = element.style.left

    let elem = element.outerHTML

    element.remove();
}
