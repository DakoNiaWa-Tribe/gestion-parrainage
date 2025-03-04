/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const ConfirmationParrainage = ({ selectedcandidat, setParainer, Parainer, onConfirm, confirmation }) => {
  const [codeConfirmation, setCodeConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageErreur, setMessageErreur] = useState(null);
  const [formVALIDATE, setFormVALIDATE] = useState({
    numero_electeur: String(""),
    id_candidat:  String(selectedcandidat.id),
    code_otp: String(""),
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails?.numero_electeur) {
      setFormVALIDATE((prev) => ({
        ...prev,
        numero_electeur: userDetails.numero_electeur,
      }));
    }
  }, []);

  useEffect(() => {
    setFormVALIDATE((prev) => ({
      ...prev,
      code_otp: codeConfirmation,
    }));
  }, [codeConfirmation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codeConfirmation.trim()) {
      alert("Veuillez entrer un code de confirmation.");
      return;
    }

    if (!formVALIDATE.numero_electeur) {
      alert("Erreur : Numéro électeur introuvable.");
      return;
    }

    setLoading(true);
    setMessageErreur(null);
    console.log("teste: ",formVALIDATE)

    try {
      const response = await fetch("https://backend-fast-api-i1g8.onrender.com/electeur/valider_parrainage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formVALIDATE),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la validation du code.");
      }

      if (data.message === "Vous avez déjà voté") {
        setMessageErreur("Vous avez déjà voté");
      } else {
        alert("Parrainage confirmé avec succès !");
        onConfirm(codeConfirmation);
        setParainer(false);
      }
    } catch (error) {
      setMessageErreur(error.message);
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

        {messageErreur === "Vous avez déjà voté" ? (
          <div className="text-center text-red-600 font-semibold mb-4">
            {messageErreur}
          </div>
        ) : (
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
                className={`px-4 py-2 rounded-lg shadow-md text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} cursor-pointer`}
                disabled={loading}
              >
                {loading ? "Envoi..." : "Valider"}
              </button>
            </div>
          </form>
        )}

        {messageErreur && messageErreur !== "Vous avez déjà voté" && (
          <div className="text-center text-red-600 font-semibold mt-4">
            {messageErreur}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationParrainage;
