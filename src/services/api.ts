import axios from "axios";

import { User } from "@/shared/githubAPI";

export const api = axios.create({
  baseURL: "https://api.github.com",
});


export async function getUser(userName: string) {
  const { data } = await api.get<User>(`search/users`, {
    params: {
      q: userName
    }
  });

  return data;
}
