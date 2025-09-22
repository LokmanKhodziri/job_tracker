import { useState } from "react";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const saveToken = (userToken: string) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return { auth: { token }, saveToken, logout };
}
