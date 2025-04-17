export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}
