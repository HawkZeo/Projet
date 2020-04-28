<?php

require '../../class/class.database.inc.php';
require '../../class/class.projet.inc.php';

$numeroCylindre = $_POST['numeroCylindre'];

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    echo Projet::controlerNumeroCylindre2($numeroCylindre, $id);
} else {
    echo Projet::controlerNumeroCylindre($numero);
}

