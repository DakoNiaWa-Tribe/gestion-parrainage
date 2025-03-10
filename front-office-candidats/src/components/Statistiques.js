import { useEffect, useState } from "react";

function Statistiques() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const [candidat, setCandidat] = useState({
        id: "", 
        nom: "",
        prenom: "",
        date_de_naissance: "",
    });

    const [electeurs, setElecteurs] = useState([]);
    const [nombreParrainages, setNombreParrainages] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        if (userDetails) {
            setCandidat({
                id: userDetails.id || "",
                nom: userDetails.nom || "",
                prenom: userDetails.prenom || "",
                date_de_naissance: userDetails.date_de_naissance || "",
            });
        } else {
            setError("Aucun utilisateur trouvé dans le stockage.");
            return;
        }

        
        if (candidat.id) {
            fetch(`https://api.example.com/electeurs?candidat_id=${candidat.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_candidat: candidat.id }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erreur de récupération des données.");
                    }
                    return response.json();
                })
                .then((data) => {
                    setElecteurs(data.parrainages_data || []);
                    setNombreParrainages(data.nombre_parrainages || 0);
                })
                .catch((error) => {
                    console.error("Erreur lors du fetch :", error);
                    setError("Une erreur s'est produite lors de la récupération des parrainages.");
                });
        }
    }, [candidat.id]);

    return (
        <div className="cadre">
            <h1>Statistiques et Informations du Candidat</h1>

            {error && <p className="error-message">{error}</p>}

            <div className="div1">
                <h2>Informations du candidat</h2> 
                <p><strong>Nom :</strong> {candidat.nom}</p>
                <p><strong>Prénom :</strong> {candidat.prenom}</p>
                <p><strong>Date de naissance :</strong> {candidat.date_de_naissance}</p>
            </div>

            <div className="div1">
                <h2>Statistiques des Parrainages</h2>
                <p><strong>Nombre total de parrainages :</strong> {nombreParrainages}</p>
            </div>

            <div className="div1">
                <h2>Liste des Électeurs ayant parrainé</h2>
                <ul>
                    {electeurs.length > 0 ? (
                        electeurs.map((electeur, index) => (
                            <li key={index}>
                                {electeur.numero_electeur} {electeur.date_parrainage}
                            </li>
                        ))
                    ) : (
                        <p>Aucun parrainage enregistré.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Statistiques;
