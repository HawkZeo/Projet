// Classe statique permettant de contrôler les données saisies côté client
//
// Fichier : js/class.controle.js
// Version : 2018.8
// Auteur : Guy Verghote
// Date mise à jour : 19/03/2018
//

// un objet de la classe Controle contient la valeur à contrôler
// trois méthodes permettent de réaliser les vérifications
// estRenseigne qui vérifie que la valeur est renseignée
// estVide qui retourne vrai si la valeur n'est pas renseigné
// respecterLeFormat("format") qui vérifie si la valeur respecte le format standard passé en paramètre
// Les différents formats sont :
//    'login': une lettre suivi de lettre ou de chiffre
//    'nom': une lettre suivi de lettres d'espace, de tiret et d'apostrophe le tout se terminant par une lettre
//    'email', 'entier', 'chiffre', 'reel', 'telephone', 'url'
//    'dateFr', 'dateMysql'
//    'temps':  [hh]:mm:ss autres séparateurs . ou ,
//    'motPasse' ou 'password' :: controle la validité d'un mot de passe selon les règles suivantes
//  	au moins 8 caractères
// 		au moins une lettre majuscule
// 		au moins une lettre minuscule
// 		au moins un chiffre
// 		au moins un caractère spécial dans la liste

class Controle {

    constructor(uneValeur) {
        this.valeur = uneValeur.trim() || "";
    }

    estRenseigne() {
        return this.valeur.length !== 0;
    }

    estVide() {
        return this.valeur.length === 0;
    }


    /*
     * Contrôle si la valeur du champ respecte le motif accepté par ce champ
     * la fonction est bloquante : si le type n'existe pas la fonction retourne faux ce qui bloque la validation
     * paramètre
     *   unFormat : Format à respecter
    */

    respecterLeFormat(unFormat) {
        let regex = '';
        let tab = [];
        let correct = false;
        switch (unFormat) {
            case 'login':
                correct = /^[A-Za-z]+[0-9a-zA-Z]*$/.test(this.valeur);
                break;
            case 'nom':
                correct = /^[a-zA-Z]+[a-zA-Z' -]*[a-zA-z]$/.test(this.valeur);
                break;
            case 'email':
                correct = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*[\.][a-zA-Z]{2,4}$/.test(this.valeur);
                break;
            case 'entier':
                correct = /^[-+]?[0-9]+$/.test(this.valeur);
                break;
			case 'chiffre':
                correct = /^[0-9]+$/.test(this.valeur);
                break;
            case 'reel':
                correct = /^[-+]?[0-9]+(\.[0-9]+)?$/.test(this.valeur);
                break;
            case 'tel':
                correct = /^([0][1-9]([\.\_\/\-\s]?[0-9]{2}){4})?$/.test(this.valeur);
                break;
            case 'dateFr':
                tab = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(this.valeur);
                correct = !(tab == null);
                if (correct) {
                    correct = Controle.dateValide(tab[1], tab[2], tab[3]);
                }
                break;
            case 'dateMysql':
                tab = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/.exec(this.valeur);
                correct = !(tab == null);
                if (correct) {
                    correct = Controle.dateValide(tab[3], tab[2], tab[1]);
                }
                break;
            case 'temps' : // [hh]:mm:ss autres séparateurs . ou ,
                correct = /^([0-9]{1,2}[.,:]?)?[0-5][0-9][.,:]?[0-5][0-9]$/.test(this.valeur);
                break;
            case 'url':
                // correct = /^http(s)?:\/\/[0-9a-zA-Z\-\_.]+([.0-9a-zA-Z\-\_])?[.][a-zA-Z]{2,4}/.test(this);
                correct = /^((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/.test(this);
                break;
            case 'motPasse' :
                // au moins 8 caractères
                let condition1 = this.valeur.length >= 8;
                // au moins une lettre majuscule
                let condition2 = /[A-Z]+/.test(this.valeur);
                // au moins une lettre minuscule
                let condition3 = /[a-z]+/.test(this.valeur);
                // au moins un chiffre
                let condition4 = /[0-9]+/.test(this.valeur);
                // au moins un caractère spécial dans la liste
                let condition5 = /[()=+?!'$.%;:@&*#/\\\-]+/.test(this.valeur);
                correct = condition1 && condition2 && condition3 && condition4 && condition5;
                break;
            case 'password' :
                correct = /(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#$%.?^&*]+).{8,}$/.test(this.valeur);
                // ?= indique une recherche sans avancer dans la chaine  : on recommence toujours depuis le début
        }
        return correct;
    }

    /*
 * retourne vrai si année bissextile
 * Paramètre
 *  annee : année à tester
 */

    static estBissextile(annee) {
        return ((annee % 4 === 0) && ((annee % 100 !== 0) || (annee % 400 === 0)));
    }

    /*
     * retourne le nombre de jours d'un mois donné
     */

    static nbjMois(mois, annee) {
        if (mois === 2) return Controle.estBissextile(annee) ? 29 : 28;
        if (mois === 4 || mois === 6 || mois === 9 || mois === 11) return 30;
        return 31;
    }

    /*
     * retourne vrai si la date est valide
     */

    static dateValide(unJour, unMois, uneAnnee) {
        let mois = parseInt(unMois, 10);
        let jour = parseInt(unJour, 10);
        let annee = parseInt(uneAnnee, 10);
        return mois >= 1 && mois <= 12 && jour >= 1 && jour <= Controle.nbjMois(mois, annee) && annee >= 1900;
    }
}

