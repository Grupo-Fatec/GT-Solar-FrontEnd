import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import Cadastro from './Cadastro';
import RecuperarSenha from './RecuperarSenha';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Controlando a visibilidade com um único estado

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div>
      {isRegistering ? (
        <Cadastro />
      ) : isRecovering ? (
        <RecuperarSenha />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gtsolar-green-dark px-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gtsolar-green mb-2">GT Solar</h1>

            <div className="mb-6">
              <h2 className="font-bold text-xl">Entre com suas credenciais</h2>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
                  Senha
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"} // Usando o estado de visibilidade para alternar entre texto e senha
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 pr-10 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Alternando a visibilidade da senha
                  className="absolute top-10 right-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setIsRecovering(true)}
                  className="text-gtsolar-green hover:underline text-base"
                >
                  Esqueci a senha
                </button>
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-gtsolar-green-light text-base text-white rounded mt-4"
              >
                Entrar
              </button>
            </form>

            <div className="mt-4 text-center text-base">
              <span>Não tem conta? </span>
              <button
                onClick={() => setIsRegistering(true)}
                className="text-gtsolar-green hover:underline text-base"
              >
                Cadastre-se
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
