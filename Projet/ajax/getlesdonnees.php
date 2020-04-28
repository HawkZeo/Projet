<?php
require '../class/class.database.inc.php';
require '../class/class.projet.inc.php';

$lesDonnees['lesRacks'] = Projet::getLesRacks();
$lesDonnees['lesCylindres'] = Projet::getLesCylindres();

echo json_encode($lesDonnees);