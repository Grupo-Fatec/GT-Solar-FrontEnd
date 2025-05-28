import { StatusType } from "../types/Commission";

interface StatusBadgeComProps {
  status: "Pago" | "Não pago";
}

const StatusBadgeCom: React.FC<StatusBadgeComProps> = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "Pago":
        return {
          backgroundColor: "#9bd9a9", // verde suave
          borderRadius: "10px",
          padding: "6px 18px",
          fontSize: "14px"
        };
      case "Não pago":
        return {
          backgroundColor: "#fca5a5", // vermelho suave
          borderRadius: "10px",
          padding: "6px 18px",
          fontSize: "14px"
        };
      default:
        return {};
    }
  };

  return <span style={getStatusStyle()}>{status}</span>;
};

export default StatusBadgeCom;
