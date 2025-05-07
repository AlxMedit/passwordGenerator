import React, { useState } from 'react';
import ojoAbierto from './ojoAbierto.svg';
import ojoCerrado from './ojoCerrado.svg';
import cerebro from './cerebro.svg';

const RegistroAleatorio = () => {
  const [longitud, setLongitud] = useState(12); // Longitud inicial de la contraseña
  const [usarCaracteresEspeciales, setUsarCaracteresEspeciales] = useState(false); // Si se deben incluir caracteres especiales
  const [contraseñaGenerada, setContraseñaGenerada] = useState(''); // Contraseña generada
  const [mostrarContraseña, setMostrarContraseña] = useState(false); // Mostrar u ocultar contraseña
  const [mostrarPopup, setMostrarPopup] = useState(false); // Mostrar u ocultar el pop-up de opciones
  const [contraseña, setContraseña] = useState(''); // Contraseña final seleccionada

  // Función para generar la contraseña
  const generarContraseña = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const caracteresEspeciales = '!@#$%^&*()_+[]{}|;:,.<>?';
    const opcionesÑ = ['ñ', 'Ñ']; // Opciones para agregar ñ o Ñ
    const todosLosCaracteres = usarCaracteresEspeciales ? caracteres + caracteresEspeciales : caracteres;

    let pass = '';
    for (let i = 0; i < longitud - 1; i++) {
      pass += todosLosCaracteres.charAt(Math.floor(Math.random() * todosLosCaracteres.length));
    }

    // Añadir una ñ o Ñ aleatoriamente para mayor seguridad
    const ñ = opcionesÑ[Math.floor(Math.random() * opcionesÑ.length)];
    const posInsertar = Math.floor(Math.random() * pass.length + 1);
    const contraseñaFinal = pass.slice(0, posInsertar) + ñ + pass.slice(posInsertar);

    setContraseñaGenerada(contraseñaFinal); // Establecer la contraseña generada
  };

  // Función para usar la contraseña generada
  const usarContraseña = () => {
    setContraseña(contraseñaGenerada); // Establecer la contraseña en el campo
    setMostrarPopup(false); // Cerrar el pop-up
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-2xl font-semibold text-center mb-4">Generador de Contraseñas</h2>

        {/* Campo de contraseña */}
        <div className="mb-4 relative">
          <label className="text-gray-700">Contraseña:</label>
          <div className="relative">
            <input
              type={mostrarContraseña ? 'text' : 'password'}
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full p-2 border rounded-md mt-2 pr-14"
            />
            <div className="absolute inset-y-0 right-2 flex items-center space-x-2 mt-2">
              <img
                src={mostrarContraseña ? ojoAbierto : ojoCerrado}
                alt="Ver contraseña"
                onClick={() => setMostrarContraseña(!mostrarContraseña)}
                className="w-6 h-6 cursor-pointer"
              />
              <img
                src={cerebro}
                alt="Generar contraseña"
                onClick={() => setMostrarPopup(true)}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Pop-up de generación */}
        {mostrarPopup && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-xl font-semibold mb-4">Generar Contraseña Aleatoria</h3>

              {/* Longitud */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-700">Longitud de la contraseña:</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setLongitud(longitud > 1 ? longitud - 1 : 1)}
                      className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={longitud}
                      onChange={(e) => setLongitud(Number(e.target.value))}
                      min="1"
                      className="w-20 p-2 border rounded-md text-center appearance-none"
                    />
                    <button
                      onClick={() => setLongitud(longitud + 1)}
                      className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* SpecChars */}
              <div className="mb-4 flex justify-between items-center">
                <label className="text-gray-700">Incluir caracteres especiales:</label>
                <button
                  onClick={() => setUsarCaracteresEspeciales(!usarCaracteresEspeciales)}
                  className={`w-20 py-2 rounded-lg text-white ${usarCaracteresEspeciales ? 'bg-green-500' : 'bg-red-500'
                    } hover:bg-opacity-80 transition`}
                >
                  {usarCaracteresEspeciales ? 'SI' : 'NO'}
                </button>
              </div>

              {/* Generar */}
              <button
                onClick={generarContraseña}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Generar Contraseña
              </button>

              {/* Ver contraseña */}
              {contraseñaGenerada && (
                <div className="mt-4 text-center">
                  <p className="text-xl font-semibold break-all">{contraseñaGenerada}</p>
                  {/* Usar la contraseña*/}
                  <button
                    onClick={usarContraseña}
                    className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Usar
                  </button>
                </div>
              )}

              <button
                onClick={() => setMostrarPopup(false)}
                className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        <div className="mt-3">
          <a href="/">Volver al inicio</a>
        </div>
      </div>
    </div>
  );
};

export default RegistroAleatorio;
