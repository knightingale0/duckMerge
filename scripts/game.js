
let USER_DUCKS = []
let FIELD_DUCKS = []
let USER_ITEMS = []
let FIELD_ITEMS = []
// save gamestates (time, weather, acheivements/points)
let COUNTER = 1
let raw_names = `Matilda Carson
Ares Perry
Clara Hodges
Alonzo Santana
Myra Roman
Kian Franco
Charleigh Garner
Sage Moreno
Mary Escobar
Zachariah Sierra
Marceline Rosales
Wilder Gill
Jordan Castro
Jasper Donaldson
Natasha Faulkner
Jabari Villalobos
Zoya Potts
Alfred Brennan
Elodie Schaefer
Ishaan Taylor
Sofia Meyer
Tristan Bruce
Princeton Solis
Miracle Browning
Rohan Walsh
Leia Bean
Mccoy Harvey
Nicole Whitehead
Zayd Strickland
Riley Donaldson
Natasha Ortega
Kobe Malone
Skyler Cameron
Rayan Lester
Averi Conway
Orlando Guevara
Teresa Mercado
Abram Reyes
Audrey Willis
Remington Berger
Laylah Craig
Odin Coleman
Julia Cain
Benson Stark
Kamilah McConnell
London Palmer
Juniper Harrell
Nelson Vega
Dakota Carson
Ares Bennett
Josephine Underwood
Reece Nava
Scout Serrano
Milan Bell
Melody Bentley
Randy Green
Zoe Peterson
Santiago Rubio
Hadassah Villanueva
Huxley Frye
Raya Marin
Aldo Terry
Wren Sloan
Ocean Harvey
Nicole Nava
Stefan Cameron
Julie McCarty
Blaise Vo
Artemis Marsh
Bo Moss
Bianca Le
Damien Mays
Denisse Truong
Ayan Singh
Vivienne Dudley
Colter Mahoney
Promise Barr
Harley Dickson
Emmalynn Terry
Armani Brock
Jada Rivera
Charles Santos
Alana Sierra
Dayton Gray
Sarah Lucero
Felipe English
Kelly Hayden
Leroy Ray
Ruth York
Leandro Chavez
Nevaeh Donaldson
Canaan Jackson
Avery Schroeder
Izaiah Bentley
Jaylin Pope
Gunnar Franco
Charleigh Curtis
Muhammad Munoz
Kehlani Foley
Mohammad Reilly
Tori Gregory
Travis Osborne
Shelby Berger
Byron Ballard
Alejandra Daugherty
Turner McCall
Kai Malone
Ruben Hardy
Jessica Pitts
Jillian Flores
Lincoln Pennington
Yareli Pope
Gunnar Li
Paige Gentry
Magnus Decker
Aleena Bruce
Uriah Franklin
Angela Farrell
Ty Chapman
Zuri Shields
Devon McFarland
Annika Tyler
Emmitt Tucker
Esther Pennington
Bobby Lyons
Kenzie Quintana
Kelvin Carroll
Zara James
Jaxson Ball
Abby Marshall
Kaiden Singleton
Malaysia Sutton
Warren Roberts
Paisley Montgomery
Maximiliano Perkins
Sage Suarez
Soren Henderson
Maria Mathews
Jamir Haley
Addilynn Montgomery
Maximiliano Garcia
Amelia Collins
Miles Luna
Journey Morton
Roland Mullins
Maliyah Arnold
Abraham Estes
Brittany Barnett
Stephen Chapman
Zuri Salgado
Trace Palacios
Bria Patrick
Derrick Reeves
Lana Greer
Koda Peterson
Caroline Buck
Jon Reese
Rosemary Grimes
Harlan Schultz
Briella Travis
Willie Jensen
Jane Newman
Anderson Padilla
Maggie Solis
Ronin Fletcher
Anaya Lee
Jack Hamilton
Mackenzie Avalos
Coen Strickland
Nia Weeks
Anders Ellison
Raina Gentry
Magnus Maxwell
Kyla Hawkins
Victor Miles
Alessandra Barnett
Stephen Foley
Zaylee Flynn
Kannon Parrish
Tiana Jaramillo
Riggs Todd
Zariah Ramos
Angel Pennington
Yareli Bernal
Eithan Branch
Luisa Hubbard
Forrest McCullough
Hana Rubio
Titan Grimes
Braelyn Hopkins
Ali Castillo
Eva Shaffer
Dexter Baker
Isla Middleton
Misael Lindsey
Colette Cruz
Ryan Gibbs
Carter Hill
Isaac Sandoval
Elsie Chan
Frank Bass
Zahra Vaughn
Remy Knox
Kallie Moyer
Ahmir Lang
Amirah Schwartz
Edwin Vo
Artemis Stanton
Zyair Gallegos
Ari Stevens
Zachary Reed
Valentina Ball
Shane Romero
Eliza Villalobos
Reuben Pham
Raelyn Miller
Benjamin Burnett
Emberly Rocha
Onyx Roach
Lyanna Mejia
Atticus Guevara
Teresa Parrish
Karsyn Rowe
Matilda Frost
Dario Escobar
Erin Moody
Ryland Reeves
Lana Ball
Shane Harris
Penelope Beck
Eduardo Medrano
Halle Alexander
Kingston Harrington
Legacy Stephens
Messiah Hughes
Samantha Christian
Ledger Blevins
Aila Trevino
Jaime Cortes
Lea Pruitt
Gatlin Case
Cleo Kramer
Kylan Butler
Athena Bowen
Trevor Wilkins
Amalia Valentine
Demetrius Daugherty
Magdalena Vo
Gordon Thornton
Haisley Rollins
Wes Sparks
Aisha Hester
Rene Cervantes
Aylin Frank
Braylen Banks
Cali Kent
Mekhi Villegas
Jessie Schroeder
Izaiah Baxter
Lara Lucero
Felipe Stout
Chana Estes
Hakeem English
Kelly Edwards
Adrian Ponce
Aileen Brown
Elijah Burton
Miriam Johnston
Felix Butler
Athena Heath
Lionel Kirk
Ellis Mora
Arturo Booker
Nataly Gordon
Karter Sawyer
Marina Pacheco
Erik Delgado
Alani Hopkins
Ali Ponce
Aileen Beil
Ariel Atkinson
Jazmin Hardin
Hassan Sosa
Cassandra McIntosh
Kristian Sims
Lena Huang
Ayaan Hudson
Kamila Ball
Shane Castro
Eloise Curtis
Muhammad Burnett
Emberly Nichols
Atlas Lynn
Samira Bass
Landen Fernandez
Amara Spencer
Ace Simmons`
let formatted_names = []

