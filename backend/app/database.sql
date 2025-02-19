CREATE TABLE electeurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_electeur VARCHAR(20) UNIQUE NOT NULL,
    cni VARCHAR(20) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    lieu_naissance VARCHAR(100) NOT NULL,
    sexe CHAR(1) NOT NULL,
    bureau_vote VARCHAR(100) NOT NULL,
    date_enregistrement TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parrain_electeurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_electeur VARCHAR(20) UNIQUE NOT NULL,
    cni VARCHAR(20) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    bureau_vote VARCHAR(100) NOT NULL,
    numero_tel VARCHAR(20) UNIQUE,
    email VARCHAR(100) UNIQUE,
    code_securite VARCHAR(15) UNIQUE,
    date_enregistrement TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE temp_electeurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_electeur VARCHAR(20),
    cni VARCHAR(20),
    nom VARCHAR(100),
    prenom VARCHAR(100),
    date_naissance DATE,
    lieu_naissance VARCHAR(100),
    sexe CHAR(1),
    bureau_vote VARCHAR(100),
    statut_validation ENUM('en_attente', 'valide', 'erreur') DEFAULT 'en_attente',
    raison_erreur TEXT,
    id_upload INT,
    date_import TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE uploads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    fichier_hash VARCHAR(64) NOT NULL,
    adresse_ip VARCHAR(45),
    resultat ENUM('succès', 'échec') NOT NULL,
    message_erreur TEXT,
    date_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_electeur VARCHAR(20) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    parti_politique VARCHAR(100),
    slogan VARCHAR(255),
    photo_url VARCHAR(255),
    couleur_parti_1 VARCHAR(50),
    couleur_parti_2 VARCHAR(50),
    couleur_parti_3 VARCHAR(50),
    page_info_url VARCHAR(255),
    code_securite VARCHAR(10),
    date_enregistrement TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parrainages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_electeur VARCHAR(20) NOT NULL,
    candidat_id INT NOT NULL,
    code_validation VARCHAR(10),
    date_parrainage TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_candidat FOREIGN KEY (candidat_id) REFERENCES candidats(id),
    CONSTRAINT fk_electeur FOREIGN KEY (numero_electeur) REFERENCES electeurs(numero_electeur)
);

CREATE TABLE periode_parrainage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    etat ENUM('ouvert', 'ferme') DEFAULT 'ferme'
);



-- fonction ControlleFichierElecteur

DELIMITER $$

CREATE FUNCTION ControlerFichierElecteurs(
    p_user_id INT,
    p_ip_address VARCHAR(45),
    p_file_checksum VARCHAR(64),
    p_file_content LONGBLOB
) RETURNS TINYINT(1)  -- Using TINYINT(1) instead of BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE v_calculatedSum VARCHAR(64);
    DECLARE v_result TINYINT(1);

    SET v_calculatedSum = SHA2(p_file_content, 256);

    -- verifier sha256
    IF v_calculatedSum <> p_file_checksum THEN
        SET v_result = 0;  -- FALSE
        INSERT INTO uploads (user_id, adresse_ip, fichier_hash, resultat, message_erreur)
        VALUES (p_user_id, p_ip_address, p_file_checksum, 'échec', 'Checksum SHA256 incorrect');
    ELSE
        -- verifier encodage
        IF p_file_content NOT LIKE CONVERT(p_file_content USING utf8mb4) THEN
            SET v_result = 0;  -- FALSE
            INSERT INTO uploads (user_id, adresse_ip, fichier_hash, resultat, message_erreur)
            VALUES (p_user_id, p_ip_address, p_file_checksum, 'échec', 'Encodage UTF-8 invalide');
        ELSE
            -- tout est correct
            SET v_result = 1;  -- TRUE
            INSERT INTO uploads (user_id, adresse_ip, fichier_hash, resultat)
            VALUES (p_user_id, p_ip_address, p_file_checksum, 'succès');
        END IF;
    END IF;

    RETURN v_result;  
END $$

DELIMITER ;

-- table des erreurs sur les electeurs

