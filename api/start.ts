import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { request } from "./api";

export type StartType = {
  mileage_start: string;
  warrant_start_time?: string;
};

export function useStart(navigation: any) {
  return useMutation(
    (start: StartType) => {
      return request.post("go", start);
    },
    {
      async onSuccess() {
        navigation.navigate("MainMenu");
      },
      onError(error: AxiosError) {},
    }
  );
}
