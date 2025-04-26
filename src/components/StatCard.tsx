import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-600 font-medium mb-2">{title}</h3>
          <p className="text-4xl font-bold text-[#2B563B]">{value}</p>
        </div>
        <div className="text-[#2B563B]">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
