export type Error = {
  message: string;
  path: (string | number)[];
};

export interface ErrorSignUp {
  response?: {
    data?: {
      status?: {
        message?: string;
      };
    };
  };
}

export interface LoginFormErrorValues {
  nickname: string;
  passwd: string;
}
