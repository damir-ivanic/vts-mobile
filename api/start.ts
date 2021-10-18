import { useMutation } from "react-query";
import { request } from "./api";

export type StartType = {
  mileage_start: string;
  warrant_start_time?: string;
};

export function useStart() {
  return useMutation(async (start: StartType) => {
    return request.post("go", start);
  });
}
