import React from 'react';
import { AppContext } from '../App';
import binIcon from '../assets/bin-svgrepo-com.svg';

export default function TaskCard({ task }) {
    const { handleUpdateTaskStatus, handleDeleteTask } = React.useContext(AppContext);
    const [showActions, setShowActions] = React.useState(false);


    return (
        <>
            <div className="task-card" onMouseEnter={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
                <p>{task.text}</p>
                {showActions && <div className="task-actions">
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
                </div>}
            </div>
        </>
    )


}