export interface DeviceStore{
  type: string;
  model: string;
  os: string;
}

export interface DeviceData {
  id: number;
  type: string;
  model: string;
  os: string;
  code: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  owner_name: string;
  owner_email: string;
}

export interface DeviceResult{
  device: DeviceData[]
}
