/* eslint-disable react/prop-types */
import anime from "animejs";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Butlog = () => {
  return (
    <>
      <div className="flex gap-4 justify-center items-center">
        <NavLink to="/login">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer">
            Connexion
          </button>
        </NavLink>
        <NavLink to="/login">
          <button className="bg-yellow-400 text-blue-800 px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500 cursor-pointer">
            Inscription
          </button>
        </NavLink>
      </div>
    </>
  );
};

const Profil = ({ name, profilImg }) => {
  return (
    <>
      <div className="flex gap-4 justify-center items-center">
        <NavLink to="/login">
          <span>{name}</span>
        </NavLink>
        <NavLink
          to="/login"
          className="w-12 h-12 rounded-full overflow-hidden hover:scale-110 transition-transform ease-in"
        >
          <span className="w-full h-full bg-amber-400 block">
            <img
              src={profilImg}
              alt=""
              className="w-full h-full object-cover"
            />
          </span>
        </NavLink>
      </div>
    </>
  );
};

function Layout({ children }) {
  const name = "Samba";
  const profilImg = "img/tete-chat-profil_372268-573.jpg";
  // eslint-disable-next-line no-unused-vars
  const [isconnected, setIsconnected] = useState(false);
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
        anime({
          targets: headerRef.current, // Cible la div référencée
          translateY: [-100,0],
          duration: 1300,
          easing: 'easeOutSine', // Animation fluide
        });
        anime({
          targets: footerRef.current, // Cible la div référencée
          opacity: [0,1],
          duration: 1500,
          easing: 'easeInOutQuad', // Animation fluide
        });
      }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header 
        ref={headerRef}
        className="bg-[#144266] text-white shadow-lg w-full flex justify-between items-center p-4 md:px-6 md:h-[8vh]">
        <div className="flex justify-between items-center w-full max-w-screen-xxl  mx-auto">
          <div className="flex gap-4 items-center">
            <div className="flex justify-center items-center">
              <NavLink to="/">
                <img src="img/logo.png" alt="Logo" className="w-12 h-12 md:w-16 md:h-16 hidden md:block " />
              </NavLink>
            </div>
            <h1 className="text-2xl font-bold ">Parrainage Électoral</h1>
          </div>
          
          {/* Navigation - cachée sur petits écrans */}
          <nav className="hidden md:flex gap-6">
            <a href="#" className="hover:text-gray-200">À propos</a>
            <a href="#" className="hover:text-gray-200">Contact</a>
          </nav>

          {/* Profil / Connexion / Inscription */}
          <div className="flex gap-4 items-center">
            {isconnected ? (
              <Profil name={name} profilImg={profilImg} />
            ) : (
              <Butlog />
            )}
          </div>
        </div>
      </header>

      {/* Contenu Principal */}
      <main className="flex-1 flex w-full">{children}</main>

      {/* Footer */}
      <footer 
        ref={footerRef}
        className="bg-gray-800 text-gray-300 text-center py-4 ">
        <p>&copy; {new Date().getFullYear()} Parrainage Électoral - Tous droits réservés.</p>
      </footer>
    </div>
  );
}

// Validation des props
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

