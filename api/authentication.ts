import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useAuthentication } from "../hooks/useAuthentication";
import { request } from "./api";

export type LoginType = {
  registration_number?: string;
  password?: string;
};

export function useLogin() {
  const { setToken } = useAuthentication();
  return useMutation(
    (login: LoginType) => request.post<string>("login", login),
    {
      async onSuccess(response) {
        setToken(response.data);
      },
      onError(error: AxiosError) {},
    }
  );
}
