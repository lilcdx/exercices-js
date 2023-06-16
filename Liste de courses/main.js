let listeCourses = new Array();

function ajouter(produit) {
  if (produit != "") {
    listeCourses.push(produit);
    let ul = document.querySelector("ul");
    const newLi = document.createElement("li");
    newLi.id = produit +"_div";
    newLi.textContent = produit;
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.id =  produit + "_removeBtn";
    removeBtn.innerHTML =
      `<i class="fa-solid fa-circle-xmark" style="color: #7d1212;"></i>`;
    removeBtn.addEventListener("click", function () {
      console.log("Bouton appuyé");
      let produit = removeBtn.id.replace("_removeBtn", "");
      retirer(produit);
    });
    newLi.append(removeBtn);
    ul.append(newLi);
    afficher();
  }
}

function retirer(produit) {
  const index = listeCourses.indexOf(produit);
  if (index >= 0) {
    listeCourses.splice(index, 1);
    let prod_div = document.querySelector("#" + produit+"_div");
    prod_div.remove();
    afficher();
  } else {
    console.log(
      `ERREUR : Le produit ${produit} n'est pas présent dans la liste de courses`
    );
  }
}

function viderListe() {
  for (const produit of listeCourses){
    let prod_div = document.querySelector("#" + produit+"_div");
    prod_div.remove();
  }
  listeCourses = [];
  afficher();
}

function afficher() {
  console.log(
    `Il y a ${listeCourses.length} éléments dans la liste de courses.`
  );
  console.log(listeCourses);
}

ajouter("Fraises");
ajouter("Kiwi");
ajouter("Brosse");

let input = document.querySelector("#ajout");

const addBtn = document.querySelector("#addBtn");

addBtn.addEventListener("click", function () {
  ajouter(input.value);
  input.value = "";
});

const emptyBtn = document.querySelector("#emptyBtn");

emptyBtn.addEventListener("click", function () {
  viderListe();
});
