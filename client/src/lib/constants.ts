export const API_URL = "http://localhost:5000/api";

export const ENDPOINTS = {
  auth: {
    register: `${API_URL}/auth/register`,
    login: `${API_URL}/auth/login`,
  },
  students: {
    getAll: `${API_URL}/student`,
    donwload: `${API_URL}/student/download`,
    upload: `${API_URL}/student/upload`,
  },
};
