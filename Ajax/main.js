function onClickExecute() {
    let value = 0;
    document.querySelectorAll("input[name='what']").forEach((radio) => {
        if (radio.checked) {value = radio.value;}
    });
    switch(parseInt(value,10)){
        case 1:
            ajaxCallHtml('./data/1-get-html-article.html', ajaxGetHtml);
            break;
        case 2:
            ajaxCallJSON('./data/2-get-contacts-list.json', ajaxGetContactsJSON);
            break;
        case 3:
            ajaxCallHtml('./data/3-get-html-movies.html', ajaxGetHtml);
            break;
        case 4:
            ajaxCallJSON('./data/4-get-json-movies.json', ajaxGetFilmsJSON);
            break;    
    }
}

async function ajaxCallHtml(url, callback){
    const response = await fetch(url);
    if (response.ok == true){
        callback(response);
    }
    else {
        throw new Error('Impossible de se connecter au serveur');
    }
}

function ajaxGetHtml(response){
    response.text()
    .then(body => {document.querySelector("#target").innerHTML = body;})
}

async function ajaxCallJSON(url, callback){
    const response = await fetch(url);
    if (response.ok == true){
        callback(response);
    }
    else {
        throw new Error('Impossible de se connecter au serveur');
    }
}

function ajaxGetContactsJSON(response){
    document.querySelector("#target").innerHTML = ""
    response.json()
    .then(data => {
        data.forEach(element => {
            document.querySelector("#target").innerHTML += 
            `<p>Prénom : ${element.firstName}</p>
            <p>Téléphone : ${element.phone}</p>`;
        })
    })
}

function ajaxGetFilmsJSON(response){
    document.querySelector("#target").innerHTML = '<ul class="movie-list"></ul>'
    response.json()
    .then(data => {
        data.forEach(element => {
            document.querySelector("#target ul").innerHTML += 
            `<li>
            <img src="images/${element.cover}">
            <p>
              <strong>${element.title}</strong> -
              <em>${element.duration}</em>
            </p>
          </li>`;
        })
    })
}

document.querySelector("#run").addEventListener("click", onClickExecute);
