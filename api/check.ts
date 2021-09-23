import { request } from "./api";

type Active = {
  active: boolean;
};

export const checkForActiveWarrant = (token: string) => {
  return request.get<Active>("check", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
