import React from "react";
import TaskForm from "./components/TaskForm";
import Columns from "./components/Columns";
import "./style.css";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

export const AppContext = React.createContext();

export default function App() {
    const [tasks, setTasks] = React.useState([]);

    // funzione per aggiungere un task al database Firestore
    const handleAddTask = async (text) => {
        try {
            await addDoc(collection(db, "tasks"), {
                text: text,
                status: "to-do",
                createdAt: serverTimestamp()
            })
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    // funzione per aggiornare lo stato di un task nel database Firestore
    const handleUpdateTaskStatus = async (taskId, newStatus) => {
        try {
            const taskRef = doc(db, "tasks", taskId);
            await updateDoc(taskRef, {
                status: newStatus
            });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

    // funzione per eliminare una task dal database Firestore
    const handleDeleteTask = async (taskId) => {
        try {
            const taskRef = doc(db, "tasks", taskId);
            await deleteDoc(taskRef);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    React.useEffect(() => {
        // creazione query della collezione in Firestore per ottenere i task ordinati ("createdAt", "desc")
        const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tasksData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })
            );
            setTasks(tasksData);
        });
        // cleanup function
        return () => unsubscribe();
    }, []);

    console.log(tasks);

    return (
        <AppContext.Provider value={{ tasks, handleAddTask, handleUpdateTaskStatus, handleDeleteTask }}>
            <div className="app-container">
                <div className="header-container">
                    <h1>Kanban Board</h1>
                    <TaskForm onAddTask={handleAddTask} />
                </div>
                <div className="tasks-container">
                    <Columns title="To Do" statusClass="to-do" />
                    <Columns title="In Progress" statusClass="in-progress" />
                    <Columns title="Done" statusClass="done" />
                </div>
            </div>
        </AppContext.Provider>
    )
}
