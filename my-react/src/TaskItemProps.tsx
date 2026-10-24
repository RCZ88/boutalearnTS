import type {CSSProperties} from "react";


export type Status = 'pending' | 'in progress' | 'completed';
export type TaskItemProps = {
    id: number,
    title:string,
    done:Status,
}

/*A small set covers about 90 percent of everyday styling:

Text: color, fontSize, fontWeight, textAlign
Box: margin, padding, border, borderRadius, width, height
Background: backgroundColor
Layout: display (especially flex), justifyContent, alignItems, gap
*/


const taskStyle:Record<Status, CSSProperties> = {
    'pending' : {textDecoration: "none", color: 'yellow'},
    'in progress' : {textDecoration: "solid", color: 'purple'},
    'completed' : {textDecoration: "none", color: 'green'},
}

export function TaskItem({title, done}:TaskItemProps) {
    return (
    <li style = {taskStyle[done]}>
        {`${title} - ${done}`}
    </li>
    );
}