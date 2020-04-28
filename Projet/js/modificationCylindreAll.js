let numeroCylindreOk = false;
$(function () {
    id = Std.getLesParametresUrl()['id'];

    getCylindreById(id);
    $('#btnModifierSeparateurAll').click(function () {
        modificationCylindre(id);
    });
});

function getCylindreById(id) {
    $.ajax({
        type : 'post',
        data : {id : id},
        dataType: "json",
        url: "ajax/cylindre/getcylindrebyid.php",
        success: remplirChamp,
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red', typeAnimated: true});
        }
    });
}

function remplirChamp(data) {
    let leCylindre = data;
    $('#numeroCylindreAll').val(leCylindre.numeroCylindre);
    $('#separateurAll').val(leCylindre.separateur);
}


function modificationCylindre(id) {
    numeroCylindreOk =false;
    controlerModificationNumeroCylindre(id);
    let separateurOk = controlerSeparateurAll();
    if (numeroCylindreOk && separateurOk) {
        modifierCylindre(id)
    }
}

function modifierCylindre(id) {
    let numeroCylindre = $('#numeroCylindreAll').val();
    let separateur = $('#separateurAll').val();
    $.ajax({
        type: 'POST',
        dataType: "json",
        data: {id : id , numeroCylindre: numeroCylindre, separateur: separateur},
        url: "ajax/cylindre/modifierCylindre.php",
        success: function (data) {
            if (data == 1) {
                Std.afficherMessage('message', 'Modification prise en compte', 'alert alert-success', 3);
            } else {
                Std.afficherMessage('message', 'Modification non prise en compte', 'alert alert-danger', 3);
            }
        },
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red', typeAnimated: true});
        }
    });
}


/*
 * Action : Contrôle de champ numéro
 * Dans les numéros de bobines, les lettres font parti de la séquence de chiffres
*/

function controlerModificationNumeroCylindre(id) {
    let numeroCylindre = $('#numeroCylindreAll').val().replace(/\s{2,}/, " ").trim().toUpperCase();
    if (!/^[0-9A-Z]+$/.test(numeroCylindre)) {
        $('#groupeNumeroCylindreAll').removeClass('has-success').addClass('has-error');
        $('#messageNumeroCylindreAll').text('Seuls les chiffres et les lettres majuscules sont acceptés');
        numeroCylindreOk = false;
    } else {
        $.ajax({
            type: 'POST',
            url: "ajax/cylindre/controlernumerocylindre.php",
            data: {id: id, numeroCylindre: numeroCylindre},
            dataType: "json",
            async: false,
            success: function (data) {
                if (data >= 1) {
                    $('#groupeNumeroCylindreAll').removeClass('has-success').addClass('has-error');
                    $('#messageNumeroCylindreAll').text('Numéro de bobine déjà attribué');
                    numeroCylindreOk = false;
                } else {
                    $('#groupeNumeroCylindreAll').removeClass('has-error').addClass('has-success');
                    $('#messageNumeroCylindreAll').text('Modification prise en compte');
                    numeroCylindreOk = true;
                }
            },
            error: function (request) {
                $.dialog({title: '', content: request.responseText, type: 'red', typeAnimated: true});
            }
        });
    }
}




