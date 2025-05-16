import React from 'react';
import { BudgetStatus } from '../types/Budget';

interface StatusBadgeOrcProps {
  status: BudgetStatus;
}

const StatusBadgeOrc: React.FC<StatusBadgeOrcProps> = ({ status }) => {
  const getStatusStyles = (): React.CSSProperties => {
    switch (status) {
      case 'Aprovado':
        return {
          backgroundColor: '#9bd9a9',  // verde suave
          borderRadius: '10px', 
          padding: '6px 18px', // Aumentando a largura
          fontSize: '14px' ,
        };
      case 'Recusado':
        return {
          backgroundColor: '#fca5a5',  // vermelho suave
          borderRadius: '10px', 
          padding: '6px 18px', // Aumentando a largura
          fontSize: '14px' 
        };
      case 'Pendente':
      default:
        return {
          backgroundColor: '#f9edbf',  // amarelo suave
          borderRadius: '10px', 
          padding: '6px 18px', // Aumentando a largura
          fontSize: '14px' 
        };
    }
  };

  return <span style={getStatusStyles()}>{status}</span>;
};

export default StatusBadgeOrc;


