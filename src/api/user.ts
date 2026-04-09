import api from "./client";
import type { IUser } from "@/types/user.types";

export const getUserFromToken = async (
  token: string,
): Promise<IUser | false> => {
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data as IUser;
  }

  return false;
};

export const signUp = async (email: string, password: string) => {
  const response = await api.post("/users/sign-up", {
    email,
    password,
  });

  if (response.status === 200) {
    return response.data;
  }

  return false;
};
