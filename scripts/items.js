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
        element.style.zIndex = 1;
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
        element.style.zIndex = 0;

        onDrop(element);
    };

    // Trigger the process when the user clicks down on the element
    element.addEventListener('mousedown', dragMouseDown);
};


function num(n) {
    return Number(n.replace("px",""));
};

function tick() {
    for (let duck of document.querySelectorAll(".duck")) {
        //duck.style.left = pxtonum(duck.style.left)+10+"px";

        if (overlaps(duck, nearest(duck))) {
            duck.style.backgroundColor = "green";
        }
        else {
            duck.style.backgroundColor = "yellow";
        }
    }

    for (let thing of document.querySelectorAll(".thing")) {
        thing.style.left = Math.max(bounds(field).minx, Math.min(num(thing.style.left), bounds(field).maxx - bounds(thing).width))+"px";
        thing.style.top = Math.max(bounds(field).miny, Math.min(num(thing.style.top), bounds(field).maxy - bounds(thing).height))+"px";
    }
}

// called when a [thing] is dropped
function onDrop(thing) {
    if (thing.classList.contains("item") && overlaps(thing, itemList)) {
        itemToList(thing);
        console.log("detected overlap");
        return;
    }

    if (thing.classList.contains("item")) {
        let near = nearest(thing);
        if (near && overlaps(thing, near) && near.classList.contains("duck")) {
            if (thing.classList.contains("food")) {
                near.style.width = bounds(near).width*1.5 + "px";
            }

            thing.remove();
        }
    }
}


//find nearest thing to [to]
function nearest(to) {
    let out = undefined;
    let bestDist = Infinity;


    let midx = bounds(to).midx;
    let midy = bounds(to).midy;

    for (let thing of document.querySelectorAll(".thing")) {
        if (thing == to) continue;

        let d = Math.sqrt(Math.pow(midx-bounds(thing).midx,2) + Math.pow(midy-bounds(thing).midy,2));

        if (d < bestDist) {
            out = thing;
            bestDist = d;
        }
    }

    return out;
};

//do two things overlap
function overlaps(a,b) {
    return (!(
        (bounds(a).minx > bounds(b).maxx || bounds(b).minx > bounds(a).maxx) ||
        (bounds(a).miny > bounds(b).maxy || bounds(b).miny > bounds(a).maxy)
    ));
};


let field;
function bounds(e) {
    return {
        minx: e.getBoundingClientRect().x,
        maxx: e.getBoundingClientRect().x+e.getBoundingClientRect().width,
        miny: e.getBoundingClientRect().y,
        maxy: e.getBoundingClientRect().y+e.getBoundingClientRect().height,
        width: e.getBoundingClientRect().width,
        height: e.getBoundingClientRect().height,
        midx: e.getBoundingClientRect().x+e.getBoundingClientRect().width*0.5,
        midy: e.getBoundingClientRect().y+e.getBoundingClientRect().height*0.5
    };
}



let duckList;
let itemList;
window.addEventListener("load", (e) => {
    field = document.getElementById("field");
    duckList = document.getElementById("duck-list");
    itemList = document.getElementById("item-list");

    for (let grab of document.querySelectorAll(".grab")) {
        dragElement(grab);
    }

    setInterval(tick, 200);

});




