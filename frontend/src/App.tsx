import { useEffect, useState } from "react";
import type { Task } from "./api/taskApi";
import { getAllTasks } from "./api/taskApi";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

type Filter = "all" | "pending" | "completed";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const fetchTasks = async () => {
    const res = await getAllTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const pending = tasks.filter((t) => !t.isCompleted).length;
  const completed = tasks.filter((t) => t.isCompleted).length;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📝 Task Manager</h1>

      {/* Stats */}
      <div style={styles.stats}>
        <div style={styles.statBox}>⏳ Pending <strong>{pending}</strong></div>
        <div style={styles.statBox}>✅ Completed <strong>{completed}</strong></div>
        <div style={styles.statBox}>📋 Total <strong>{tasks.length}</strong></div>
      </div>

      <AddTaskForm onTaskAdded={fetchTasks} />

      {/* Filter Tabs */}
      <div style={styles.tabs}>
        {(["all", "pending", "completed"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ ...styles.tab, background: filter === f ? "#4f46e5" : "#e5e7eb", color: filter === f ? "#fff" : "#374151" }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <TaskList tasks={tasks} filter={filter} onRefresh={fetchTasks} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: "620px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" },
  header: { textAlign: "center", color: "#1f2937", marginBottom: "20px" },
  stats: { display: "flex", gap: "12px", marginBottom: "24px", justifyContent: "center" },
  statBox: { flex: 1, background: "#f3f4f6", borderRadius: "8px", padding: "12px", textAlign: "center", fontSize: "14px" },
  tabs: { display: "flex", gap: "8px", marginBottom: "16px" },
  tab: { flex: 1, padding: "8px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
};