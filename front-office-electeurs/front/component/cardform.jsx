"use client";

import { useState, useRef } from "react";
import anime from "animejs";

const CardForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const cardRef = useRef(null);

  const handleToggleClick = () => {
    setIsSignUp(!isSignUp)
    anime({
      targets: cardRef.current,
      rotateY: isSignUp ? 0 : 180,
      easing: "easeInOutQuad",
      duration: 1000,
    });
  };

  return (

<   div className="flex flex-col  flex-1 justify-center items-center">

      <div
        ref={cardRef}
        className="relative w-96 min-h-[450px]  perspective-1000"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        {/* Login Form */}
        <div
          className={`absolute w-full min-h-full  p-6 bg-white rounded-xl shadow-xl transition-opacity   ${
            isSignUp ? "opacity-0 pointer-events-none duration-800 delay-200" : "opacity-100 delay-200 duration-1000"
          }`}
        >
            <div className="h-15 flex justify-center"> 
                    <img src="../public/img/logo.png" alt="" className="w-15 h-15" />       
            </div>
          <h2 className="text-2xl mb-4 text-center text-gray-800">Connexion</h2>
          <form className="flex flex-col gap-3">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="text"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
            <button className="bg-blue-600 text-white w-full p-2 rounded mt-3">
              Connexion
            </button>
            <button
              type="button"
              onClick={handleToggleClick}
              className="mt-3 text-blue-500 text-sm text-center"
            >
              Pas encore de compte ? Inscrivez-vous
            </button>
          </form>
        </div>

        {/* Signup Form */}
        <div
          className={`absolute w-full min-h-full  p-6 bg-white rounded-xl shadow-xl transition-opacity  ${
            isSignUp ? "opacity-100 delay-200 duration-1000" : "opacity-0 pointer-events-none  duration-600 delay-200"
          }`}
          style={{ transform: "rotateY(180deg)" }}
        >
            <div className="h-15 flex justify-center"> 
                    <img src="../public/img/logo.png" alt="" className="w-15 h-15" />       
            </div>
          <h2 className="text-2xl mb-4 text-center text-gray-800">Inscription</h2>
          <form className="flex flex-col gap-3">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Nom</label>
              <input
                type="text"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="text"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
            <button className="bg-blue-600 text-white w-full p-2 rounded mt-3">
              S`inscrire
            </button>
            <button
              type="button"
              onClick={handleToggleClick}
              className="mt-3 text-blue-500 text-sm text-center"
            >
              Déjà un compte ? Connectez-vous
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardForm ;
