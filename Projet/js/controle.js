/*
 * Action : Contrôle du champ colonne
*/

function controlerColonne() {
    let colonne = $('#colonne').val();
    if (!/^[0-9]+$/.test(colonne)) {
        $('#groupeColonne').removeClass('has-success').addClass('has-error');
        $('#messageColonne').text('Valeur incorrecte : seuls les chiffres sont autorisés !');
        return false;
    } else {
        $('#groupeColonne').removeClass('has-error').addClass('has-success');
        $('#messageColonne').text('');
        return true
    }
}

/*
 * Action : Contrôle du champ emplacement
*/
function controlerEmplacement() {
    let emplacement = $('#emplacement').val();
    if (!/^[0-9]+$/.test(emplacement)) {
        $('#groupeEmplacement').removeClass('has-success').addClass('has-error');
        $('#messageEmplacement').text('Valeur incorrecte : seuls les chiffres sont autorisés !');
        return false;
    } else {
        $('#groupeEmplacement').removeClass('has-error').addClass('has-success');
        $('#messageEmplacement').text('');
        return true
    }
}


