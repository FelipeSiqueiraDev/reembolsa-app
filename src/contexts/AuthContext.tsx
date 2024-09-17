import { ReactNode, createContext, useEffect, useState } from "react";

import { api } from "@services/api";

import Toast from "react-native-toast-message";

import { UserDTO } from "@dtos/userDTO";

import { saveUserCredentials } from "@storage/user/saveUser.credentials";
import { deleteUserCredentials } from "@storage/user/deleteUser.credentials";
import { getUserCredentials } from "@storage/user/getUser.credentials";

export type AuthContextDataProps = {
  logged: boolean;
  login: (credentials: UserDTO) => Promise<void>;
  logout: () => Promise<void>;
  keepLogged: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [logged, setLogged] = useState(false);

  async function login({ username, password }: UserDTO) {
    const settings = {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        Username: username,
        Password: password,
      },
    };

    await api("/Account/LoginOnApp", settings)
      .then(async (resp) => {
        await saveUserCredentials({ username, password });

        setLogged(true);
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Erro ao fazer login",
        });
      });
  }

  async function keepLogged() {
    try {
      const { username, password } = await getUserCredentials();
      if ({ username, password }) {
        login({ username, password });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
      });

      throw err;
    }
  }

  async function logout() {
    try {
      await deleteUserCredentials();
      setLogged(false);
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    keepLogged();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        logged,
        keepLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
