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
}
export interface ListUser {
  users: Array<User>;
}