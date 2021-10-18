import { useQuery } from "react-query";
import { request } from "./api";

export function useStopReasons() {
  return useQuery("stop-reasons", async () => {
    const { data } = await request.get<any[]>(`stop-reasons`);
    return data;
  });
}
