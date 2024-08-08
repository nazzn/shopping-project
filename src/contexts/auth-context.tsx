import axios from "axios";
import React, { createContext, useState } from "react";
import { HttpService } from "../serviss/httpservice";

export type AuthDataType = {
  token: string;
  isAuth: boolean;
    username: string;
};

export const AuthContext = createContext({
  authData: {} as AuthDataType,
  onRegister: (username: string, password: string): Promise<string> =>
    Promise.resolve(''),
  login: (username: string, password: string): Promise<string> =>
    Promise.resolve(''),
  logout: () => {},
});

const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuth: (localStorage.getItem("token") ?? "").length > 0 ? true : false,
    token: localStorage.getItem("token") ?? "",
      username: localStorage.getItem("username") ?? "",
  } as AuthDataType);

  const onRegister = async (
    username: string,
    password: string
  ): Promise<string> => {
    const dt = new FormData();
    dt.append("username", username);
    dt.append("password", password);

    let result = await axios({
      method: "post",
      url: `${HttpService}/api/auth/register`,
      data: dt,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data);
        console.log(res.data);
        return Promise.resolve("Success");
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err.response.data);
      });
    return result;
  };

  const onLogin = async (
    username: string,
    password: string
  ): Promise<string> => {
    var dt = new FormData();
    dt.append("username", username);
    dt.append("password", password);

    let result = await axios({
      method: "post",
      url: `"${HttpService}/api/auth/login`,
      data: dt,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => {
      localStorage.setItem("token", resp.data);
      localStorage.setItem("username", username);
      setAuthState({
        isAuth: true,
        token: resp.data,
        username: username,
      });
      
      return Promise.resolve("Success");
    })
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
  return result;
  };

  const onLogout = () => { localStorage.removeItem("token");
  localStorage.removeItem("username");
  setAuthState({
    isAuth: false,
    token: "",
    username: "",
  });};
  return (
    <AuthContext.Provider
      value={{
        authData: authState,
        onRegister,
        login: onLogin,
        logout: onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
