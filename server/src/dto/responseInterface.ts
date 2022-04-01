export interface Id {
  id: string;
}
export interface Users extends Id {
  username: string;
  email: string;
  phone: string;
  password: string;
}
