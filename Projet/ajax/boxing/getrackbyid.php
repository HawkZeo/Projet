<?php
require '../../class/class.database.inc.php';
require '../../class/class.projet.inc.php';

$id = $_POST['id'];
echo json_encode(Projet::getById($id));
