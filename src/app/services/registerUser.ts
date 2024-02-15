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
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return { data };
  } catch (error) {
    if (error instanceof Error)
      return { data: { registered: false, exists: false }, error };
    return { data: { registered: false, exists: false }, error: {} };
  }
}
