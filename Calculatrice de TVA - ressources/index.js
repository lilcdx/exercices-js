function calculTVA(montant) {
  return montant * 0.2;
  20;
}

function calculTTC(montant) {
  return montant + calculTVA(montant);
}

let entry = prompt("Quel est le montant HT ?", "");
let parsed = parseInt(entry, 10);

let content = document.querySelector("#content");

const ht = parsed;
const tva = calculTVA(ht);
const ttc = calculTTC(ht);

let tvaP = document.createElement("p");
tvaP.textContent = `Pour un montant HT de ${ht} € il y a ${tva} € de TVA.`;
let ttcP = document.createElement("p");
ttcP.textContent = `Le montant TTC est de ${ttc} €.`;

content.append(tvaP);
content.append(ttcP);
