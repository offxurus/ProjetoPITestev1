export interface UserSignIn {
  id?: string;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  group?: string;
  active?: boolean;
}
export interface ListUser {
  users: Array<User>;
}