import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type ApiInstanceProps = AxiosInstance & {
  registerInterceptCookieManager: (signOut: SignOut) => () => void;
};

export const baseURL = "http://192.168.1.215:51044/";
// export const baseURL = "https://gestao.faridnet.com.br/";

export const api = axios.create({
  baseURL: baseURL,
  timeout: 60000,
}) as ApiInstanceProps;
