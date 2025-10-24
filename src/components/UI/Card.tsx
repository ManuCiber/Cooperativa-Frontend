import type { CardProps } from "../../types/Components/Card";

const Card: React.FC<CardProps> = ({ title, className = "", children }) => {
  return (
    <div className={`rounded-lg shadow-md p-4 ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

export default Card;