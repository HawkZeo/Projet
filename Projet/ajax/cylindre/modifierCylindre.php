<?php
require '../../class/class.database.inc.php';
require '../../class/class.projet.inc.php';
$id = $_POST["id"];
$numeroCylindre = $_POST["numeroCylindre"];
$separateur = $_POST["separateur"];
echo Projet::modifierCylindreAll($numeroCylindre, $separateur, $id);


