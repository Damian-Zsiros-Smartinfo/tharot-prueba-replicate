export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  logued?: boolean;
}

export interface UserWithId extends User {
  id: number | undefined;
}

export type UserLoginInfo = Partial<User>;
