const containerElmnt = document.getElementById("containerElmnt");
const serverID = 312216330604642305;


async function getRotoJSON() {

    // Fetch the data and return an array over user keys with img link values
    try {
        const data = await fetch(`https://zekial.io/rotorbot.json`);
        const allUsers = await data.json();

        let rotaryUsers = [];

        // Filter out users not in set server ID
        Object.entries(allUsers).forEach(element => {
            if(element[1].Guild === serverID) {
                rotaryUsers.push(
                    {
                        "name": element[0],
                        "imgLink": element[1].Link,
                    }
                );
            }
        });

        return rotaryUsers
        
        
    }

    catch(err) {
        console.error(err);
    }

}

async function createImageElmnts() {
    
    const userList = await getRotoJSON();
    let elmntArray = [];

    userList.forEach(user => {


        const elmnt = document.createElement("a");
        elmnt.setAttribute(`class`, `userImg`);
        elmnt.setAttribute(`href`, user.imgLink)
        elmnt.setAttribute(`id`, user.name);
        elmnt.innerHTML = `
            <img src="${user.imgLink}">
            <span class="caption">${user.name}</span>
        `;

        elmntArray.push(elmnt);

    });

    return elmntArray.sort();

}


function insertElements(elementsArray, container) {
    elementsArray.forEach(element => {
        container.insertAdjacentElement("beforeend", element);
    });
}

createImageElmnts().then(console.log);

createImageElmnts()
    .then(elements => {
        insertElements(elements, containerElmnt);
    });