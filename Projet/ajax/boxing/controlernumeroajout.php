<?php

require '../../class/class.database.inc.php';
require '../../class/class.projet.inc.php';

$numero = $_POST['numero'];

echo Projet::controlerNumero($numero);