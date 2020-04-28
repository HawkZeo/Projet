<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Modification</title>
    <link rel="stylesheet" href="css/awesome/fontawesome-all.css">
    <link rel="stylesheet" href="composant/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="composant/confirm/jquery-confirm.min.css">
    <link rel="stylesheet" href="css/style.css">

    <script src="composant/jquery.js"></script>
    <script src="composant/bootstrap/js/bootstrap.min.js"></script>
    <script src="composant/confirm/jquery-confirm.min.js"></script>
    <script src="composant/personnel/class.std.js"></script>
    <script src="composant/personnel/class.datefr.js"></script>
    <script src="composant/personnel/class.controle.js"></script>
    <script src="js/controleCylindreAll.js"></script>
    <script src="js/modificationCylindreAll.js"></script>

<body>
<div class="container" style="margin-left: 280px">
    <div class="row">
        <div class="col-md-offset-2 col-md-8" id="monFormulaire">
            <br/>
            <div class="form-group" id="groupeNumeroCylindreAll">
                <label class="obligatoire" for="numeroCylindreAll" >Num&eacute;ro cylindre</label>
                <input type="text" id='numeroCylindreAll' value="" class="form-control infobulle">
                <span id='messageNumeroCylindreAll' class='help-block'></span>
            </div>
            <div class="form-group" id="groupeSeparateurAll">
                <label class="obligatoire" for="separateurAll" >S&eacute;parateur</label>
                <input type="text" id='separateurAll' value="" class="form-control infobulle">
                <span id='messageSeparateurAll' class='help-block'></span>
            </div>
            <br/>
            <div  style="text-align: center">
            <button id='btnModifierSeparateurAll' class="btn btn-danger center-block"><i class="fa fa-check-square"></i> Modifier</button>
                <br/><br/>
                <input type="button" class="btn btn-secondary btn-md" value="Retour au tableau" onclick="window.location.href='separateurAll.php'"
            </div>
        </div>
    </div>
    </div>
</body>