import { AxiosResponse } from 'axios';

interface ConfigService {
  version?: string;
}

export interface Data {
  [key: string]: string | number | boolean | object | undefined | void;
}

interface ConfigAxios {
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ParamsAxios {
  configService?: {
    version: string;
  };
  data?: any;
  params?: Record<string, any>;
}

export interface ResponseAxiosService {
  call: Promise<any>;
}

export interface StatusSuccess {
  code: number;
  message: string;
}
