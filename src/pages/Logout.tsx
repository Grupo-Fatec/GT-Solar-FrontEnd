import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implementar lógica real de logout (ex: limpar tokens)
    console.log('Usuário desconectado');
    navigate('/login');
  };

  const handleCancel = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Confirmar Saída
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Tem certeza que deseja sair do sistema GT Solar?
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            variant="destructive"
            className="w-full text-sm md:text-base" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair do Sistema
          </Button>

          <Button 
            variant="outline" 
            className="w-full text-sm md:text-base" 
            onClick={handleCancel}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
