import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login logic
    if (email === "test@example.com" && password === "password") {
      navigate("/dashboard"); // Redirect to dashboard or any protected route
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <body>
      <header className="flex bg-[#2B5337] w-full h-[60px] text-center items-center justify-center">
        <h1 className="text-white text-2xl font-bold">GT Solar</h1>
      </header>
      <Card className="shadow-2xl w-[500px] h-[500px] flex flex-col items-center justify-center mx-auto mt-20 p-3">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin} className="w-full h-fit">
          
          <Label className="text-xl font-light">Email</Label>
          <Input className="w-full mb-6" />

          <Label className="text-xl font-light">Senha</Label>
          <Input className="w-full mb-6" />

          <div className="flex justify-center items-center mt-4 w-full p-4">
            <Button className="bg-[#2B5337] w-[200px] p-3">Entrar</Button>
          </div>
        </form>
      </Card>
    </body>
  );
};

export default Login;
