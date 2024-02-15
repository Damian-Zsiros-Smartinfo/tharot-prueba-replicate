import { UserLoginInfo } from "@/types/User";
import { constants } from "../../../constants";
import Cookie from "js-cookie";
export async function loginUser(userInfo: UserLoginInfo) {
  try {
    const res = await fetch(`${constants.API_URL}/login`, {
      method: "POST",

      body: JSON.stringify(userInfo),
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    Cookie.set("token", data?.token);
    return { data };
  } catch (error) {
    if (error instanceof Error) return { error: { message: error.message } };
    return { error: { message: "Not defined" } };
  }
}
