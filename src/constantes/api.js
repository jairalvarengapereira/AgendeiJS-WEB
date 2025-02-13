import axios from "axios";

// Configurando a URL base do API

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export default api;

// Interceptador para adicionar cabeçalhos de autorização