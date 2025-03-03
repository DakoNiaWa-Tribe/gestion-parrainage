/* eslint-disable react/prop-types */
import { useState } from "react";

const ConfirmationParrainage = ({ selectedcandidat, setParainer, Parainer, onConfirm, confirmation }) => {
  const [codeConfirmation, setCodeConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codeConfirmation.trim()) {
      alert("Veuillez entrer un code de confirmation.");
      return;
    }

    // Récupérer les détails de l'utilisateur depuis localStorage
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log("userdetails info", userDetails);
    console.log("candidat  info", selectedcandidat);
    const numeroElecteur = userDetails?.numero_electeur; // Vérifie si userDetails existe

    if (!numeroElecteur) {
      alert("Erreur : Numéro électeur introuvable.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://backend-fast-api-i1g8.onrender.com/electeur/valider_parrainage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code_otp: codeConfirmation,
          id_candidat: selectedcandidat.id,
          numero_electeur: numeroElecteur, // Utilisation de la valeur du localStorage
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la validation du code.");
      }

      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      alert("Parrainage confirmé avec succès !");
      onConfirm(codeConfirmation);
      setParainer(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setParainer(!Parainer);
  };

  return (
    <div
      ref={confirmation}
      className="w-screen h-screen absolute z-20 top-0 flex justify-center items-center backdrop-blur-sm"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Confirmation de Parrainage
        </h2>

        <div className="bg-gray-100 p-3 rounded-md text-center mb-4 shadow-sm">
          <p className="text-lg font-medium">Candidat :</p>
          <p className="text-xl font-bold text-blue-600">{selectedcandidat.prenom} {selectedcandidat.nom}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-gray-600 text-sm font-medium">Code de confirmation :</label>
          <input
            type="text"
            maxLength="13"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow uppercase"
            placeholder="Entrez le code"
            value={codeConfirmation}
            onChange={(e) => setCodeConfirmation(e.target.value)}
            required
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 cursor-pointer"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>

            <button
              type="submit"
              className={`px-4 py-2 rounded-lg shadow-md text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} cursor-pointer` }
              disabled={loading}
            >
              {loading ? "Envoi..." : "Valider"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmationParrainage;
