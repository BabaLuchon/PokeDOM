export {
    Pokemon,
    Capacite
}

class Pokemon {
    constructor(Nom, niveau, Pv, Attaque, Defence, Attaquespe, Defencespe, Vitesse, type, statut, esquive, capacite) {
        this.Nom = Nom,
            this.niveau = niveau,
            this.Pv = Pv,
            this.Attaque = Attaque,
            this.Defence = Defence,
            this.Attaquespe = Attaquespe,
            this.Defencespe = Defencespe,
            this.type = type,
            this.statut = statut,
            this.Vitesse = Vitesse,
            this.esquive = esquive,
            this.capacite = capacite,
            this.choix = null,
            this.Degat = (ennemi, capa) => {  //mettre à capacité ?
                if (capa.pp <= 0) {
                    return `${capa.nom} n'a plus de pp`
                } else {
                    let x = Math.floor(Math.random() * 100);
                    
                    capa.pp -= 1
                    if (x <= capa.precision / (ennemi.esquive / 100)) {
                        //inserer fct de tableau des types
                        if (capa.categorie == 'speciale') {
                            ennemi.Pv -= Math.floor((((((this.niveau * 2 / 5) + 2) * capa.degat * this.Attaquespe / 50) / ennemi.Defencespe) + 2) * Math.floor((Math.random() * 15) + 85) / 100);
                            return `${capa.nom} inflige des dégat à ${ennemi.Nom}`;
                        } else if (capa.categorie == 'physique') {
                            ennemi.Pv -= Math.floor((((((this.niveau * 2 / 5) + 2) * capa.degat * this.Attaque / 50) / ennemi.Defence) + 2) * Math.floor((Math.random() * 15) + 85) / 100);
                            return `${capa.nom} inflige des dégat à ${ennemi.Nom}`
                        } // else statut
                    } else {
                        return `${ennemi.Nom} à esquivé l'attaque`;
                    }
                }
            }
    }
}

class Capacite {
    constructor(nom, degat, pp, precision, categorie, type, effet) {
        this.nom = nom,
            this.degat = degat,
            this.precision = precision,
            this.categorie = categorie,
            this.type = type,
            this.effet = effet,
            this.pp = pp
    }
}