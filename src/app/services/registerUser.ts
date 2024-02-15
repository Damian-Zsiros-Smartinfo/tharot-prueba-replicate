import { User } from "@/types/User";
import { constants } from "../../../constants";

export async function registerUser(userInfo: User) {
  try {
    const res = await fetch(`${constants.API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await res.json();
    return { data };
  } catch (error) {
    return { data: { registered: false, exists: false }, error };
  }
}
