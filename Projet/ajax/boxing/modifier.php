<?php
require '../../class/class.database.inc.php';
require '../../class/class.projet.inc.php';
$id = $_POST["id"];
$numero = $_POST["numero"];
$colonne = $_POST["colonne"];
$emplacement = $_POST["emplacement"];
echo Projet::modifier($numero, $colonne, $emplacement, $id);


