<?php
require '../../class/class.database.inc.php';
require '../../class/class.projet.inc.php';
$numeroCylindre = $_POST['numeroCylindre'];
$separateur = $_POST['separateur'];
echo json_encode(Projet::ajouterCylindre($numeroCylindre, $separateur));