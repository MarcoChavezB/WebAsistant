export interface SensorData {
    _id: string;
    Device: string;
    Tipo: string;
    Unidad: string;
    NoSensor: string;
    Valor: string;
    Datetime: string;
    updated_at: string;
    created_at: string;
  }
  
  export interface SensorDataResponse {
    success: boolean,
    data: SensorData[]
  }
  

  export interface SensorDataIndexPagination {
    success: boolean,
    page: number,
    perPage : number,
    data: SensorData[]
  }
  