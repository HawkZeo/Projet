let numeroOk = false;
$(function () {
    id = Std.getLesParametresUrl()['id'];

    getRackById(id);
    $('#btnModifier').click(function () {
        modification(id);
    });
});

function getRackById(id) {
    $.ajax({
        type : 'post',
        data : {id : id},
        dataType: "json",
        url: "ajax/boxing/getrackbyid.php",
        success: remplirChamp,
        error: function (request) {
            $.dialog({title: '', content: request.responseText, type: 'red', typeAnimated: true});
        }
    });
}

function remplirChamp(data) {
    let leRack = data;
    $('#numero').val(leRack.numero);
    $('#colonne').val(leRack.colonne);
    $('#emplacement').val(leRack.emplacement);
}


function modification(id) {
    numeroOk =false;
    controlerModificationNumero(id);
    let colonneOk = controlerColonne();
    let emplacementOk = controlerEmplacement();
    if (numeroOk && colonneOk && emplacementOk) {
        modifier(id)
    }
}

function modifier(id) {
    let numero = $('#numero').val();
    let colonne = $('#colonne').val();
    let emplacement = $('#emplacement').val();
    $.ajax({
        type: 'POST',
        dataType: "json",
        data: {id : id , numero: numero, colonne: colonne, emplacement: emplacement},
        url: "ajax/boxing/modifier.php",
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

function controlerModificationNumero(id) {
    let numero = $('#numero').val().replace(/\s{2,}/, " ").trim().toUpperCase();
    if (!/^[0-9A-Z]+$/.test(numero)) {
        $('#groupeNumero').removeClass('has-success').addClass('has-error');
        $('#messageNumero').text('Seuls les chiffres et les lettres majuscules sont acceptés');
        numeroOk = false;
    } else {
        $.ajax({
            type: 'POST',
            url: "ajax/boxing/controlernumero.php",
            data: {id: id, numero: numero},
            dataType: "json",
            async: false,
            success: function (data) {
                if (data >= 1) {
                    $('#groupeNumero').removeClass('has-success').addClass('has-error');
                    $('#messageNumero').text('Numéro de bobine déjà attribué');
                    numeroOk = false;
                } else {
                    $('#groupeNumero').removeClass('has-error').addClass('has-success');
                    $('#messageNumero').text('Modification prise en compte');
                    numeroOk = true;
                }
            },
            error: function (request) {
                $.dialog({title: '', content: request.responseText, type: 'red', typeAnimated: true});
            }
        });
    }
}