function loadDucks() {
    let duckList = document.getElementById("duck-list");
    let listString = "<ul class='styled-list'>"

    if (USER_DUCKS && USER_DUCKS.length > 0) {

        USER_DUCKS.map(duck => {
            let image = duck.split('"')[15]
            let name = duck.split('"')[1]
            let id = duck.split('"')[5]
            listString += `<li data-id="${id}" onclick="listItemToElementFromLI(this)"><img src='${image}'>${name}${duck}</li>`
        })

        duckList.innerHTML = listString
    } else {
        duckList.innerHTML = "<p>No Ducks D:</p>"
    }
    localStorage.setItem("user_ducks", JSON.stringify(USER_DUCKS))
    localStorage.setItem("counter", JSON.stringify(COUNTER))
}

function loadItems() {
    let itemList = document.getElementById("item-list");
    let listString = "<ul class='styled-list'>"

    if (USER_ITEMS && USER_ITEMS.length > 0) {
        USER_ITEMS.map(item => {
            let imagePath = item.split('"')[11]
            let name = item.split('"')[1]
            listString += `<li onclick="listItemToElementFromLI(this)"><img src='${imagePath}'>${name}${item}</li>`
        })
        itemList.innerHTML = listString
    } else {
        itemList.innerHTML = "<p>No items D:</p>"
    }
    localStorage.setItem("user_items", JSON.stringify(USER_ITEMS))
}

