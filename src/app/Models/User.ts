export interface UserUpdate{
    name: string;
    email: string;
}

export interface UserData{
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UserResponse{
  data: UserData;
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

export interface statusInterface {
  status: boolean
}

export interface LoginResponseInterface {
  msg: string;
  data: UserData;
  jwt: string;
}

