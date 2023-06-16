let voiture = {
  marque: "Renault Twingo 3",
  fabrication: 2014,
  achat: "Fri Jul 31 2015",
  passagers: ["Audrey", "Lila", "unAutre"]
};

let content = document.querySelector("#content");

let paramList = document.createElement("ul");

for (const key of Object.keys(voiture)){
    const capitalKey = key.charAt(0).toUpperCase() + key.slice(1); 
    const value = voiture[key];
    let newLi = document.createElement("li");
    if (key == "passagers"){
        newLi.textContent = capitalKey + " :"
        let passagersList = document.createElement("ol");
        for(const el of value){
            let newEl = document.createElement("li");
            newEl.textContent = el;
            passagersList.append(newEl);
        }
        newLi.append(passagersList);
    }
    else{
        newLi.textContent = `${capitalKey} : ${value}`;
    }
    paramList.append(newLi);
}

content.append(paramList);