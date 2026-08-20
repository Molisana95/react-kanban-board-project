import React from "react";
import TaskCard from "./TaskCard";
import { AppContext } from "../App";

export default function Columns({ title, statusClass }) {
    const { tasks } = React.useContext(AppContext);
    const filteredTasks = tasks?.filter(task => task.status === statusClass)
    return (
        <div className={`list ${statusClass}`}> 
            <div className="list-header">
                <h5>{title}</h5>
                <h6>{filteredTasks.length}</h6>
            </div>
            {filteredTasks.map(task => (
                <TaskCard 
                    key={task.id} 
                    task={task} 
                />
            ))}
        </div>
    )
}