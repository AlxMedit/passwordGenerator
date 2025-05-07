import React, { useState } from 'react';

const GeneradorDeContraseñas = () => {
  // Estado para la longitud de la contraseña (por defecto 12)
  const [longitud, setLongitud] = useState(12);

  // Estado para saber si se deben incluir caracteres especiales
  const [usarCaracteresEspeciales, setUsarCaracteresEspeciales] = useState(false);

  // Contraseña generada
  const [contrasenaGenerada, setContrasenaGenerada] = useState('');

  // Estado para saber si la contraseña ha sido copiada
  const [copiada, setCopiada] = useState(false);

  // Estado para la animación de sacudida (shake)
  const [sacudida, setSacudida] = useState(false);

  // Función para generar la contraseña
  const generarContrasena = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const caracteresEspeciales = '!@#$%^&*()_+[]{}|;:,.<>?';
    const todosLosCaracteres = usarCaracteresEspeciales ? caracteres + caracteresEspeciales : caracteres;
    let contrasena = '';

    // Se genera la contraseña de manera aleatoria
    for (let i = 0; i < longitud; i++) {
      contrasena += todosLosCaracteres.charAt(Math.floor(Math.random() * todosLosCaracteres.length));
    }

    setContrasenaGenerada(contrasena);
    setCopiada(false); // Reiniciar el estado de copiado cuando se genera una nueva contraseña
    setSacudida(false); // Restablecer el estado de la sacudida
  };

  // Función para copiar la contraseña al portapapeles
  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(contrasenaGenerada);
    setCopiada(true); // Cambiar el estado a "copiada"
    setSacudida(true); // Animamos el botón al copiar
    setTimeout(() => setSacudida(false), 500); // Desactivar la sacudida después de 0.5 segundos
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Generador de Contraseñas</h2>

        {/* Formulario */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Longitud:</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLongitud(longitud - 1)}
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
          <label className="text-gray-700">¿Usar caracteres especiales?</label>
          <button
            onClick={() => setUsarCaracteresEspeciales(!usarCaracteresEspeciales)}
            className={`w-20 py-2 rounded-lg text-white ${usarCaracteresEspeciales ? 'bg-green-500' : 'bg-red-500'} hover:bg-opacity-80 transition`}
          >
            {usarCaracteresEspeciales ? 'SI' : 'NO'}
          </button>
        </div>

        {/* Generar */}
        <button
          onClick={generarContrasena}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Generar Contraseña
        </button>

        {/* Mostrar */}
        {contrasenaGenerada && (
          <div className="mt-4 text-center">
            <p className="text-xl font-semibold">{contrasenaGenerada}</p>
            <button
              onClick={copiarAlPortapapeles}
              className={`mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition ${sacudida ? 'animate-shake' : ''}`}
            >
              {copiada ? (
                <span className="animate-pulse">Copiado</span>
              ) : (
                'Copiar'
              )}
            </button>
          </div>
        )}
        <div className="mt-3">
          <a href="/">Volver al inicio</a>
        </div>
      </div>

    </div>
  );
};

export default GeneradorDeContraseñas;
