/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";
import anime from "animejs";



const Preinscription = ({ isSignUp, handleToggleClick, formRef ,setPart, Part  ,setZone,Zone }) => {
  
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' ou 'error'

  // Simulation de l'inscription
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertMessage('');
    setZone("inscription");



    
    // Simulation d'une requête à l'API
    setTimeout(() => {
      const success = Math.random() > 0.5; // Random pour simuler succès/échec
      if (success) {
          setPart(!Part)

        setAlertMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
      } else {
        setAlertMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
        setAlertType('error');
      }
      setLoading(false);

      // Animation d'apparition de l'alert
    }, 2000); // Simulation d'un délai de 2s
  };
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertMessage('');
    setZone("connexion");

    // Simulation d'une requête à l'API
    setTimeout(() => {
      const success = Math.random() > 0.5; // Random pour simuler succès/échec
      if (success) {
          setPart(!Part)

        setAlertMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
      } else {
        setAlertMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
        setAlertType('error');
      }
      setLoading(false);

      // Animation d'apparition de l'alerte
      anime({
        targets: '#alert-box',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 8000,
        easing: 'easeOutExpo',
      });
    }, 2000); // Simulation d'un délai de 2s
  };


  return (

        <>
         {/* Login Form */}
         <div
          ref={formRef}
          className={`absolute w-full min-h-3/4  p-6 bg-white rounded-xl shadow-xl transition-opacity   ${
            isSignUp ? "opacity-0 pointer-events-none duration-800 delay-200" : "opacity-100 delay-200 duration-1000"
          }`}
        >
            <div className="h-15 flex justify-center"> 
                    <img src="/img/logo.png" alt="" className="w-15 h-15" />       
            </div>
          <h2 className="text-2xl mb-4 text-center text-gray-800">Connexion</h2>
            {/* Alerte stylée */}
            {Zone ==="connexion" && alertMessage && (
              <div
                id="alert-box"
                className={`p-3 rounded-lg mb-4 ${
                  alertType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {alertMessage}
              </div>
            )}
          <form className="flex flex-col gap-3" onSubmit={handleSignin}>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Numéro de carte d’identité nationale</label>
              <input
                type="text"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Numéro de carte d’électeur</label>
              <input
                type="password"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
            <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded mt-3 flex items-center justify-center cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid "></span>
          ) : (
            "Connexion"
          )}
        </button>
            <button
              type="button"
              onClick={handleToggleClick}
              className="mt-3 text-blue-500 text-sm text-center cursor-pointer"
            >
              Pas encore de compte ? Inscrivez-vous
            </button>
          </form>
        </div>
        {/* Signup Form */}
        <div
        ref={formRef}
      className={`absolute w-full min-h-full p-6 bg-white rounded-xl shadow-xl transition-opacity ${
        isSignUp
          ? 'opacity-100 delay-200 duration-1000'
          : 'opacity-0 pointer-events-none duration-600 delay-200'
      }`}
      style={{ transform: 'rotateY(180deg)' }}
    >
      <div className="h-15 flex justify-center">
        <img src="img/logo.png" alt="Logo" className="w-15 h-15" />
      </div>
      <h2 className="text-2xl mb-4 text-center text-gray-800">Inscription</h2>

      {/* Alerte stylée */}
      {Zone !="connexion" && alertMessage && (
        <div
          id="alert-box"
          className={`p-3 rounded-lg mb-4 ${
            alertType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {alertMessage}
        </div>
      )}

      <form className="flex flex-col gap-3" onSubmit={handleSignup}>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Nom de famille</label>
          <input
            type="text"
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Numéro de carte d’identité nationale</label>
          <input
            type="text"
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Numéro de carte d’électeur</label>
          <input
            type="text"
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Numéro du bureau de vote</label>
          <input
            type="password"
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded mt-3 flex items-center justify-center cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid "></span>
          ) : (
            "S'inscrire"
          )}
        </button>
        <button
          type="button"
          onClick={handleToggleClick}
          className="mt-3 text-blue-500 text-sm text-center cursor-pointer"
        >
          Déjà un compte ? Connectez-vous
        </button>
      </form>
    </div>

    
   
        </>
  );
};


