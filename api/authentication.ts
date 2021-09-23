import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { request } from "./api";

export type LoginType = {
  registration_number?: string;
  password?: string;
};

export function useLogin(navigation: any) {
  return useMutation(
    (login: LoginType) => request.post<string>("login", login),
    {
      async onSuccess(response) {
        await AsyncStorage.setItem("token", response.data);
        navigation.navigate("TruckDetails");
      },
      onError(error: AxiosError) {},
    }
  );
}
