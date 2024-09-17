import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type ApiInstanceProps = AxiosInstance & {
  registerInterceptCookieManager: (signOut: SignOut) => () => void;
};

export const api = axios.create({
  baseURL: "https://gestaovarejo.faridnet.com.br/",
  // baseURL: "http://192.168.89.174:53652/",
  timeout: 10000,
}) as ApiInstanceProps;
