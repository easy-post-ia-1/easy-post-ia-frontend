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
  data?: Data;
  configAxios?: ConfigAxios;
  configService?: ConfigService;
}

export interface ResponseAxiosService {
  call: Promise<AxiosResponse>;
}

export interface StatusSuccess {
  code: number;
  message: string;
}
