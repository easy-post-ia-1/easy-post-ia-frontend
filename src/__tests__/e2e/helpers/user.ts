import { LoginCredentials } from "./interfaces/LoginInterface";

const userDefault = (): LoginCredentials => ({
  username: process.env.VITE_E2E_LOGIN_USER_USERNAME || "",
  email: process.env.VITE_E2E_LOGIN_USER_EMAIL,
  password: process.env.VITE_E2E_LOGIN_USER_PASSWORD || "",
});
export default userDefault;