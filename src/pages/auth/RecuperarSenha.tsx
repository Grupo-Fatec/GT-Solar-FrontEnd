import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react';

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gtsolar-green-dark px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gtsolar-green mb-2">GT Solar</h1>
        <h2 className="text-gtsolar-text font-medium text-xl">Recuperar senha</h2>
        <p className="text-gray-500 text-lg mb-4">Informe seu e-mail e defina uma nova senha</p>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
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

          <div className="relative">
            <label htmlFor="newPassword" className="text-lg font-semibold text-gray-700">Nova senha</label>
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border-gray-300 focus:border-gtsolar-green focus:ring-gtsolar-green pr-10"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="text-lg font-semibold text-gray-700">Repita a nova senha</label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Repita a nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border-gray-300 focus:border-gtsolar-green focus:ring-gtsolar-green pr-10"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {/* Aqui a mensagem de sucesso abaixo do campo */}
            {successMessage && (
              <p className="mt-2 text-green-600 text-sm font-medium">
                {successMessage}
              </p>
            )}
          </div>

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
              onClick={() => navigate('/')}
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