const InscriptionPart2 = ({formRef}) => {
  useEffect(() => {
    anime({
      targets: formRef.current, // Cible la div référencée
      opacity: [0,1],
      duration: 1000,
      // Durée de l'animation 
      easing: 'easeInOutQuad', // Animation fluide
    });
  }, []);
  return (

        <>
        {/* Signup Form */}
        <div
          ref={formRef}
          className={`absolute w-full   p-6 bg-white rounded-xl shadow-xl transition-opacity rotate-y-180 `}
        >
            <div className="h-15 flex justify-center"> 
                    <img src="img/logo.png" alt="" className="w-15 h-15" />       
            </div>
          <h2 className="text-2xl mb-4 text-center text-gray-800">Inscription</h2>
          <form className="flex flex-col gap-3">
          
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="text"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div> 
            <div>
              <label className="block text-gray-600 text-sm mb-1">Numéro de telephone</label>
              <input
                type="text"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
            <button className="bg-blue-600 text-white w-full p-2 rounded mt-3">
              S`inscrire
            </button>
            <button
              type="button"
              className="mt-3 text-blue-500 text-sm text-center"
            >
            </button>
          </form>
        </div>
   
        </>
  );
};
const Connectionpart2 = ({formRef , userDetails}) => {
  useEffect(() => {
    anime({
      targets: formRef.current, // Cible la div référencée
      opacity: 1,
      scale: [0.95,1],
      duration: 1000,
      // Durée de l'animation 
      easing: 'easeInOutQuad', // Animation fluide
    });
  }, []);

  return (

        <>
        {/* Signup Form */}
        <div
      ref={formRef}
      className="absolute w-full min-h-full p-6 bg-white rounded-2xl shadow-lg transition-opacity transform "
    >
      <div className="flex justify-center mb-6">
        <img src="img/logo.png" alt="Logo" className="w-20 h-20" />
      </div>

      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Connexion (Partie 2)
      </h2>

      <div className="text-gray-800 bg-gray-100 p-4 rounded-lg mb-6 shadow-sm">
        <p className="text-lg font-medium">Nom : <span className="font-semibold">{userDetails.firstName} {userDetails.lastName}</span></p>
        <p className="text-lg font-medium">Date de naissance : <span className="font-semibold">{userDetails.birthDate}</span></p>
        <p className="text-lg font-medium">Bureau de vote : <span className="font-semibold">{userDetails.votingOffice}</span></p>
      </div>

      <form className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Code d&apos;authentification
          </label>
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            placeholder="Entrez votre code"
          />
        </div>

        <button
          className="bg-blue-600 text-white w-full p-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-md"
          type="submit"
        >
          Valider
        </button>
      </form>
    </div>
        </>
  );
};
const Postinscription = ({formRef , Zone, userDetails}) => {
  return (
        <>
          {Zone === "connexion" ? <Connectionpart2 formRef={formRef} userDetails={userDetails}/> : <InscriptionPart2 formRef={formRef}/>}
   
        </>
  );
};

const CardForm = () => {
  const [Zone, setZone] = useState("connection");
  const [isSignUp, setIsSignUp] = useState(false);
  const [part, setPart] = useState(true);
  const cardRef = useRef(null);
  const Zoomref = useRef(null);
  const formRef = useRef(null);
  const [userDetails] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    birthDate: "12/04/1990",
    votingOffice: "Bureau 12",
  });



  
    useEffect(() => {
      anime({
        targets: Zoomref.current, // Cible la div référencée
        opacity: 1,
        scale: [0.95,1],
      duration: 1000,
        delay: 1600, // Durée de l'animation 
        easing: 'easeInOutQuad', // Animation fluide
      });
    }, []);

  const handleToggleClick = () => {
    setIsSignUp(!isSignUp)
    anime({
      targets: cardRef.current,
      rotateY: isSignUp ? 0 : 180,
      easing: "easeInOutQuad",
      duration: 1000,
    });
  };
  useEffect(() => {
    if (formRef.current && cardRef.current) {
      // Récupérer la hauteur de l'enfant visible
      const formHeight = formRef.current.offsetHeight;
      cardRef.current.style.height = `${formHeight}px`;
      console.log(formRef.current.offsetHeight);
    }
  }, [isSignUp]);

  return (

<div 
  ref={Zoomref}
  className="flex flex-col  flex-1 min-h-auto justify-center items-center opacity-0">

      <div
        ref={cardRef}
        className="relative w-96 min-h-[450px] flex items-center  perspective-1000 "
        style={{ perspective: "1000px", transformStyle: "preserve-3d",  }}
      >

        {part ? (
          <Preinscription isSignUp={isSignUp} handleToggleClick={handleToggleClick} formRef={formRef} setPart={setPart} Part={part}  setZone={setZone} Zone={Zone}/>
        ) : (
          <Postinscription formRef={formRef} Zone={Zone} userDetails={userDetails} />
        )}
         
      </div>
    </div>
  );
};


export default CardForm ;