CREATE TABLE IF NOT EXISTS electeurs_problemes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tentative_id INT, -- L'identifiant de l'upload
    cni VARCHAR(20),
    numero_electeur VARCHAR(20),
    erreur_description TEXT,
    date_detection TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- fonction ControlerElecteur

DELIMITER $$

CREATE FUNCTION ControlerElecteurs(
    p_tentativeId INT,
    p_numCni VARCHAR(20),
    p_numElecteur VARCHAR(20),
    p_nom VARCHAR(100),
    p_prenom VARCHAR(100),
    p_dateNaissance DATE,
    p_lieuNaissance VARCHAR(100),
    p_sexe CHAR(1)
)RETURNS TINYINT(1)

DETERMINISTIC
BEGIN
    DECLARE v_errorMessage TEXT DEFAULT '';
    DECLARE v_countCni INT;
    DECLARE v_countNumElec INT;
-- numero cni invalide
    IF LENGTH(p_numCni) <> 17 OR p_numCni NOT REGEXP '^[0-9]+$' THEN
        SET v_errorMessage = CONCAT(v_errorMessage, 'CNI Invalide. ');
    END IF;
-- numero electeur invalide
    IF LENGTH(p_numElecteur)  <> 9 OR p_numElecteur NOT REGEXP '^[0-9]+$' THEN
        SET v_errorMessage = CONCAT(v_errorMessage, 'Numero Electeur invalide. ');
    END IF;
-- on verifie l'unicite du CNI et du numero electeur
    SELECT COUNT(*) INTO v_countCni FROM electeurs WHERE cni = p_numCni ;
    IF v_countCni > 0 THEN
        SET v_errorMessage = CONCAT(v_errorMessage, 'CNI deja Utilise. ');
    END IF;


    SELECT COUNT(*) INTO v_countNumElec FROM electeurs WHERE numero_electeur = p_numElecteur;
    IF v_countNumElec > 0 THEN
        SET v_errorMessage = CONCAT(v_errorMessage, 'numero electeur deja Utilise. ');
    END IF;

-- on verifie les champs obligatoires
    IF p_nom IS NULL OR p_nom = '' OR p_prenom IS NULL OR p_prenom = '' OR p_dateNaissance IS NULL OR
        p_lieuNaissance IS NULL OR p_lieuNaissance = '' OR p_sexe NOT IN ('M', 'F') THEN
        SET v_errorMessage = CONCAT(v_errorMessage, 'Informations incompletes. ');
    END IF;

-- on verifie que les champs de texte ne contiennent pas d'accent et sont en utf-8
    IF p_nom REGEXP '[À-ÖØ-öø-ÿ]' OR p_prenom REGEXP '[À-ÖØ-öø-ÿ]' or p_lieuNaissance REGEXP '[À-ÖØ-öø-ÿ]' THEN
        SET v_errorMessage = CONCAT(v_errorMessage, 'Caractere Speciaux non autorise. ');
    END IF;

    IF v_errorMessage <> '' THEN
        INSERT INTO electeurs_problemes(tentative_id, cni, numero_electeur, erreur_description)
        VALUES(p_tentativeId, p_numCni, p_numElecteur, v_errorMessage);

        RETURN 0;
    END IF;

    RETURN 1;
END $$
DELIMITER ;

-- validerImportation procedure

DELIMITER $$

CREATE PROCEDURE ValiderImportation()
BEGIN
    INSERT INTO electeurs (numero_electeur, cni, nom, prenom, date_naissance, lieu_naissance, sexe, bureau_vote)
    SELECT numero_electeur, cni,nom, prenom, date_naissance, lieu_naissance, sexe, bureau_vote
    FROM temp_electeurs;

    DELETE FROM temp_electeurs;

    UPDATE etat_import SET etat_upload_electeurs = 0;
END $$

DELIMITER ;


-- table etat import

CREATE TABLE etat_import (
    id INT AUTO_INCREMENT PRIMARY KEY,
    etat_upload_electeurs TINYINT NOT NULL DEFAULT 1,  -- 1 = Upload allowed, 0 = Upload blocked
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);