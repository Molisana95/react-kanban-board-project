import React from "react";
export default function TaskForm({ onAddTask }) {
    const [text, setText] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!text.trim()) return;
        onAddTask(text);
        setText("");
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Write a task..." value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit">Add Task</button>
        </form>
    )
}