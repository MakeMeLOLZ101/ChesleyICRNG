let previousNames = [];
const classedNames = document.getElementById('classNames');
const randomBtn = document.getElementById('randomBtn');
const historyList = document.getElementById('history-List');
const maxHistory = 5;

function loadNames(){
    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            names = data.names;
            randomBtn.disabled = false;
            classedNames.textContent = "Click button to get a name!";
        })
}

function generateRandomName(){
    if (names.length === 0) return;
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];
    classedNames.textContent = randomName;
    previousNames.unshift(randomName);
    if (previousNames.length > maxHistory){
        previousNames.pop();
    }
    
    updateHistory();
}

function updateHistory(){
    historyList.innerHTML = '';
    previousNames.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        historyList.appendChild(li);
    });
}

randomBtn.addEventListener('click', generateRandomName);

randomBtn.disabled = true;

loadNames();