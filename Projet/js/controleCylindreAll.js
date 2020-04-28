/*
 * Action : Contrôle du champ separateurAll
*/

function controlerSeparateurAll() {
    let separateurAll = $('#separateurAll').val();
    if (!/^[A-C]+$/.test(separateurAll)) {
        $('#groupeSeparateurAll').removeClass('has-success').addClass('has-error');
        $('#messageSeparateurAll').text('Valeur incorrecte : seuls les lettres majuscules de A à C sont autorisés !');
        return false;
    } else {
        $('#groupeSeparateurAll').removeClass('has-error').addClass('has-success');
        $('#messageSeparateurAll').text('');
        return true
    }
}


