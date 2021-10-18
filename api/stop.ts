import { useMutation, useQuery } from "react-query";
import { request } from "./api";

export type Stop = {
  warrant_id?: number;
  stop_reason_id?: number;
  start?: string;
  end?: string;
  lat?: number;
  long?: number;
};

type StopReason = {
  id: number;
  name: string;
};

export function useStopReasons() {
  return useQuery("stop-reasons", async () => {
    const { data } = await request.get<StopReason[]>(`stop-reasons`);
    return data;
  });
}

export function useStop() {
  return useMutation((stop: Stop) => {
    return request.post(`stop`, stop);
  });
}
