import React from 'react';
import { AppContext } from '../App';
import binIcon from '../assets/bin-svgrepo-com.svg';

export default function TaskCard({ task }) {
    const { handleUpdateTaskStatus, handleDeleteTask } = React.useContext(AppContext);
    
    const handleFormatDate = (timestamp) => {
        if(!timestamp) return "";
        const date = timestamp.toDate();
        return date.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    }

    return (
        <>
            <div className="task-card">
                <div className="task-detail">
                    <p>{task.text}</p>
                    <span className="task-date">{handleFormatDate(task.createdAt)}</span>
                </div>
                <div className="task-actions">
                    <div className="move-actions">
                        {task.status !== "to-do" && (
                            <button onClick={() => handleUpdateTaskStatus(task.id, "to-do")}>To Do</button>
                        )}
                        {task.status !== "in-progress" && (
                            <button onClick={() => handleUpdateTaskStatus(task.id, "in-progress")}>In Progress</button>
                        )}
                        {task.status !== "done" && (
                            <button onClick={() => handleUpdateTaskStatus(task.id, "done")}>Done</button>
                        )}
                    </div>
                    <button onClick={() => handleDeleteTask(task.id)}>
                        <img className="delete-icon" src={binIcon} alt="Delete" />
                    </button>
                </div>
            </div>
        </>
    )


}