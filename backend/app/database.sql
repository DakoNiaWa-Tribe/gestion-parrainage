CREATE TABLE electeurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_electeur VARCHAR(20) UNIQUE NOT NULL,
    cin VARCHAR(15) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    lieu_naissance VARCHAR(100) NOT NULL,
    sexe CHAR(1) NOT NULL,
    bureau_vote VARCHAR(100) NOT NULL,
    date_enregistrement TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE temp_electeurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_electeur VARCHAR(20),
    cin VARCHAR(15),
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
    couleurs_parti VARCHAR(50),
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