import React from "react";

interface StatusBadgeComProps {
  status: "Pago" | "Não pago";
}

const StatusBadgeCom: React.FC<StatusBadgeComProps> = ({ status }) => {
  const getStatusStyle = () => {
    return {
      backgroundColor: status === "Pago" ? "#9bd9a9" : "#fca5a5",
      borderRadius: "10px",
      padding: "6px 18px",
      fontSize: "14px",
      whiteSpace: "nowrap", // impede quebra de linha
    };
  };

  return <span style={getStatusStyle()}>{status}</span>;
};

export default StatusBadgeCom;
