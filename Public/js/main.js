let btng = document.getElementById('gauche');
let btnd = document.getElementById('droite');
let btnA = document.getElementById('A');
let btnB = document.getElementById('B');

let ecranC = document.getElementsByClassName('combat')[0]
let ecranV = document.getElementsByClassName('victoire')[0]
let ecranD = document.getElementsByClassName('defaite')[0]


let zoneT = document.getElementById('comb')

let choixatt = document.querySelector('.att')
choixatt.style.borderColor = "red"
let loop = choixatt.parentNode;


btnd.addEventListener('click', function next() {
    choixatt.style.borderColor = "black"
    if (choixatt != loop.lastElementChild) {
        choixatt = choixatt.nextElementSibling
    } else {
        choixatt = loop.firstElementChild
    }
    choixatt.style.borderColor = "red"
})
btng.addEventListener('click', function prec() {
    choixatt.style.borderColor = "black"
    if (choixatt != loop.firstElementChild) {
        choixatt = choixatt.previousElementSibling
    } else {
        choixatt = loop.lastElementChild
    }
    choixatt.style.borderColor = "red"
})

import {
    Pokemon,
    Capacite
} from "./module/class.js";

let charge = new Capacite('charge', 40, 35, 100, 'physique', 'normale', 'none');
let hypnose = new Capacite('Hypnose', 0, 20, 70, 'statut', 'psy', 'sommeil');
let vibrobscur = new Capacite('Vibrobscur', 80, 15, 100, 'speciale', 'tenebre', 'peur')
let cauchemard = new Capacite('Cauchemard', 0, 15, 100, 'statut', 'spectre', 'statut')
let choc_venin = new Capacite('Choc venin', 65, 10, 100, 'speciale', 'poison', 'poison')
let lame_d_air = new Capacite("Lame d'air", 75, 15, 95, 'speciale', 'vol', 'peur')
let pouv_lun = new Capacite("Pouvoir lunaire", 95, 15, 95, 'speciale', 'fee', 'none')
let voeu = new Capacite('Voeu', 0, 10, 100, 'statut', 'normal', 'soin')
let extrasenseur = new Capacite('Extrasenseur', 80, 20, 100, 'speciale', 'psy', 'peur')


let ectoplasma = new Pokemon('Ectoplasma', 50, 150, 100, 95, 165, 110, 145, ['spectre', 'poison'], 'none', 100, [hypnose, cauchemard, vibrobscur, choc_venin]);
let togekiss = new Pokemon('Togekiss', 50, 175, 85, 130, 155, 150, 115, ['fée, vol'], 'none', 100, [lame_d_air, charge, pouv_lun, extrasenseur]);
console.log(ectoplasma);
console.log(togekiss);


let listeAtt = document.querySelectorAll('.att')
var i = 0;
listeAtt.forEach(element => {
    element.firstChild.innerHTML = ectoplasma.capacite[i].nom;
    element.lastChild.innerHTML = ectoplasma.capacite[i].pp + ' pp';
    i++
});
console.log(listeAtt)


const vieiniT = togekiss.Pv;
let vietotT = document.querySelector('.ennemi i:last-child')
vietotT.innerHTML = `${togekiss.Pv}/${vieiniT} PV`

const vieiniE = ectoplasma.Pv;
let vietotE = document.querySelector('.nous i:last-child')
vietotE.innerHTML = `${ectoplasma.Pv}/${vieiniE} PV`
let barreT = document.getElementsByClassName('Toge')[0]
let barreE = document.getElementsByClassName('Ecto')[0]


function Vie() {
    if (togekiss.Pv < 0) {
        togekiss.Pv = 0
    }
    if (ectoplasma.Pv < 0) {
        ectoplasma.Pv = 0
    }
    vietotT.innerHTML = `${togekiss.Pv}/${vieiniT} PV`;
    vietotE.innerHTML = `${ectoplasma.Pv}/${vieiniE} PV`
    barreT.value = `${(togekiss.Pv/vieiniT)*100}`
    barreE.value = `${(ectoplasma.Pv/vieiniE)*100}`
}

function combat(vous, ennemi) {
    let poke1;
    let poke2;
    ennemi.choix = ennemi.capacite[Math.floor(Math.random() * ennemi.capacite.length)]
    console.log(ennemi.choix);

    if (vous.Vitesse > ennemi.Vitesse) {
        poke1 = vous;
        poke2 = ennemi;
    } else {
        poke1 = ennemi;
        poke2 = vous;
    }

    let x = poke1.Degat(poke2, poke1.choix); //changer capa par this.choix dans fct

    if (poke1 == vous && poke2.Pv <= 0) {
        ecranC.style.display = "none";
        ecranV.style.display = "block";
        
    } else if (poke1 == ennemi && poke2.Pv <= 0) {

        ecranC.style.display = "none";
        ecranD.style.display = "block";
    }

    let y = poke2.Degat(poke1, poke2.choix)
    
    if (ecranC.style.display != "none") {
        if (poke2 == vous && poke1.Pv <= 0) {
            ecranC.style.display = "none";
            ecranV.style.display = "block";
        } else if (poke2 == ennemi && poke1.Pv <= 0) {

            ecranC.style.display = "none";
            ecranD.style.display = "block";
        }
    }
    zoneT.innerHTML = x + ' et ' + y;
    console.log(x)
    console.log(togekiss);
    console.log(y);
    console.log(ectoplasma)
    Vie()
    i = 0
    listeAtt.forEach(element => {
        element.lastChild.innerHTML = ectoplasma.capacite[i].pp + ' pp';
        i++
    });

}


btnA.addEventListener('click', function turn() {
    i = 0
    listeAtt.forEach(element => {
        if (choixatt == element) {
            ectoplasma.choix = ectoplasma.capacite[i]
        }
        i++
    })

    combat(ectoplasma, togekiss)
});