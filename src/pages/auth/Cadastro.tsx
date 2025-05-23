import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react';

const Cadastro = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateName = (value: string) => /^[A-Za-zÀ-ÿ\s]*$/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // Validar o nome
    if (!validateName(name)) {
      setError('O nome não pode conter números.');
      return;
    }

    // Caso tudo esteja correto
    console.log('Conta criada com:', { name, email, password });

    setSuccessMessage('Conta criada com sucesso!');
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/login'); // Redireciona para o login após 2 segundos
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gtsolar-green-dark px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gtsolar-green mb-2">GT Solar</h1>
        <h2 className="text-xl font-bold mb-2">Criar conta</h2>
        <p className="text-gtsolar-text text-lg mb-4">Preencha os dados abaixo para criar sua conta</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-lg font-semibold text-gray-700">Nome</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-lg font-semibold text-gray-700">E-mail</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-lg font-semibold text-gray-700">Senha</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="pr-10"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-lg font-semibold text-gray-700">Confirmar Senha</label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                className="pr-10"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm font-medium">{successMessage}</p>}

          <div className="space-y-2 pt-2">
            <Button
              type="submit"
              className="w-full bg-gtsolar-green-light hover:bg-gtsolar-green-hover text-white text-base"
            >
              Criar conta
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full text-base"
              onClick={() => navigate('/login')}
            >
              Voltar
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-base text-gray-600">
          Já possui uma conta?{' '}
          <a
            href="/login"
            className="text-green-600 hover:text-green-800"
          >
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
