<?php


class Projet
{

    /**
     * Retourne les racks
     * @return array
     */
    public static function getLesRacks()
    {
        $db = Database::getInstance();

        $sql = <<<EOD
SELECT rack.id, numero, colonne, emplacement
FROM rack;
ORDER BY colonne ASC;
EOD;
        $curseur = $db->query($sql);
        $lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);
        $curseur->closeCursor();
        return $lesLignes;
    }

    /**
     * Retourne les cylindres
     * @return array
     */
    public static function getLesCylindres()
    {
        $db = Database::getInstance();

        $sql = <<<EOD
SELECT cylindre.id, numeroCylindre, separateur
FROM cylindre;
ORDER BY separateur ASC;
EOD;
        $curseur = $db->query($sql);
        $lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);
        $curseur->closeCursor();
        return $lesLignes;
    }


    /**
     * Retourne les information d'un rack à partir de son identifiant
     *
     * @param int $id identifiant du rack
     * @return array
     */
    public static function getById($id)
    {
        $db = Database::getInstance();
        $sql = "SELECT id, numero, colonne, emplacement from rack WHERE id = :id";
        $curseur = $db->prepare($sql);
        $curseur->bindParam('id', $id);
        $curseur->execute();
        $ligne = $curseur->fetch(PDO::FETCH_ASSOC);
        $curseur->closeCursor();
        return $ligne;
    }

    /**
     * Retourne les information d'un cylindre à partir de son identifiant
     *
     * @param int $id identifiant du cylindre
     * @return array
     */
    public static function getCylindreById($id)
    {
        $db = Database::getInstance();
        $sql = "SELECT id, numeroCylindre, separateur from cylindre WHERE id = :id";
        $curseur = $db->prepare($sql);
        $curseur->bindParam('id', $id);
        $curseur->execute();
        $ligne = $curseur->fetch(PDO::FETCH_ASSOC);
        $curseur->closeCursor();
        return $ligne;
    }

    /**
     * Ajouter un rack
     * @param string $numero
     * @param int $colonne
     * @param int $emplacement
     * @return int identifiant du rack ou 0 si erreur de création
     */
    public static function ajouter($numero, $colonne, $emplacement)
    {
        $db = Database::getInstance();
        $sql = "INSERT INTO rack(numero, colonne, emplacement) VALUES (:numero, :colonne, :emplacement)";
        $curseur = $db->prepare($sql);
        $curseur->bindParam('numero', $numero);
        $curseur->bindParam('colonne', $colonne);
        $curseur->bindParam('emplacement', $emplacement);
        if ($curseur->execute()) {
            return $db->lastInsertId();
        } else {
            return 0;
        }
    }

    /**
     * Ajouter un cylindre
     * @param string $numeroCylindre
     * @param int $separateur
     * @return int identifiant du cylindre ou 0 si erreur de création
     */
    public static function ajouterCylindre($numeroCylindre, $separateur)
    {
        $db = Database::getInstance();
        $sql = "INSERT INTO cylindre(numeroCylindre, separateur) VALUES (:numeroCylindre, :separateur)";
        $curseur = $db->prepare($sql);
        $curseur->bindParam('numeroCylindre', $numeroCylindre);
        $curseur->bindParam('separateur', $separateur);
        if ($curseur->execute()) {
            return $db->lastInsertId();
        } else {
            return 0;
        }
    }

    /**
     * Modifier d'un rack

     * @param int $id
     * @param int $numero
     * @param int $colonne
     * @param int $emplacement
     * @return message d'erreur ou nombre d'enregistrements modifiés (1 normalement ou 0 si aucune modification constatée)
     */
    public static function modifier($numero, $colonne, $emplacement, $id) {
        $db = Database::getInstance();
        $sql = "update rack set numero = :numero, colonne = :colonne, emplacement = :emplacement where id = :id";
        $curseur = $db->prepare($sql);
        $curseur->bindParam('numero', $numero);
        $curseur->bindParam('colonne', $colonne);
        $curseur->bindParam('emplacement', $emplacement);
        $curseur->bindParam('id', $id);
        return $curseur->execute();
    }


    /**
     * Modifier d'un cylindre

     * @param int $id
     * @param int $numeroCylindre
     * @param int $separateur
     * @return message d'erreur ou nombre d'enregistrements modifiés (1 normalement ou 0 si aucune modification constatée)
     */
    public static function modifierCylindreAll($numeroCylindre, $separateur, $id) {
        $db = Database::getInstance();
        $sql = "update cylindre set numeroCylindre = :numeroCylindre, separateur = :separateur where id = :id";
        $curseur = $db->prepare($sql);
        $curseur->bindParam('numeroCylindre', $numeroCylindre);
        $curseur->bindParam('separateur', $separateur);
        $curseur->bindParam('id', $id);
        return $curseur->execute();
    }


    /**
     * Suppression d'un rack
     *
     * @param $id numéro du rack
     * @return entier indiquant le statut de l'opération
     */
    public static function supprimer($id)
    {
        $db = Database::getInstance();
        $sql = "delete from rack where id = :1";
        $curseur = $db->prepare($sql);
        $curseur->bindParam(':1', $id);
        return $curseur->execute();
    }

    /**
     * Suppression d'un cylindre
     *
     * @param $id numéro du cylindre
     * @return entier indiquant le statut de l'opération
     */
    public static function supprimerCylindre($id)
    {
        $db = Database::getInstance();
        $sql = "delete from cylindre where id = :1";
        $curseur = $db->prepare($sql);
        $curseur->bindParam(':1', $id);
        return $curseur->execute();
    }

    /**
     * Retourne vrai si le numéro de bobine d'un nouveau rack est déja utilisé
     *

     * @param $numero numero de bobine
     * @return 0 ou 1 (détection)
     */
    public static function controlerNumero($numero) {
        $db = Database::getInstance();
        $sql = "SELECT 1 from rack WHERE numero = :numero";
        $curseur = $db->prepare($sql);
        $curseur->bindParam('numero', $numero);
        $curseur->execute();
        $ligne = $curseur->fetch();
        $curseur->closeCursor();
        return ($ligne ? 1 : 0);
    }


    /**
     * Retourne vrai si le numéro de bobine du rack modifié est déja utilisé
     *

     * @param string $numero numéro de bobine du rack
     * @param int $id identifiant du rack modifié
     * @return 0 ou 1 (détection)
     */
    public static function controlerNumero2($numero, $id) {
        $db = Database::getInstance();
        $sql = "SELECT 1 from rack WHERE numero = :numero and id != :id";
        $curseur = $db->prepare($sql);
        $curseur->bindParam('numero', $numero);
        $curseur->bindParam('id', $id);
        $curseur->execute();
        $ligne = $curseur->fetch();
        $curseur->closeCursor();
        return $ligne ? 1 : 0;
    }

    /**
     * Retourne vrai si le numéro de cylindre d'un ajout est déja utilisé
     *

     * @param $numeroCylindre numero de cylindre
     * @return 0 ou 1 (détection)
     */
    public static function controlerNumeroCylindre($numeroCylindre) {
        $db = Database::getInstance();
        $sql = "SELECT 1 from cylindre WHERE numeroCylindre = :numeroCylindre";
        $curseur = $db->prepare($sql);
        $curseur->bindParam('numeroCylindre', $numeroCylindre);
        $curseur->execute();
        $ligne = $curseur->fetch();
        $curseur->closeCursor();
        return ($ligne ? 1 : 0);
    }

    /**
     * Retourne vrai si le numéro de bobine du rack modifié est déja utilisé
     *

     * @param string $numeroCylindre numéro de bobine du rack
     * @param int $id identifiant du rack modifié
     * @return 0 ou 1 (détection)
     */
    public static function controlerNumeroCylindre2($numeroCylindre, $id) {
        $db = Database::getInstance();
        $sql = "SELECT 1 from cylindre WHERE numeroCylindre = :numeroCylindre and id != :id";
        $curseur = $db->prepare($sql);
        $curseur->bindParam('numeroCylindre', $numeroCylindre);
        $curseur->bindParam('id', $id);
        $curseur->execute();
        $ligne = $curseur->fetch();
        $curseur->closeCursor();
        return $ligne ? 1 : 0;
    }
}
?>