import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
    {/* Header */}
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">Parrainage Électoral</h1>
        <nav className="hidden md:flex gap-6">
          <a href="#" className="hover:text-gray-200">Accueil</a>
          <a href="#" className="hover:text-gray-200">À propos</a>
          <a href="#" className="hover:text-gray-200">Contact</a>
        </nav>
        <div className="flex gap-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200">
            Connexion
          </button>
          <button className="bg-yellow-400 text-blue-800 px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500">
            Inscription
          </button>
        </div>
      </div>
    </header>

    {/* Contenu Principal */}
    <main className="flex-1  flex container mx-auto ">{children}</main>

    {/* Footer */}
    <footer className="bg-gray-800 text-gray-300 text-center py-4 ">
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
