import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Cadastro from "./Cadastro";
import RecuperarSenha from "./RecuperarSenha";
import { AuthService } from "@/services/AuthService";

const authService = new AuthService();

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Controlando a visibilidade com um único estado

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await authService.login(email, password);
    if (res.status === 200) {
      navigate("/pages/");
    } else {
      alert("Erro ao fazer login");
      console.error("Erro ao fazer login:", res);
    }
    console.log(res.data);
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
            <h1 className="text-3xl font-bold text-center text-gtsolar-green mb-2">
              GT Solar
            </h1>

            <div className="mb-6">
              <h2 className="font-bold text-xl">Entre com suas credenciais</h2>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-gray-700"
                >
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
                <label
                  htmlFor="password"
                  className="block text-lg font-semibold text-gray-700"
                >
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
                <Button
                  variant="link"
                  className="text-green-600 hover:text-green-800"
                  onClick={() => navigate("/recuperar-senha")}
                >
                  Esqueceu sua senha?
                </Button>
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-gtsolar-green-light text-base text-white rounded mt-4"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
