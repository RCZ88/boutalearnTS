import type { ReactNode } from "react";
import "./CardContainer.css";

export type Orientation = 'vertical' | 'horizontal';

type CardProps = {
    header?: String,
    label?: String,
    title?: String,
    orientation?: Orientation,
    children: ReactNode;
};

export function CardContainer({ header, label, title, orientation = 'vertical', children }: CardProps) {
    return (
        <div className= {`card-container`}>
            {header !== undefined &&  <h4{...{className:"card-header"}}>{header}</h4>}
            {label !== undefined && <label{...{className:"card-label"}}>{label}</label>}
            {title !== undefined && <h2 {...{className:"card-title"}}>{title}</h2>}
            <div className={`${orientation}`}>{children}</div>
        </div>
    );
}