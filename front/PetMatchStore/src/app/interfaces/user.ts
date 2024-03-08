export interface UserSignIn {
  id?: string;
  group?: string;
  active?: boolean;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  cpf?: string;
  group?: string;
  active?: boolean;
}
export interface ListUser {
  users: Array<User>;
}