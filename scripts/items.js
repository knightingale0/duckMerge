const dragElement = (element) => {
    // Keeps track of the cursor's starting positions
    let shiftX = 0;
    let shiftY = 0;

    const dragMouseDown = (e) => {
        e.preventDefault(); // Prevents default browser text selection

        shiftX = e.clientX - element.getBoundingClientRect().left;
        shiftY = e.clientY - element.getBoundingClientRect().top;

        document.addEventListener('mousemove', elementDrag);
        document.addEventListener('mouseup', closeDragElement);
        element.style.cursor = 'grabbing';
        element.style.zIndex = 15;

        element.held = true;
        delete element.dataset.despawn;
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
        element.style.zIndex = 7;

        element.held = false;

        onDrop(element);
    };

    // Trigger the process when the user clicks down on the element
    element.addEventListener('mousedown', dragMouseDown);
};


function num(n) {
    return Number(n.replace("px",""));
};

function tick() {
    for (let thing of document.querySelectorAll(".thing")) {
        if (thing.dataset.despawn) {
            thing.dataset.despawn -= 1;
            if (thing.dataset.despawn <= 0) {
                thing.remove();
            }
        }
    }

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
        if (thing.held) continue;
        thing.style.left = Math.max(bounds(field).minx, Math.min(num(thing.style.left), bounds(field).maxx - bounds(thing).width))+"px";
        thing.style.top = Math.max(bounds(field).miny, Math.min(num(thing.style.top), bounds(field).maxy - bounds(thing).height))+"px";
    }

    //spawn fih
    if (Math.random() < 0.0025) {
        let fih = document.createElement("div");
        fih.classList.add("thing");
        fih.classList.add("item");
        fih.classList.add("grab");
        fih.classList.add("fih");
        fih.innerHTML = '<img src="images/fih.webp" width="100px">';
        field.appendChild(fih);

        const pond = document.querySelector(".pond");

        fih.style.left = bounds(pond).minx + Math.random() * (bounds(pond).width - bounds(fih).width) + "px";
        fih.style.top = bounds(pond).miny + Math.random() * (bounds(pond).height - bounds(fih).height) + "px";

        fih.dataset.despawn = 5 * TPS;
        fih.dataset.name = "FIH";

        dragElement(fih);
    }
    
}

// called when a [thing] is dropped
function onDrop(thing) {
    if (thing.classList.contains("item") && overlaps(thing, itemStorage)) {
        itemToList(thing, document.querySelector('#item-list>ul'));
        return;
    }

    if (thing.classList.contains("item")) {
        let near = nearest(thing);
        if (near && overlaps(thing, near) && near.classList.contains("duck")) {
            if (thing.dataset.type == "food") {
                near.style.width = bounds(near).width*1.5 + "px";
                thing.remove();
            }
        }
    }

    if (thing.classList.contains("item") || thing.classList.contains("duck")) {
        if (overlaps(thing, merge)){
            MERGE_ITEMS.push(thing)
            console.log(MERGE_ITEMS)
        }
        else {
            MERGE_ITEMS = MERGE_ITEMS.filter( e => e != thing)
            console.log(MERGE_ITEMS)
        }
    }
}

function tryMerge(){
    if (MERGE_ITEMS.length == 2){
        // needs at least one duck??
        console.log("could merge")
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



const TPS = 5;

let duckStorage;
let itemStorage;
window.addEventListener("load", (e) => {
    field = document.getElementById("field");
    duckStorage = document.getElementById("duck-storage");
    itemStorage = document.getElementById("item-storage");
    merge = document.getElementById("merge-box");

    for (let grab of document.querySelectorAll(".grab")) {
        dragElement(grab);
    }

    setInterval(tick, 1000 / TPS);

});




