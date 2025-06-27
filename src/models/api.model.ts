export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface ParamsAxios {
  configService?: {
    version?: string;
  };
  data?: object;
  params?: object;
}

export interface ResponseAxiosService {
  call: Promise<any>;
}
