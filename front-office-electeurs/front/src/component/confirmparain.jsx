/* eslint-disable react/prop-types */
import { useState } from "react";

const ConfirmationParrainage = ({ selectedcandidat,  setParainer,Parainer, onConfirm, confirmation }) => {
  const [codeConfirmation, setCodeConfirmation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!codeConfirmation.trim()) {
      alert("Veuillez entrer un code de confirmation.");
      return;
    }
    // Appelle la fonction de validation avec le code saisi
    onConfirm(codeConfirmation);
  };
    const onClose = () =>{
      setParainer(!Parainer)
    }
  return (
    <div 
      ref={confirmation}
    className="w-screen h-screen absolute z-20 top-0 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Confirmation de Parrainage
        </h2>

        {/* Affichage du candidat sélectionné */}
        <div className="bg-gray-100 p-3 rounded-md text-center mb-4 shadow-sm">
          <p className="text-lg font-medium">Candidat :</p>
          <p className="text-xl font-bold text-blue-600">{selectedcandidat.firstName}</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-gray-600 text-sm font-medium">
            Code de confirmation :
          </label>
          <input
            type="text"
            maxLength="13"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            placeholder="Entrez le code"
            value={codeConfirmation}
            onChange={(e) => setCodeConfirmation(e.target.value)}
            required
          />
          {/* Boutons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500"
              onClick={onClose}
            >
              Annuler
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
 export default ConfirmationParrainage;