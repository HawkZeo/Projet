"use strict";

let lesRacks = [];

$(function () {
    $.getJSON("ajax/getlesdonnees.php", remplirLesDonnees);
    $('#btnAjouter').click(ajout1);
});

function remplirLesDonnees(data) {
    lesRacks = data['lesRacks'];
    afficher();
    $('#zoneMaj').css('visibility', "visible");
}

//Prépare les données à afficher puis les envoie à afficherLigne()
function afficher() {
    $('#lesLignes').empty();
    for (let i in lesRacks) {
        let unRack = lesRacks[i];
        afficherLigne(unRack.id, unRack.numero, unRack.colonne, unRack.emplacement);
    }

}

function afficherLigne(id, numero, colonne, emplacement) {
    let ligne = $('<tr>').attr('id', id);

    let a = $('<td>');
    let action1 = $('<i>',  { class : 'fas fa-times', style : 'color:red'});
    action1.click(function() {confirmerSuppression(id)});
    a.append(action1);
    let action2 = $('<i>',  { class : 'fas fa-edit', style : 'color:#37648b; margin-left:5px'});
    action2.click(function() { location.href = "modification.php?id=" + id;});
    a.append(action2);
    ligne.append(a);
    a = $('<td>').text(numero);
    ligne.append(a);
    a = $('<td>').text(colonne);
    ligne.append(a);
    a = $('<td>').text(emplacement);
    ligne.append(a);

    $('#lesLignes').append(ligne);
}

/*
 * Action : demande de confirmation de la suppression
 * Déclencheur	: sur le clic du bouton associé
 */
function confirmerSuppression(id) {
    $.confirm({
        theme: 'bootstrap',
        title: 'Confirmer la demande de suppression!',
        content: '',
        buttons: {
            Oui: function () {
                supprimer(id);
            },
            Non: function () {
                return true;
            }
        }
    });
}

/*
 * Action : Appel ajax pour supprimer un résultat
 * Déclencheur	: Si l'utilisateur confirme sa demande
 */
function supprimer(id) {
    $.ajax({
        url: 'ajax/boxing/supprimer.php',
        type: 'POST',
        data: {id: id},
        dataType: "json",
        error: function (request, error) {
            let msg = "Erreur inattendue lors de la suppression : " + request.responseText;
            $.dialog({title: '', content: msg, type: 'red', typeAnimated: true});
        },
        success: function (data) {
            if (data === 1) {
                $('#' + id).remove();
                $("#zoneMaj").trigger('update');
            } else {
                $.dialog({title: '', content: 'Erreur inattendue lors de la suppression', type: 'red', typeAnimated: true});
            }
        }
    })
}

/*
 * Action : Vérification des données
 * Déclencheur	: sur le clic du bouton ajouter
 */

function ajout1() {
    if (controlerAjoutNumero() && controlerColonne() && controlerEmplacement()) {
        let numero = $('#numero').val();
        let colonne = $('#colonne').val();
        let emplacement = $('#emplacement').val();
        ajouter(numero, colonne, emplacement);
    }
}

/*
 * Action : Contrôle de champ Numero
 * Déclencheur	: fonction verifierFormulaire
*/

function controlerAjoutNumero() {
    let numero = $('#numero').val();
    let ok = false;
    if (!/^[0-9A-Z]+$/.test(numero)) {
        $('#groupeNumero').removeClass('has-success').addClass('has-error');
        $('#messageNumero').text('Seuls les chiffres et les lettres majuscules sont acceptés');
        ok = false;
    } else {
        $.ajax({
            type: 'POST',
            url: "ajax/boxing/controlernumeroajout.php",
            data: {numero: numero},
            dataType: "json",
            async: false,
            success: function (data) {
                if (data == 1) {
                    $('#groupeNumero').removeClass('has-success').addClass('has-error');
                    $('#messageNumero').text('Numéro de bobine déjà attribué');
                    ok = false;
                } else {
                    $('#groupeNumero').removeClass('has-error').addClass('has-success');
                    $('#messageNumero').text('');
                    ok = true;
                }
            },
            error: function (request) {
                $.dialog({title: '', content: request.responseText, type: 'red', typeAnimated: true});
            }
        });

        return ok;
    }
}

/*
 * Action : Ajout d'une bobine
 */

function ajouter(numero, colonne, emplacement) {
    $.ajax({
        url: 'ajax/boxing/ajouter.php',
        type: 'POST',
        data: {numero: numero, colonne: colonne, emplacement: emplacement},
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if (data >= 1) {
                $.dialog({title: '', content: 'Ajout validé', type: 'green'});
                $("#ajout").modal("hide");
            } else {
                Std.afficherMessage('erreur', 'Ajout refusé', 'alert alert-danger', 3);
            }
            void window.location.reload();
        }
    })
}
