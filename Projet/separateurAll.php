<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Tout les cylindres</title>
    <link rel="stylesheet" href="composant/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="composant/confirm/jquery-confirm.min.css">
    <link rel="stylesheet" href="css/awesome/fontawesome-all.css">
    <link rel="stylesheet" href="css/style.css">

    <script src="composant/jquery.js"></script>
    <script src="composant/bootstrap/js/bootstrap.min.js"></script>
    <script src="composant/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="composant/confirm/jquery-confirm.min.js"></script>
    <script src="composant/personnel/class.std.js"></script>
    <script src="composant/personnel/class.controle.js"></script>
    <script src="js/cylindreAll.js"></script>
    <script src="js/controleCylindreAll.js"></script>
</head>
<body>
<div style="text-align: right">
    <a data-toggle="modal" data-target="#ajoutCylindreAll" href="#" class="btn btn-warning btn-md">Ajouter cylindre</a>
    <input type="button" class="btn btn-primary btn-md" value="Retour page de s&eacute;lection des s&eacute;parateur" onclick="window.location.href='cylindre.php'">
    <input type="button" class="btn btn-danger btn-md" value="Retour page principale" onclick="window.location.href='index.php'">
</div>
<div id="zoneMajCylindreAll" class="table-responsive">
    <table class="table table-light table-striped">
        <thead class="thead-light">
        <tr>
            <th></th>
            <th>Num&eacute;ro de cylindre</th>
            <th>S&eacute;parateur</th>
        </tr>
        </thead>
        <tbody id="lesLignesAll">
        </tbody>
    </table>
</div>
<!-- fenêtre modale pour l'ajout de cylindre sur le tableau où tout les séparateur sont affichés-->
<div class="modal fade"
     id="ajoutCylindreAll"
     tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
     data-backdrop="true" data-keyboard="true">
    <div class="modal-dialog modal-lg ">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Ajouter cylindre</h4>
            </div>
            <div class="modal-body">
                <div class="form-group" id="groupeNumeroCylindreAll">
                    <label class='obligatoire' for="numeroCylindreAll" title="">Num&eacute;ro de cylindre</label>
                    <input type="text" id='numeroCylindreAll' class="form-control infobulle"
                           maxlength="50"
                           placeholder="Num&eacute;ro de cylindre"
                    >
                    <span id='messageNumeroCylindreAll' class='help-block '></span>
                </div>
                <div id="groupeSeparateurAll" class="form-group">
                    <label class='obligatoire' for="separateurAll" title="">S&eacute;parateur</label>
                    <input type="text" id='separateurAll' class="form-control infobulle"
                           maxlength="50"
                           placeholder="S&eacute;parateur"
                    >
                    <span id='messageSeparateurAll' class='help-block '></span>
                </div>
                <div style="text-align: center">
                    <button id='btnAjouterCylindreAll' class="btn btn-default center-block">Ajouter</button>
                </div>
            </div>
            <div class="modal-footer">
                <div id="erreur"></div>
            </div>

        </div>
    </div>
</div>
</body>