import React from 'react';
import { cn } from '@/lib/utils';
import { StatusEnum } from '@/enums/StatusEnum';


interface StatusBadgeProps {
  status: StatusEnum;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  // Mapeia status em inglês para texto em português
  const statusPTMap: Record<StatusEnum, string> = {
    [StatusEnum.PLANNING]: 'Planejamento',
    [StatusEnum.EXECUTION]: 'Execução',
    [StatusEnum.IN_PROGRES]: 'Em Progresso',
    [StatusEnum.DONE]: 'Finalização',
    [StatusEnum.CANCELED]: 'Cancelado',
  };

  // Mapeia status para estilo
  const getStatusStyle = () => {
    switch (status) {
      case StatusEnum.EXECUTION:
        return {
          backgroundColor: '#f9edbf',
          borderRadius: '10px',
          padding: '6px 18px',
          fontSize: '14px',
        };
      case StatusEnum.DONE:
        return {
          backgroundColor: '#9bd9a9',
          borderRadius: '10px',
          padding: '6px 18px',
          fontSize: '14px',
        };
      case StatusEnum.PLANNING:
        return {
          backgroundColor: '#a8aecc',
          borderRadius: '10px',
          padding: '6px 18px',
          fontSize: '14px',
        };
      case StatusEnum.IN_PROGRES:
        return {
          backgroundColor: '#f0c987',
          borderRadius: '10px',
          padding: '6px 18px',
          fontSize: '14px',
        };
      case StatusEnum.CANCELED:
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
