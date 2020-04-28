<?php

require '../../class/class.database.inc.php';
require '../../class/class.projet.inc.php';

$numeroCylindre = $_POST['numeroCylindre'];

echo Projet::controlerNumeroCylindre($numeroCylindre);