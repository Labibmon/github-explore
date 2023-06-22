import axios from "axios";

import { Repository, User } from "@/shared/githubAPI";

export const api = axios.create({
  baseURL: "https://api.github.com",
});


export async function getUser(userName?: string) {
  const { data } = await api.get<User>(`search/users`, {
    params: {
      q: userName,
      per_page: 5,
    }
  });

  return data;
}

export async function getRepository(repositoryFullName: string) {
  const { data } = await api.get<Repository[]>(`https://api.github.com/users/${repositoryFullName}/repos`);

  return data;
}