"use strict";

let lesCylindres = [];

$(function () {
    $.getJSON("ajax/getlesdonnees.php", remplirLesDonnees);
    $('#btnAjouterCylindreAll').click(ajout);
});

function remplirLesDonnees(data) {
    lesCylindres = data['lesCylindres'];
    afficher();
    $('#zoneMajCylindreAll').css('visibility', "visible");
}

//Prépare les données à afficher puis les envoie à afficherLigne()
function afficher() {
    $('#lesLignesAll').empty();
    for (let i in lesCylindres) {
        let unCylindre = lesCylindres[i];
        afficherLigne(unCylindre.id, unCylindre.numeroCylindre, unCylindre.separateur);
    }

}

function afficherLigne(id, numeroCylindre, separateur) {
    let ligne = $('<tr>').attr('id', id);

    let a = $('<td>');
    let action1 = $('<i>',  { class : 'fas fa-times', style : 'color:red'});
    action1.click(function() {confirmerSuppression(id)});
    a.append(action1);
    let action2 = $('<i>',  { class : 'fas fa-edit', style : 'color:#37648b; margin-left:5px'});
    action2.click(function() { location.href = "modificationSeparateurAll.php?id=" + id;});
    a.append(action2);
    ligne.append(a);
    a = $('<td>').text(numeroCylindre);
    ligne.append(a);
    a = $('<td>').text(separateur);
    ligne.append(a);

    $('#lesLignesAll').append(ligne);
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
        url: 'ajax/cylindre/supprimer.php',
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

function ajout() {
    if (controlerAjoutNumeroCylindreAll() && controlerSeparateurAll()) {
        let numeroCylindreAll = $('#numeroCylindreAll').val();
        let separateur = $('#separateurAll').val();
        ajouter(numeroCylindreAll, separateur);
    }
}

/*
 * Action : Contrôle de champ NumeroCylindreAll
*/

function controlerAjoutNumeroCylindreAll() {
    let numeroCylindreAll = $('#numeroCylindreAll').val();
    let ok = false;
    if (!/^[0-9A-Z]+$/.test(numeroCylindreAll)) {
        $('#groupeNumeroCylindreAll').removeClass('has-success').addClass('has-error');
        $('#messageNumeroCylindreAll').text('Seuls les chiffres et les lettres majuscules sont accept&eacute;s');
        ok = false;
    } else {
        $.ajax({
            type: 'POST',
            url: "ajax/cylindre/controlernumerocylindreajout.php",
            data: {numeroCylindre: numeroCylindreAll},
            dataType: "json",
            async: false,
            success: function (data) {
                if (data == 1) {
                    $('#groupeNumeroCylindreAll').removeClass('has-success').addClass('has-error');
                    $('#messageNumeroCylindreAll').text('Num&eacute;ro de cylindre d&eacute;j&agrave; attribu&eacute;');
                    ok = false;
                } else {
                    $('#groupeNumeroCylindreAll').removeClass('has-error').addClass('has-success');
                    $('#messageNumeroCylindreAll').text('');
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

function ajouter(numeroCylindreAll, separateurAll) {
    $.ajax({
        url: 'ajax/cylindre/ajouterCylindreAll.php',
        type: 'POST',
        data: {numeroCylindre: numeroCylindreAll, separateur: separateurAll},
        dataType: "json",
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red'});
        },
        success: function (data) {
            if (data >= 1) {
                $.dialog({title: '', content: 'Ajout validé', type: 'green'});
                $("#ajoutCylindreAll").modal("hide");
            } else {
                Std.afficherMessage('erreur', 'Ajout refusé', 'alert alert-danger', 3);
            }
            void window.location.reload();
        }
    })
}
