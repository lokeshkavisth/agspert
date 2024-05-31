import axios from "axios";

export const fetchSales = async () => {
  const response = await axios.get("http://localhost:5001/api/sales");
  return response.data;
};
