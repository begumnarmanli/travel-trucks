import axios from "axios";

const API_URL = "/api/campers";
export const fetchCampers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("API hatası:", error);
    return [];
  }
};
