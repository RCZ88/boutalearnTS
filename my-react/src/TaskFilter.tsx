import type {Status} from "./TaskItemProps.tsx";
import {useState} from "react";


type FilterInput = {
    filterOptions:Status[],
    filterHandler:(value:Status) => void
}

export function TaskFilter({filterOptions, filterHandler}: FilterInput) {
    const [buttonStates, setButtonStates] = useState<boolean[]>([]);

    return (
        <>
            <label className="card-label">Task Filter Options:</label>
            {filterOptions.map((option:Status, index) => {
                return <button className={`filter-button ${!buttonStates[index] ? "active" : ""}`}
                               onClick={()=>{
                                   setButtonStates(prev =>
                                       prev.map((_, boolIndex) => boolIndex === index)
                                   );
                                   filterHandler(filterOptions[index]);
                               }}>
                    {option}
                </button>
            })}
        </>
    )
}