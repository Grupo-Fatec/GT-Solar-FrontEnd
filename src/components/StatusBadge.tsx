import React from 'react';
import { cn } from '@/lib/utils';

type StatusEnum = 'planning' | 'execution' | 'in_progress' | 'done' | 'canceled';

interface StatusBadgeProps {
  status: StatusEnum;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  // Mapeia status em inglês para texto em português
  const statusPTMap: Record<StatusEnum, string> = {
    planning: 'Planejamento',
    execution: 'Execução',
    in_progress: 'Em Progresso',
    done: 'Finalização',
    canceled: 'Cancelado',
  };

  // Mapeia status para estilo
  const getStatusStyle = () => {
    switch (status) {
      case 'execution':
        return {
          backgroundColor: '#f9edbf',
          borderRadius: '10px',
          padding: '6px 18px',
          fontSize: '14px',
        };
      case 'done':
        return {
          backgroundColor: '#9bd9a9',
          borderRadius: '10px',
          padding: '6px 18px',
          fontSize: '14px',
        };
      case 'planning':
        return {
          backgroundColor: '#a8aecc',
          borderRadius: '10px',
          padding: '6px 18px',
          fontSize: '14px',
        };
      case 'in_progress':
        return {
          backgroundColor: '#f0c987',
          borderRadius: '10px',
          padding: '6px 18px',
          fontSize: '14px',
        };
      case 'canceled':
        return {
          backgroundColor: '#f28b82',
          borderRadius: '10px',
          padding: '6px 18px',
          fontSize: '14px',
          color: 'white',
        };
      default:
        return {
          borderRadius: '10px',
          padding: '6px 18px',
          fontSize: '14px',
        };
    }
  };

  return (
    <span className={cn('status-badge', className)} style={getStatusStyle()}>
      {statusPTMap[status] || status}
    </span>
  );
};

export default StatusBadge;
