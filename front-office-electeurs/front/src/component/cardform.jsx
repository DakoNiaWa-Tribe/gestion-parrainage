/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";
import anime from "animejs";
import { useNavigate } from "react-router-dom";



const Preinscription = ({ isSignUp, handleToggleClick, formRef ,setPart, Part  ,setZone,Zone , setElecteur , formDataconnexion, setFormDataconnexion , formDatainscrip, setFormDatainscrip}) => {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChangeconnexion = (e) => {
    setFormDataconnexion({
      ...formDataconnexion,
      [e.target.name]: e.target.value, // Met à jour dynamiquement le bon champ
    });
  };
  const handleChangeinscrip = (e) => {
    setFormDatainscrip({
      ...formDatainscrip,
      [e.target.name]: e.target.value, // Met à jour dynamiquement le bon champ
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setZone("inscription");
    setSuccess(false);
    console.log(formDatainscrip);
    try {
      const response = await fetch("https://backend-fast-api-i1g8.onrender.com/electeur/check_parrain_registration/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDatainscrip),
      });

      const data = await response.json();
      console.log("preinscrition:", data)
      if (data[1] === 200) {
        setSuccess(true);
        setPart(!Part);
      } else {
        setError(data.message  || "Échec de l'inscription.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    console.log(formDataconnexion);
    setZone("connexion");

    
    try {
      const response = await fetch("https://backend-fast-api-i1g8.onrender.com/electeur/check_auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataconnexion),
      });

      const data = await response.json();


      if (data.status_code === 200 ) {
        console.log("response ok data: ",data.data[0])
        setSuccess(true);
        setElecteur(data.data[0]);
        setPart(!Part);
        console.log("Zone :",Part)
      } else {
        setError(data.message || "Échec de l'inscription.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
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
            {Zone ==="connexion" && error && (
              <div
                id="alert-box"
                className={`p-3 rounded-lg mb-4 ${
                  success === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {error}
              </div>
            )}
          <form className="flex flex-col gap-3" onSubmit={handleSignin}>
      <div>
        <label className="block text-gray-600 text-sm mb-1">Numéro de carte d’identité nationale</label>
        <input
          type="text"
          name="numero_id_national" // Correspond à l'objet `formDataconnexion`
          className="w-full p-2 rounded border border-gray-300"
          value={formDataconnexion.numero_id_national}
          onChange={handleChangeconnexion}
          minLength={17}
          maxLength={17}
          required
        />
      </div>
      <div>
        <label className="block text-gray-600 text-sm mb-1">Numéro de carte d’électeur</label>
        <input
          type="password"
          name="numero_electeur" // Correspond à l'objet `formDataconnexion`
          className="w-full p-2 rounded border border-gray-300"
          value={formDataconnexion.numero_electeur}
          onChange={handleChangeconnexion}
          minLength={9}
          maxLength={9}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white w-full p-2 rounded mt-3 flex items-center justify-center cursor-pointer disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>
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
      {Zone !="connexion" && error && (
        <div
          id="alert-box"
          className={`p-3 rounded-lg mb-4 ${
            success  ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {error}
        </div>
      )}

<form className="flex flex-col gap-3" onSubmit={handleSignup}>
      <div>
        <label className="block text-gray-600 text-sm mb-1">Nom de famille</label>
        <input
          type="text"
          name="nom_famille" // Correspond au JSON de la base
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          value={formDatainscrip.nom_famille}
          onChange={handleChangeinscrip}
          required
        />
      </div>
      <div>
        <label className="block text-gray-600 text-sm mb-1">Numéro de carte d’identité nationale</label>
        <input
          type="text"
          name="numero_id_national" // Correspond au JSON de la base
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          value={formDatainscrip.numero_id_national}
          onChange={handleChangeinscrip}
          minLength={17}
          maxLength={17}
          required
        />
      </div>
      <div>
        <label className="block text-gray-600 text-sm mb-1">Numéro de carte d’électeur</label>
        <input
          type="text"
          name="numero_electeur" // Correspond au JSON de la base
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          value={formDatainscrip.numero_electeur}
          onChange={handleChangeinscrip}
          minLength={9}
          maxLength={9}
          required
        />
      </div>
      <div>
        <label className="block text-gray-600 text-sm mb-1">Numéro du bureau de vote</label>
        <input
          type="text"
          name="numero_bureau" // Correspond au JSON de la base
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          value={formDatainscrip.numero_bureau}
          onChange={handleChangeinscrip}
          required
        />
      </div>
      
      <button
        type="submit"
        className="bg-blue-600 text-white w-full p-2 rounded mt-3 flex items-center justify-center cursor-pointer disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>
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


const InscriptionPart2 = ({formRef , formDatainscrip,setPart,Part }) => {
  
  const [formData, setFormData] = useState({
    numero_id_national: formDatainscrip.numero_id_national,
    numero_tel: "",
    adresse_mail: "",
    nom: formDatainscrip.nom_famille,
    numero_electeur: formDatainscrip.numero_electeur,
    numero_bureau: formDatainscrip.numero_bureau,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Mise à jour dynamique des champs
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("https://backend-fast-api-i1g8.onrender.com/electeur/confirmation_parrain_registration/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Envoi des données en JSON
      });

      const data = await response.json();
        console.log("inscrition:", data)

      if (data[1] === 200) {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
          setPart(!Part);
        }, 2000);
        console.log("Inscription réussie part ",Part);
      } else {
        setError(data.message || "Échec de l'inscription.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

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
          <form className="flex flex-col gap-3" onSubmit={handleSignup}>
      <div>
        <label className="block text-gray-600 text-sm mb-1">Email</label>
        <input
          type="email"
          name="adresse_mail" // Correspond à la base de données
          className="w-full p-2 rounded border border-gray-300"
          value={formData.adresse_mail}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-600 text-sm mb-1">Numéro de téléphone</label>
        <input
          type="text"
          name="numero_tel" // Correspond à la base de données
          className="w-full p-2 rounded border border-gray-300"
          value={formData.numero_tel}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div>
        <label className="block text-gray-600 text-sm mb-1">Numéro de carte d’identité nationale</label>
        <input
          type="text"
          name="numero_id_national" // Correspond à la base de données
          className="w-full p-2 rounded border border-gray-300"
          value={formData.numero_id_national}
          onChange={handleChange}
          minLength={17}
          maxLength={17}
          required
        />
      </div> */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Inscription réussie !</p>}
      <button
        type="submit"
        className="bg-blue-600 text-white w-full p-2 rounded mt-3 flex items-center justify-center cursor-pointer disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>
        ) : (
          "S'inscrire"
        )}
      </button>
    </form>
        </div>
   
        </>
  );
};
  const Connectionpart2 = ({ formRef , isconnected , setIsconnected,Electeur,userDetails}) => {
    const [authCode, setAuthCode] = useState("");  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

  
    useEffect(() => {
      anime({
        targets: formRef.current,
        opacity: 1,
        scale: [0.95, 1],
        duration: 1000,
        easing: "easeInOutQuad",
      });
    }, []);
  
    const handleChange = (e) => {
      setAuthCode(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setSuccess(false);
  
      const payload = {
        numero_id_national: userDetails.numero_id_national,
        numero_electeur: userDetails.numero_electeur,
        code_securite: authCode, // Le code d'authentification entré par l'utilisateur
      };
  
      try {
        const response = await fetch("https://backend-fast-api-i1g8.onrender.com/electeur/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        const data = await response.json();

        console.log("connection:", data)

  
        if (data.status_code === 200) {
          setSuccess(true);
          console.log("Authentification réussie !");
          setIsconnected(true);
          navigate("/");
        } else {
          setError(data.message || "Échec de l'authentification.");
        }
      } catch (err) {
        setError("Erreur de connexion au serveur.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div
        ref={formRef}
        className="absolute w-full min-h-full p-6 bg-white rounded-2xl shadow-lg transition-opacity transform"
      >
        <div className="flex justify-center mb-6">
          <img src="img/logo.png" alt="Logo" className="w-20 h-20" />
        </div>
  
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Connexion (Partie 2)
        </h2>
  
        <div className="text-gray-800 bg-gray-100 p-4 rounded-lg mb-6 shadow-sm">
          <p className="text-lg font-medium">
            Nom : <span className="font-semibold">{userDetails.prenom} {userDetails.nom}</span>
          </p> 
          <p className="text-lg font-medium">
            Date de naissance : <span className="font-semibold">{userDetails.date_naissance}</span>
          </p>
          <p className="text-lg font-medium">
            Bureau de vote : <span className="font-semibold">{userDetails.numero_bureau}</span>
          </p>
        </div>
  
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Code d&apos;authentification
            </label>
            <input
              type="text"
              name="code_auth"
              value={authCode}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow uppercase"
              placeholder="Entrez votre code"
              required
            />
          </div>
  
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">Connexion validée !</p>}
  
          <button
          className="bg-blue-600 text-white w-full p-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-md disabled:bg-gray-400 flex justify-center items-center gap-2"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>
              Validation...
            </>
          ) : (
            "Valider"
          )}
        </button>
        </form>
      </div>
    );
  };

const Postinscription = ({formRef , Zone, userDetails, isconnected,setIsconnected ,Electeur, formDatainscrip , Part,setPart}) => {
  return (
        <>
          {Zone === "connexion" ? <Connectionpart2 formRef={formRef} userDetails={userDetails} isconnected={isconnected} setIsconnected={setIsconnected} Electeur={Electeur} /> : <InscriptionPart2 formRef={formRef} formDatainscrip={formDatainscrip} setPart={setPart} Part={Part} />}
   
        </>
  );
};

const CardForm = ({isconnected,setIsconnected}) => {
  const [Zone, setZone] = useState("connexion");
  const [isSignUp, setIsSignUp] = useState(false);
  const [Electeur, setElecteur] = useState({
    nom: "",
    prenom: "",
    cni: "",
    numero_electeur: "",
    bureau_vote: "",
    date_naissance:""
  });
  const [formDatainscrip, setFormDatainscrip] = useState({
    nom_famille: "",
    numero_id_national: "",
    numero_electeur: "",
    numero_bureau: "",
  });
  const [formDataconnexion, setFormDataconnexion] = useState({
    numero_electeur: "",
    numero_id_national: "",
  });
  const [part, setPart] = useState(true);
  const cardRef = useRef(null);
  const Zoomref = useRef(null);
  const formRef = useRef(null);
  const [userDetails, setUserDetails] = useState(null);



  const fetchUserDetails = () => {
    try {
      if (Electeur) {
        const user = {
          nom: Electeur.nom,
          prenom: Electeur.prenom,
          numero_id_national: Electeur.cni,
          numero_electeur: Electeur.numero_electeur,
          numero_bureau: Electeur.bureau_vote,
          date_naissance: Electeur.date_naissance,
        };
        setUserDetails(user);
        localStorage.setItem("userDetails", JSON.stringify(user));
      } 
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, [Electeur]); 

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
          <Preinscription isSignUp={isSignUp} handleToggleClick={handleToggleClick} formRef={formRef} setPart={setPart} Part={part}  setZone={setZone} Zone={Zone} Electeur={Electeur} setElecteur={setElecteur}  formDatainscrip={formDatainscrip} setFormDatainscrip={setFormDatainscrip} formDataconnexion={formDataconnexion} setFormDataconnexion={setFormDataconnexion}/>
        ) : (
          <Postinscription formRef={formRef} Zone={Zone} isconnected={isconnected} setIsconnected={setIsconnected} formDatainscrip={formDatainscrip} Electeur={Electeur} userDetails={userDetails} setPart={setPart} Part={part}  />
        )}
         
      </div>
    </div>
  );
};


export default CardForm ;


