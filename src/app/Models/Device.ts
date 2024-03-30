export interface DeviceStore{
  type: string;
  model: string;
  os: string;
}


export interface DeviceGet{
    id: number;
    code: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}