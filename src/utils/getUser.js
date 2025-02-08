import axios from "axios";
import { userUrl } from "./apiUrls";

export const getUserInfo = async (userId) => {
  const response = await axios.get(`${userUrl}/find/${userId}`);
  return response.data;
};
