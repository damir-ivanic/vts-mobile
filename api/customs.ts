import { useQuery } from "react-query";
import { request } from "./api";

export function useCustoms() {
  return useQuery("stop-reasons", async () => {
    const { data } = await request.get<any[]>(`stop-reasons`);
    return data;
  });
}
