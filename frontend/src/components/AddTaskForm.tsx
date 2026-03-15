import React, {useState} from "react";
import { createTask } from "../api/taskApi";
import type { CreateTaskPayload } from "../api/taskApi";

interface Props {
  onTaskAdded: () => void;
}

export default function AddTaskForm({onTaskAdded}: Props){
  const [title,setTitle] = useState("");
   const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if(!title.trim()) return;
    setLoading(true);
    try {
      const payload: CreateTaskPayload = {title,description};
      await createTask(payload);
      setTitle("");
      setDescription("");
      onTaskAdded();
    } catch (error) {
      console.error("Failed to create task", error);

    }finally{
      setLoading(false);
    }
  };
  return (
<form onSubmit={handleSubmit} style= {styles.form}>
  <h2>Add New Task</h2>
  <input 
  style={styles.input}
        type="text"
        placeholder="Task title *"
        value = {title}
        onChange={(e) => setTitle(e.target.value)}
        required/>
          <input 
  style={styles.input}
        type="text"
        placeholder="Desctiption (optional) *"
        value = {description}
        onChange={(e) => setDescription(e.target.value)}
        required/>
        <button style = {styles.button} type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
</form>

  )
}
const styles: Record<string, React.CSSProperties> = {
  form: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" },
  input: { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" },
  button: { padding: "10px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
};