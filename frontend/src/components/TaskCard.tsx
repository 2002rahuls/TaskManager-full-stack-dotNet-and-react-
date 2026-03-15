import type { Task } from "../api/taskApi"
import { toggleTask, deleteTask } from "../api/taskApi"
interface Props {
  task:Task;
  onRefresh:()=> void;
}
export default function TaskCard({task,onRefresh}:Props){
  const handleToggle = async () => {
    await toggleTask(task.id);
    onRefresh();
  };
  const handleDelete = async () => {
    if(confirm("Delete this task?")){
      await deleteTask(task.id);
      onRefresh();
    }
  };

  return (
    <div style = {{...styles.card,opacity:task.isCompleted ?0.7:1}}>
      <div style = {styles.left}>
        <input type = "checkbox"
        checked={task.isCompleted}
        onChange={handleToggle}
        style = {styles.checkbox}/>
         <div>
           <p style={{ ...styles.title, textDecoration: task.isCompleted ? "line-through" : "none" }}>
            {task.title}
             {task.description && <p style={styles.desc}>{task.description}</p>}
              
          </p>
          <span style={{ ...styles.badge, background: task.isCompleted ? "#22c55e" : "#f59e0b" }}>
            {task.isCompleted ? "✅ Completed" : "⏳ Pending"}
            </span>
         </div>
      </div>
      <button onClick={handleDelete} style = {styles.deleteButton}>🗑</button>
    </div>
  )
}
const styles: Record<string,React.CSSProperties>={
  card: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", marginBottom: "10px" },
  left: { display: "flex", alignItems: "flex-start", gap: "12px" },
  checkbox: { width: "18px", height: "18px", marginTop: "4px", cursor: "pointer" },
  title: { margin: 0, fontWeight: "600", fontSize: "15px" },
  desc: { margin: "4px 0 6px", fontSize: "13px", color: "#6b7280" },
  badge: { padding: "2px 10px", borderRadius: "20px", color: "#fff", fontSize: "12px", fontWeight: "bold" },
  deleteBtn: { background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#ef4444" },
}