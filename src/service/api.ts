import axios from "axios";
import { VITE_JIKAN_REST_API } from "./env";

export const getApi = async (resource: string, query: string) => {
  try {
    const response = await axios
      .get(`${VITE_JIKAN_REST_API}/${resource}?${query}`)
      .then((res) => res.data)
      .catch((err) => console.error(err));
    return response;
  } catch (error) {
    console.error(error);
  }
};
