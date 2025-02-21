/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import anime from "animejs";

const Candidat = ({ userDetails, profilImg }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [-20, 0],
      easing: "easeOutQuad",
      duration: 800,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white shadow-2xl w-[350px] rounded-3xl overflow-hidden flex flex-col items-center p-6"
    >
      {/* Partie 1: Profil */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden transition-transform transform hover:scale-110">
          <img src={profilImg} alt="Profil" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold">{userDetails.firstName} {userDetails.lastName}</h2>
      </div>

      <span className="bg-gray-300 w-full h-0.5 my-4 opacity-50"></span>

      {/* Partie 2: Infos Personnelles */}
      <div className="w-full text-gray-800 px-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Informations Personnelles</h3>
        <p className="text-sm"><span className="font-medium">Date de naissance :</span> {userDetails.birthDate}</p>
        <p className="text-sm"><span className="font-medium">Bureau de vote :</span> {userDetails.votingOffice}</p>
      </div>

      <span className="bg-gray-300 w-full h-0.5 my-4 opacity-50"></span>

      {/* Partie 3: Infos de Partie */}
      <div className="w-full bg-amber-100 p-4 rounded-xl text-center">
        <h3 className="text-lg font-semibold">Information de Partie</h3>
        <p className="text-sm text-gray-600">Détails à remplir...</p>
      </div>
    </div>
  );
};

export default Candidat;
