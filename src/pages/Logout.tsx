import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você implementaria a lógica real de logout
    // Por exemplo, remover tokens, limpar o estado, etc.
    console.log('Usuário desconectado');
    
    // Redirecionar para a página inicial após o logout
    navigate('/login');
  };

  const handleCancel = () => {
    // Voltar para a página anterior
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center transform translate-x-10">
        <div className="mb-6">
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirmar Saída</h1>
          <p className="text-gray-600">
            Tem certeza que deseja sair do sistema GT Solar?
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button 
            variant="destructive"
            className="w-full" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair do Sistema
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
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
