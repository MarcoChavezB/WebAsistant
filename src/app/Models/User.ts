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

export interface UserRegister{
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
