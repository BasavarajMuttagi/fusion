import axios from "axios";
import useFusionStore from "../store";

function apiClient() {
  const token = useFusionStore.getState().token;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default apiClient();
