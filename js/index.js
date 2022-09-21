const monsterUrl = "http://localhost:3000"
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
    const back = document.getElementById("back");
    const forward = document.getElementById("forward");
    back.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            fetchMonsters();
        }
    });    
    forward.addEventListener("click", function () {
        currentPage++
        fetchMonsters();
    });
    fetchMonsters();
    createMonsterForm();
});

function fetchMonsters() {
    fetch(monsterUrl + "/monsters/?_limit=50&_page=" + currentPage)
        .then((resp) => resp.json())
        .then((monsters) => renderMonsters(monsters));
}

function renderMonsters(monsters) {
    const monsterContainer = document.getElementById("monster-container");
    while (monsterContainer.firstChild) {
        monsterContainer.removeChild(monsterContainer.firstChild);
    };
    monsters.forEach(monster => {renderMonster(monster.name,monster.age,monster.description)});
}

function renderMonster(monsterName,monsterAge,monsterDescription) {
    const monsterContainer = document.getElementById("monster-container");
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    h2.innerText = monsterName;
    h4.innerText = "Age: " + monsterAge;
    p.innerText = "Bio: " + monsterDescription;
    div.appendChild(h2);
    div.appendChild(h4);
    div.appendChild(p);
    monsterContainer.appendChild(div);
}

function createMonsterForm() {
    const createMonster = document.getElementById("create-monster");
    const form = document.createElement("form");
    const inputName = document.createElement("input");
    const inputAge = document.createElement("input");
    const inputDescription = document.createElement("input");
    const create = document.createElement("button");
    form.id = "monster-form";
    inputName.id = "name";
    inputName.placeholder = "name...";
    inputAge.id = "age";
    inputAge.placeholder = "age...";
    inputDescription.id = "description";
    inputDescription.placeholder = "description...";
    create.innerText = "Create";
    form.appendChild(inputName);
    form.appendChild(inputAge);
    form.appendChild(inputDescription);
    form.appendChild(create);
    createMonster.appendChild(form);
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        postMonster(inputName.value,inputAge.value,inputDescription.value);
        form.reset();
    })
}

function postMonster(name,age,description) {
    fetch(monsterUrl + "/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: parseFloat(age),
            description: description
        })
    })
}

