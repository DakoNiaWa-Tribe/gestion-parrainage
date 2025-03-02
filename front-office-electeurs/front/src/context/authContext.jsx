/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte plus facilement
export const useAuth = () => useContext(AuthContext);

// Provider qui englobe l'application
export const AuthProvider = ({ children }) => {
  const [isconnected, setIsconnected] = useState(false);

  return (
    <AuthContext.Provider value={{ isconnected, setIsconnected }}>
      {children}
    </AuthContext.Provider>
  );
};
