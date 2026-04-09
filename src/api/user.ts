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
  const response = await api.post("/users/signup", {
    email,
    password,
  });

  const data = response.data;

  if (response.status === 200) {
    return {
      status: true,
      message: "Your account has been created successfully. You can login now.",
    };
  }

  return {
    status: false,
    message: data.message,
  };
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/users/login", {
    email,
    password,
  });

  const data = response.data;

  if (response.status === 200) {
    return {
      status: true,
      message: "Login successful",
      token: data.token,
    };
  }

  return {
    status: false,
    message: data.message,
  };
};
