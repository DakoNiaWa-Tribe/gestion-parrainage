import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FirstPage() {
    const [numeroElecteur, setNumeroElecteur] = useState(""); 
    const [codeSecurite, setCodeSecurite] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const navigate = useNavigate(); 

    console.log('inCheckElecteur ', numeroElecteur)

    const checkElecteur = async () => {

        try {
            const response = await fetch("https://backend-fast-api-i1g8.onrender.com/candidat/check_request", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ numero_electeur: numeroElecteur }),
            });

            console.log("Numéro envoyé :", numeroElecteur);

            const data = await response.json();
            console.log("Réponse API :", data);

            if (response.ok) {
                localStorage.setItem("userDetails", JSON.stringify(data));
                console.log("Candidat trouvé :", data);
                navigate("/Statistiques", { state: { candidat: data } }); 
            } else {
                setErrorMessage(data.detail || "Numéro incorrect ou candidat déjà enregistré.");
            }
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            setErrorMessage("Problème de connexion à l'API.");
        }
    };

    return (
        <div className="cadre">
            <h1>BIENVENUE CHERS CANDIDATS</h1>
            <div className="div1">
                <label>Veuillez renseigner votre numéro de carte d'électeur :</label>
                <input 
                    type="text" 
                    value={numeroElecteur} 
                    onChange={(e) => setNumeroElecteur(e.target.value)} 
                    placeholder="Ex : 123456789" 
                />
            </div>

            <div className="div1">
                <label>Entrez le code de sécurité envoyé par mail :</label>
                <input 
                    type="text"
                    value={codeSecurite}
                    onChange={(e) => setCodeSecurite(e.target.value)}
                />

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 
            </div>
            <div>
                <button onClick={checkElecteur} className="linkButton">Enregistrer</button>
            </div>
        </div>
    );
}

export default FirstPage;
