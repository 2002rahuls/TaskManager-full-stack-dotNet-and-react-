import type { Task } from "../api/taskApi";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  filter: "all" | "pending" | "completed";
  onRefresh: () => void;
}

export default function TaskList({ tasks, filter, onRefresh }: Props) {
  const filtered = tasks.filter((t) => {
    if (filter === "pending") return !t.isCompleted;
    if (filter === "completed") return t.isCompleted;
    return true;
  });

  if (filtered.length === 0)
    return <p style={{ color: "#9ca3af", textAlign: "center" }}>No tasks here yet.</p>;

  return (
    <div>
      {filtered.map((task) => (
        <TaskCard key={task.id} task={task} onRefresh={onRefresh} />
      ))}
    </div>
  );
}