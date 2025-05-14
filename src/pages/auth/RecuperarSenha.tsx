import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react';

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Usando o mesmo estado para as duas senhas
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    console.log('Recuperação de senha com:', { email, newPassword });

    setSuccessMessage('Senha redefinida com sucesso!');
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/login'); // Redireciona para o login após 2 segundos
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gtsolar-green-dark px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        {successMessage && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm">
            {successMessage}
          </div>
        )}
        <h1 className="text-3xl font-bold text-center text-gtsolar-green mb-2">GT Solar</h1>
        <h2 className="text-gtsolar-text font-medium text-xl">Recuperar senha</h2>
        <p className="text-gray-500 text-lg mb-4">Informe seu e-mail e defina uma nova senha</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-lg font-semibold text-gray-700">E-mail</label>
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-gray-300 focus:border-gtsolar-green focus:ring-gtsolar-green"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="text-lg font-semibold text-gray-700">Nova senha</label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="border-gray-300 focus:border-gtsolar-green focus:ring-gtsolar-green"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-lg font-semibold text-gray-700">Repita a nova senha</label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repita a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-gray-300 focus:border-gtsolar-green focus:ring-gtsolar-green"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Alterna o estado de visibilidade
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          <div className="space-y-2 pt-2">
            <Button
              type="submit"
              className="w-full bg-gtsolar-green-light hover:bg-gtsolar-green-hover text-base text-white"
            >
              Redefinir senha
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full text-base"
              onClick={() => navigate('/')}  // Botão de voltar para o login
            >
              Voltar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecuperarSenha;
