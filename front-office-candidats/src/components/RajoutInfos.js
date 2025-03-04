import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RajoutInfos() {
    const navigate = useNavigate();
    const location = useLocation();
    const candidat = location.state?.candidat; 

    const [email, setEmail] = useState(""); 
    const [telephone, setTelephone] = useState(""); 
    const [nomParti, setNomParti] = useState(""); 
    const [slogan, setSlogan] = useState(""); 
    const [photo, setPhoto] = useState(null); 
    const [couleurs, setCouleurs] = useState(["", "", ""]); 
    const [errorMessage, setErrorMessage] = useState(""); 

    // Fonction de soumission du formulaire
    const handleSubmit = async () => {
        if (!email || !telephone || !nomParti || !slogan || !photo) {
            setErrorMessage("Tous les champs doivent être remplis !");
            return;
        }

        // Création de l'objet FormData pour envoyer les données (y compris la photo)
        const formData = new FormData();
        formData.append("email", email);
        formData.append("telephone", telephone);
        formData.append("nom_parti", nomParti);
        formData.append("slogan", slogan);
        formData.append("photo", photo);
        formData.append("couleurs", JSON.stringify(couleurs));
        formData.append("numero_candidat", candidat?.numeroCandidat); 

        try {
            const response = await fetch("https://backend-fast-api-i1g8.onrender.com/candidat/registration", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Candidat enregistré :", data);
                navigate("/Enregistrement"); // Redirection après succès
            } else {
                setErrorMessage("Erreur lors de l'enregistrement : " + data.detail);
            }
        } catch (error) {
            console.error("Erreur API :", error);
            setErrorMessage("Problème de connexion avec le serveur.");
        }
    };

    return (
        <div className="cadre">
            <h1>Informations complémentaires</h1>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Affichage de l'erreur */}

            <div>
                <label>Email</label><br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre mail"
                />
            </div>

            <div>
                <label>Téléphone</label><br />
                <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="Entrez votre numéro de téléphone"
                />
            </div>

            <div>
                <label>Nom du parti politique</label><br />
                <textarea
                    value={nomParti}
                    onChange={(e) => setNomParti(e.target.value)}
                    placeholder="Entrez le nom du parti"
                />
            </div>

            <div>
                <label>Slogan</label><br />
                <textarea
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    placeholder="Cherchez à attirer l'attention de l'électeur"
                />
            </div>

            <div>
                <label>Photo</label><br />
                <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    accept="image/*"
                />
            </div>

            <div>
                <label>Choisissez les trois couleurs de votre parti</label><br />
                {couleurs.map((color, index) => (
                    <input
                        key={index}
                        type="color"
                        value={color}
                        onChange={(e) => {
                            const newColors = [...couleurs];
                            newColors[index] = e.target.value;
                            setCouleurs(newColors);
                        }}
                    />
                ))}
            </div>

            <button onClick={handleSubmit} className="linkButton">Valider</button>
        </div>
    );
}

export default RajoutInfos;