function resetItems() {
    USER_ITEMS = []
    localStorage.setItem("user_items", JSON.stringify(USER_ITEMS))
    loadItems()
}

function resetDucks() {
    USER_DUCKS = []
    localStorage.setItem("user_ducks", JSON.stringify(USER_DUCKS))
    loadDucks()
}

function resetAll() {
    USER_ITEMS = undefined
    USER_DUCKS = undefined
    COUNTER = 1
    localStorage.setItem("user_items", JSON.stringify(USER_ITEMS))
    localStorage.setItem("user_ducks", JSON.stringify(USER_DUCKS))
    localStorage.setItem("counter", JSON.stringify(COUNTER))
    loadDucks()
    loadItems()
}

function newDuck(parent1, parent2) {
    // let name = formatted_names[Math.random(297)+1]
    let name = `Duck #${COUNTER}`
    let imagePath = "images/duck.png"
    let duck = `<div data-name="${name}" data-status="3" data-id="${COUNTER}" data-parent1="${parent1}" data-parent2="${parent2}" class="thing duck grab" style="left: 0px; top: 0px; z-index: 7;"><img src="${imagePath}" alt=${name}></div>`
    COUNTER++
    return duck
}

function newItem(name, image, food) {
    let item
    if (food) {
        item = `<div data-name="${name}" data-type="food" class="thing item grab" style="left: 0px; top: 0px; z-index: 7; display: 'none'" data-id="${COUNTER}"><img src="${image}"></div>`
    } else {
        item = `<div data-name="${name}" "" class="thing item grab" style="left: 0px; top: 0px; z-index: 7; display: 'none'" data-id="${COUNTER}"><img src="${image}"></div>`
    }
    COUNTER++
    return item
}

function generateNewDuck() {
    let duck = newDuck(-1, -1)
    if (!USER_DUCKS) {
        USER_DUCKS = []
    }
    USER_DUCKS.push(duck)
    loadDucks()
}

function generateMoreSeeds() {
    let seeds = newItem("Seeds", "./images/plant1.png")
    if (!USER_ITEMS) {
        USER_ITEMS = []
    }
    USER_ITEMS.push(seeds)
    loadItems()
}

/**
 * Code that runs on page loading
 */
window.addEventListener("load", (e) => {
    console.log("window loaded")
    raw_names.split("\n").map(name => formatted_names.push(name))

    let localCounter = localStorage.getItem("counter")
    let counter = undefined
    if (localCounter != "undefined" && localCounter != null) {
        counter = JSON.parse(localStorage.getItem("counter"))
    }
    COUNTER = counter

    let localDucks = localStorage.getItem("user_ducks")
    let localItems = localStorage.getItem("user_items")

    let user_ducks = undefined
    if (localDucks != "undefined") {
        user_ducks = JSON.parse(localStorage.getItem("user_ducks"))
    }
    let user_items = undefined
    if (localItems != "undefined") {
        user_items = JSON.parse(localStorage.getItem("user_items"))
    }

    USER_DUCKS = user_ducks
    USER_ITEMS = user_items

    if (USER_DUCKS == undefined) {
        console.log("no ducks, giving starter ducks...")
        USER_DUCKS = []
        USER_DUCKS.push(newDuck(-1, -1))
        USER_DUCKS.push(newDuck(-1, -1))
    }

    if (USER_ITEMS == undefined) {
        console.log("no inventory, giving starter items...")
        USER_ITEMS = []
        USER_ITEMS.push(newItem("Apple", "./images/apple.png", food=true))
        USER_ITEMS.push(newItem("Seeds", "./images/plant2.png"))
        USER_ITEMS.push(newItem("Hammer", "./images/hammer.png"))
    }

    loadDucks()
    loadItems()
});


