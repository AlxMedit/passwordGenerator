import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PasswordGenerator from './PasswordGenerator'; // Asegúrate de que la ruta del componente sea correcta
import RegistroAleatorio from './RegistroAleatorio'; // Asegúrate de que la ruta del componente sea correcta

// Componente para la página de inicio con los botones de navegación
const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Selecciona una opción</h2>

        {/* Botón para ir a la ruta de registro */}
        <button
          onClick={() => window.location.href = '/registroAleatorio'}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4 hover:bg-blue-600 transition"
        >
          Implementación del generador en un registro
        </button>

        {/* Botón para ir a la ruta del generador de contraseñas */}
        <button
          onClick={() => window.location.href = '/generar'}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Generar Contraseña Aleatoria
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página de inicio con los botones */}
        <Route path="/generar" element={<PasswordGenerator />} />  {/* Generador de contraseñas */}
        <Route path="/registroAleatorio" element={<RegistroAleatorio />} />  {/* Formulario de registro */}
      </Routes>
    </Router>
  );
}

export default App;
