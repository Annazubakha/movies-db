import { createContext } from "react";

export const anonymousUser = {
  name: "Anonymus",
};

export interface AuthInfo {
  user: {
    name: string;
  };
}
export const AuthContext = createContext<AuthInfo>({ user: anonymousUser });
