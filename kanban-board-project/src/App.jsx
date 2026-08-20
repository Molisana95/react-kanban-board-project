import React from "react";
import TaskForm from "./components/TaskForm";
import Columns from "./components/Columns";
import "./style.css";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, where } from "firebase/firestore";
import { db, auth, googleProvider } from "./firebase";
import { getAuth, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"

export const AppContext = React.createContext();

export default function App() {
    const [tasks, setTasks] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    // funzione per aggiungere un task al database Firestore
    const handleAddTask = async (text) => {
        try {
            await addDoc(collection(db, "tasks"), {
                text: text,
                status: "to-do",
                createdAt: serverTimestamp(),
                userId: currentUser.uid
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
        //listener per capire quando un utente entra o esce
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        //cleanup function
        return () => unsubscribe();
    }, [])

    React.useEffect(() => {
        // creazione query della collezione in Firestore per ottenere i task ordinati ("createdAt", "desc")
        if(!currentUser) return
        // alla fine controllare con F12 se Firestore dà un errore azzurro; seguire istruzioni
        const q = query(collection(db, "tasks"), where("userId", "==", currentUser.uid), orderBy("createdAt", "desc"));
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
    }, [currentUser]);


    //funzioni login & logout

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error("Error during the login with Google:", error)
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error("Error during the logout:", error)
        }
    }

    console.log(tasks);

    if(loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if(!currentUser) {
        return (
            <div className="login-container">
                <h1>Kanban Board</h1>
                <p>Login do set up your personal tasks.</p>
                <button className="login-btn" onClick={handleLogin}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                    Accedi con Google
                </button>
            </div>
        )
        
    }

    return (
        <AppContext.Provider value={{ tasks, handleAddTask, handleUpdateTaskStatus, handleDeleteTask }}>
            <div className="app-container">
                <div className="header-container">
                    <div className="user-profile">
                        <img src={currentUser.photoURL} alt={currentUser.displayName} />
                        <h3 className="user-name">{currentUser.displayName}</h3>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                    <h1>Kanban Board</h1>
                    <TaskForm onAddTask={handleAddTask} />
                </div>
                <div className="tasks-container">
                    <Columns title="To do" statusClass="to-do" />
                    <Columns title="In progress" statusClass="in-progress" />
                    <Columns title="Done" statusClass="done" />
                </div>
            </div>
        </AppContext.Provider>
    )
}
