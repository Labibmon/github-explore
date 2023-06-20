export interface User {
  incomplete_results: boolean;
  total_count: number;
  items: UserItem[]
}

export interface UserItem {
  avatar_url: string
  events_url: string
  followers_url: string
  following_url: string
  gists_url: string
  id: number
  login: string
}