import axios from "axios";

const BASE_URL = "http://localhost:5017/api/Task";

export interface Task{
  id:number;
  title:string;
  description?:string;
  isCompleted:boolean;
  createdAt:string;
}
export interface CreateTaskPayload{
  title:string;
  description?:string;
}
export interface UpdateTaskPayload{
  title:string;
  description?:string;
  isCompleted:boolean;
}

export const getAllTasks = ()=> axios.get<Task[]>(BASE_URL);
export const createTask = (data:CreateTaskPayload) => axios.post<Task>(BASE_URL,data);
export const updateTask = (id:number,data:UpdateTaskPayload)=> axios.put<Task>(`${BASE_URL}/${id}`,data);
export const toggleTask = (id:number) => axios.patch<Task>(`${BASE_URL}/${id}/toggle`);
export const deleteTask = (id:number) =>axios.delete<Task>(`${BASE_URL}/${id}`);
