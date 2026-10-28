import type { ReactNode } from "react";
import "./CardContainer.css";

type CardProps = {
    header?: String,
    label?: String,
    title?: String,
    children: ReactNode;
};

export function CardContainer({ header, label, title, children }: CardProps) {
    return (
        <>
            {header !== undefined &&  <h4{...{className:"card-header"}}>{header}</h4>}
            {label !== undefined && <label{...{className:"card-label"}}>{label}</label>}
            {title !== undefined && <h2 {...{className:"card-title"}}>{title}</h2>}
            <div className="card">{children}</div>
        </>
    );
}