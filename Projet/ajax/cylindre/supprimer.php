<?php
require '../../class/class.database.inc.php';
require '../../class/class.projet.inc.php';
$id = $_POST['id'];
echo Projet::supprimerCylindre($id);



