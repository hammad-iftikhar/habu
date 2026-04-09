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
