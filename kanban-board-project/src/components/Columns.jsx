import React from "react";
import TaskCard from "./TaskCard";
import { AppContext } from "../App";

export default function Columns({ title, statusClass }) {
    const { tasks } = React.useContext(AppContext);
    
    return (
        <div className={`list ${statusClass}`}>
            <h5>{title}</h5>
            {tasks?.filter(task => task.status === statusClass).map(task => (
                <TaskCard 
                    key={task.id} 
                    task={task} 
                />
            ))}
        </div>
    )
}