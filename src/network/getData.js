import { databaseURL } from "./urls";

export async function getUser() {
    try {
      const response = await axios.get(`${databaseURL}collections/users/records`);
      return response;
    } catch (error) {
      return null;
    }
  }