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

        field.appendChild(element); // puts to end (top)
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
    return Number(n.replace("px", ""));
};

function tick() {
    for (let thing of document.querySelectorAll("#field .thing")) {
        if (thing.dataset.despawn) {
            thing.dataset.despawn -= 1;
            if (thing.dataset.despawn <= 0) {
                thing.remove();
            }
        }
    }

    for (let duck of document.querySelectorAll("#field .duck")) {
        if (!duck.dataset.walkX && Math.random() < 0.25 / TPS) {
            duck.dataset.walkX = Math.random() * (bounds(field).width - bounds(duck).width) + bounds(field).minx;
            duck.dataset.walkY = Math.random() * (bounds(field).height - bounds(duck).height) + bounds(field).miny;
        }

        if (duck.dataset.walkX) {
            let normX = duck.dataset.walkX - num(duck.style.left);
            let normY = duck.dataset.walkY - num(duck.style.top);
            let len = Math.sqrt(normX * normX + normY * normY);

            normX /= len;
            normY /= len;

            normX *= Math.min(len, 50 / TPS);
            normY *= Math.min(len, 50 / TPS);

            if (normX < 0) {
                duck.querySelector('img').style.transform = 'scaleX(-1)';
            }
            else {
                duck.querySelector('img').style.transform = 'scaleX(1)';
            }

            duck.style.left = num(duck.style.left) + normX + "px";
            duck.style.top = num(duck.style.top) + normY + "px";

            if (Math.abs(num(duck.style.left) - duck.dataset.walkX) < 1 && Math.abs(num(duck.style.top) - duck.dataset.walkY) < 1) {
                delete duck.dataset.walkX;
                delete duck.dataset.walkY;
            }
        }
    }

    for (let thing of document.querySelectorAll("#field .thing:not(.controls)")) {
        if (thing.held) continue;
        thing.style.left = Math.max(bounds(field).minx, Math.min(num(thing.style.left), bounds(field).maxx - bounds(thing).width)) + "px";
        thing.style.top = Math.max(bounds(field).miny, Math.min(num(thing.style.top), bounds(field).maxy - bounds(thing).height)) + "px";
    }


    //spawn fih
    if (Math.random() < 0.025 / TPS) {
        let fih = document.createElement("div");
        fih.classList.add("thing");
        fih.classList.add("item");
        fih.classList.add("grab");
        fih.classList.add("fih");
        fih.innerHTML = '<img src="images/fih.png" width="100%">';
        field.appendChild(fih);

        const pond = document.querySelector("#field .pond");

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

    if (thing.classList.contains("duck") && overlaps(thing, duckStorage)) {
        itemToList(thing, document.querySelector('#duck-list>ul'));
        return;
    }

    if (thing.classList.contains("item")) {
        let near = nearest(thing);
        if (near && overlaps(thing, near) && near.classList.contains("duck")) {
            if (thing.dataset.type == "food") {
                near.style.width = bounds(near).width * 1.5 + "px";
                thing.remove();
            }
        }
    }

    if (thing.classList.contains("item") || thing.classList.contains("duck")) {
        console.log("item dropped on merge")
        if (overlaps(thing, mergeNode)) {
            let size = MERGE_ITEMS.length
            if (MERGE_ITEMS.filter(e => e != thing).length == size) {
                MERGE_ITEMS.push(thing)
            }
        }
        else {
            MERGE_ITEMS = MERGE_ITEMS.filter(e => e != thing)
            // merge.style.backgroundColor = "#00991200"
        }
        if (MERGE_ITEMS.length == 2) {
            // needs at least one duck??
            console.log("could merge")
            mergeNode.style.backgroundColor = "#009911"
            document.getElementById("merge-button").disabled = null
        } else {
            mergeNode.style.backgroundColor = "#9900bb"
        }
    }


    if (thing.dataset.name == "Hammer") {
        let near = nearest(thing);
        if (near && overlaps(thing, near)) {
            const ogHeight = num(near.style.height);
            near.style.transform = 'scaleY(0.5)';
            setTimeout(() => {near.style.transform = ''}, 1500);

            if (near.classList.contains('duck')) {
                delete near.dataset.walkX;
                delete near.dataset.walkY;
            }
        }
    }
}

function merge() {
    let item1 = MERGE_ITEMS[0]
    let item2 = MERGE_ITEMS[1]

    console.log(item1)
    console.log(item2)
}


//find nearest thing to [to]
function nearest(to) {
    let out = undefined;
    let bestDist = Infinity;


    let midx = bounds(to).midx;
    let midy = bounds(to).midy;

    for (let thing of document.querySelectorAll("#field .thing")) {
        if (thing == to) continue;

        let d = Math.sqrt(Math.pow(midx - bounds(thing).midx, 2) + Math.pow(midy - bounds(thing).midy, 2));

        if (d < bestDist) {
            out = thing;
            bestDist = d;
        }
    }

    return out;
};

//do two things overlap
function overlaps(a, b) {
    return (!(
        (bounds(a).minx > bounds(b).maxx || bounds(b).minx > bounds(a).maxx) ||
        (bounds(a).miny > bounds(b).maxy || bounds(b).miny > bounds(a).maxy)
    ));
};


let field;
function bounds(e) {
    return {
        minx: e.getBoundingClientRect().x,
        maxx: e.getBoundingClientRect().x + e.getBoundingClientRect().width,
        miny: e.getBoundingClientRect().y,
        maxy: e.getBoundingClientRect().y + e.getBoundingClientRect().height,
        width: e.getBoundingClientRect().width,
        height: e.getBoundingClientRect().height,
        midx: e.getBoundingClientRect().x + e.getBoundingClientRect().width * 0.5,
        midy: e.getBoundingClientRect().y + e.getBoundingClientRect().height * 0.5
    };
}



const TPS = 5;

let duckStorage;
let itemStorage;
let mergeNode;
window.addEventListener("load", (e) => {
    field = document.getElementById("field");
    duckStorage = document.getElementById("duck-storage");
    itemStorage = document.getElementById("item-storage");
    mergeNode = document.getElementById("merge-box");

    for (let grab of document.querySelectorAll(".grab")) {
        dragElement(grab);
    }

    setInterval(tick, 1000 / TPS);

});




