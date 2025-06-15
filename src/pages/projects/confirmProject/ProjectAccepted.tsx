import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useParams } from 'react-router-dom';

export default function ProjectAccepted() {
    const {id} = useParams();
  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4F8A6E] mb-4">
          Projeto {id} Aceito com Sucesso! 🎉
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Obrigado por confirmar sua participação neste projeto. Entraremos em contato com mais informações em breve.
        </p>
      </div>
    </div>
  );
}
