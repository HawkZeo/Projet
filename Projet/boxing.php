<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Boxing</title>
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
    <script src="js/boxing.js"></script>
    <script src="js/controle.js"></script>
</head>
<body>
<div style="text-align: right">
    <a data-toggle="modal" data-target="#ajout" href="#" class="btn btn-warning btn-md">Ajouter bobine</a>
    <input type="button" class="btn btn-danger btn-md" value="Retour page principale" onclick="window.location.href='index.php'">
</div>
<div id="zoneMaj" class="table-responsive">
    <table class="table table-light table-striped">
        <thead class="thead-light">
        <tr>
            <th></th>
            <th>Num&eacute;ro bobine</th>
            <th>Colonne</th>
            <th>Emplacement</th>
        </tr>
        </thead>
        <tbody id="lesLignes">
        </tbody>
    </table>
</div>
<!-- fenêtre modale pour l'ajout -->
<div class="modal fade"
     id="ajout"
     tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
     data-backdrop="true" data-keyboard="true">
    <div class="modal-dialog modal-lg ">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Ajouter bobine</h4>
            </div>
            <div class="modal-body">
                <div class="form-group" id="groupeNumero">
                    <label class='obligatoire' for="numero" title="">Num&eacute;ro de bobine</label>
                    <input type="text" id='numero' class="form-control infobulle"
                           maxlength="50"
                           placeholder="Num&eacute;ro de bobine"
                    >
                    <span id='messageNumero' class='help-block '></span>
                </div>
                <div id="groupeColonne" class="form-group">
                    <label class='obligatoire' for="colonne" title="">Colonne</label>
                    <input type="text" id='colonne' class="form-control infobulle"
                           maxlength="50"
                           placeholder="Colonne"
                    >
                    <span id='messageColonne' class='help-block '></span>
                </div>
                <div id="groupeEmplacement" class="form-group">
                    <label class='obligatoire' for="emplacement" title="">Emplacement</label>
                    <input type="text" id='emplacement' class="form-control infobulle"
                           maxlength="50"
                           placeholder="Emplacement"
                    >
                    <span id='messageEmplacement' class='help-block '></span>
                </div>
                <div style="text-align: center">
                <button id='btnAjouter' class="btn btn-default center-block">Ajouter</button>
                </div>
            </div>
            <div class="modal-footer">
                <div id="erreur"></div>
            </div>

        </div>
    </div>
</div>
</body>