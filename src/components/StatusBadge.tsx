import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'Execução' | 'Finalização' | 'Planejamento';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'Execução':
        return { 
          backgroundColor: '#f9edbf', 
          borderRadius: '10px', 
          padding: '6px 18px', // Aumentando a largura
          fontSize: '14px' // Ajustando o tamanho da fonte para caber melhor
        };
      case 'Finalização':
        return { 
          backgroundColor: '#9bd9a9', 
          borderRadius: '10px', 
          padding: '6px 18px', // Aumentando a largura
          fontSize: '14px' // Ajustando o tamanho da fonte para caber melhor
        };
      case 'Planejamento':
        return { 
          backgroundColor: '#a8aecc', 
          borderRadius: '10px', 
          padding: '6px 18px', // Aumentando a largura
          fontSize: '14px' // Ajustando o tamanho da fonte para caber melhor
        };
      default:
        return { 
          borderRadius: '10px', 
          padding: '6px 18px', // Aumentando a largura
          fontSize: '14px' // Ajustando o tamanho da fonte para caber melhor
        };
    }
  };
  
  return (
    <span className={cn('status-badge', className)} style={getStatusStyle()}>
      {status}
    </span>
  );
};

export default StatusBadge;
