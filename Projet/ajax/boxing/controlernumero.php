<?php

require '../../class/class.database.inc.php';
require '../../class/class.projet.inc.php';

$numero = $_POST['numero'];

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    echo Projet::controlerNumero2($numero, $id);
} else {
    echo Projet::controlerNumero($numero);
}

