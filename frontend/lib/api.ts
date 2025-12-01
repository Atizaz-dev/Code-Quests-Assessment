import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post("/upload", formData);
  return res.data;
};

export const askQuestion = async (question: string) => {
  const res = await api.post("/ask", { question });
  return res.data; // { answer: string, sources: string[] }
};