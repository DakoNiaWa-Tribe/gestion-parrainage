/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import anime from "animejs";
import {useNavigate } from "react-router-dom";

const CandidatCard = ({ candidatDetails,setSelectedcandidat,setParainer,Parainer,isconnected }) => {
  const cardRef = useRef(null);
  const [loading, setLoading] =  useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (candidatDetails) {
      anime({
        targets: cardRef.current,
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: "easeOutQuad",
        duration: 1200,
      });
    }
  }, [candidatDetails]);


  const handleClick = (candidatDetails) => {
    setSelectedcandidat(candidatDetails);
    console.log("Candidat sélectionné :", candidatDetails);
    setParainer(!Parainer);
  };

  const pushlog = () => {
    navigate("/login");
    console.log("Redirection vers la page de connexion.");
  };
  const [user, setUser] = useState(() => {
    // Vérifier si une valeur existe dans le localStorage
    const user = localStorage.getItem("userDetails");
    return user ? JSON.parse(user) : { nom: "unknown" };
  });
   console.log("user is,",user)
  const handleParrainage = async () => {
    if (!isconnected) return pushlog();
    
    setLoading(true); 
   

    if (!user || !user.numero_id_national || !user.numero_electeur) {
      console.error("Erreur : informations utilisateur incomplètes.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://backend-fast-api-i1g8.onrender.com/electeur/get_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero_id_national: user.numero_id_national,
          numero_electeur: user.numero_electeur,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status_code === 200) {
        handleClick(candidatDetails);
      } else {
        alert(data.message);
        console.error("Erreur de parrainage :", data.message);
      }
    } catch (err) {
      console.error("Erreur de connexion :", err);
    } finally {
      setLoading(false); // Désactiver le spinner
    }
  };
  const getBackgroundColor = (color) => {
    return color && color.startsWith("#") ? color : "white";
  };
  const getProfileImage = (candidatDetails) => {
    if (candidatDetails.photo_url) {
      return candidatDetails.photo_url;
    }
    return candidatDetails.sexe === "F" ? "/img/logF.svg" : "/img/logM.svg";
  };

  return (
    <>
     <div
      ref={cardRef}
      className={` relative w-full h-[70vh] rounded-xl shadow-lg  overflow-hidden  text-white flex flex-col items-centerborder-4 p-0.5  drop-shadow-xl  bg-[#021c25]  `}
    >
       <div
      className={`relative flex items-center justify-between   text-white z-[1] opacity-90 rounded-xl  bg-[#021c25] flex-col  w-full h-full max-md: overflow-y-auto `}
      >

         {/* Profil */}
      <div className="flex w-full h-[35%]  mt-2 flex-col items-center justify-center gap-4">
        <div className="min-w-[100px] min-h-[100px] w-[15vh] h-[15vh]  rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img src={getProfileImage(candidatDetails)} alt="Profil" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-3xl font-bold text-center">{candidatDetails.prenom} {candidatDetails.nom}</h2>
      </div>

      <span className="bg-white w-3/4 h-0.5 my-4 opacity-50"></span>

      {/* Slogan */}
      <div className="w-full h-fit text-center italic text-lg md:text-xl font-semibold mt-2 opacity-90">
        &quot;{candidatDetails.slogan} &quot;  
      </div>

      <span className="bg-white w-3/4 h-0.5 my-2 opacity-50"></span>

      {/* Infos Personnelles */}
      <div className="w-full text-center h-[13%] text-sm  md:text-base ">
        <h3 className="text-lg font-semibold mb-2">Informations Personnelles</h3>
        <p>🎂 <span className="font-medium">Date :</span> {candidatDetails.date_naissance}</p>
        <p>🗳️<span className="font-medium  ">URL :</span>  <a href={candidatDetails.page_info_url} className=" capitalize underline decoration-blue-300  fw-bolder" > {candidatDetails.page_info_url}</a> </p>
      </div>

      <span className="bg-white w-3/4 h-0.5 my-2 opacity-50"></span>

      {/* Infos Parti */}
      <div className="w-2/3 p-3 md:p-4 rounded-lg  text-center bg-white text-gray-900 border-2 border-gray-300 shadow-md">
        <h3 className="text-lg font-semibold">Parti Politique</h3>
        <p className="text-sm">🏛️ <span className="font-medium"></span> {candidatDetails.parti_politique}</p>
      </div>
        {/* Couleurs des Partis */}
      
      {/* Bouton Parrainer */}
      <div className="relative group mb-4 mt-3">
      <button
        className="relative inline-block p-px font-semibold leading-6 text-white bg-neutral-600 
                   shadow-2xl cursor-pointer rounded-2xl shadow-emerald-900 transition-all 
                   duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-emerald-600"
        onClick={handleParrainage}
        disabled={loading}
      >
        <span
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 
                     to-sky-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        ></span>
        <span className="relative z-10 block px-6 py-3 rounded-2xl bg-neutral-950 flex items-center gap-2">
          {loading ? (
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>
          ) : (
            <>
              <span className="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-200">
                Parrainer
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-200"
              >
                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
              </svg>
            </>
          )}
        </span>
      </button>
      </div>
      </div>

        <div
          className="absolute w-full h-100 blur-[50px] -left-1/2 -top-1/2"
          style={{ backgroundColor: getBackgroundColor(candidatDetails.couleur_parti_1) }}
        ></div>

        <div
          className="absolute w-[30%] h-50 blur-[50px] left-[70%] top-[80%]"
          style={{ backgroundColor: getBackgroundColor(candidatDetails.couleur_parti_2) }}
        ></div>

        <div
          className="absolute w-[100%] h-50 blur-[70px] left-[0%] top-[30%]"
          style={{ backgroundColor: getBackgroundColor(candidatDetails.couleur_parti_3) }}
        ></div>
    </div>
    </>
   
  );
};
export default CandidatCard;