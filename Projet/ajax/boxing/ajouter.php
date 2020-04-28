<?php
require '../../class/class.database.inc.php';
require '../../class/class.projet.inc.php';
$numero = $_POST['numero'];
$colonne = $_POST['colonne'];
$emplacement = $_POST['emplacement'];
echo json_encode(Projet::ajouter($numero,$colonne,$emplacement));