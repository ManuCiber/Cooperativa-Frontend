import type { CardProps } from "../types/Card";

const Card = ({title, icon, children}: CardProps) => {
    return(
        <div>
            <h2>
                {icon && <i className={icon}></i>}
                {title}
            </h2>
            <div className="text-gray-700 font-bold text-xl">{children}</div>
        </div>
    )
}

export default Card;