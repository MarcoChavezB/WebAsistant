export interface UserUpdate{
    name: string;
    email: string;
}

export interface UserData{
  id: number;
  name: string;
  email: string;
}

export interface UserLogin{
  email: string;
  password: string;
}
