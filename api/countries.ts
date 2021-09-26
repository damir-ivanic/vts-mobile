import { useQuery } from "react-query";
import { request } from "./api";

type Country = {
  id: number;
  name: string;
  iso: string;
  currency: string;
};

export function useContries() {
  return useQuery("countries", async () => {
    const { data } = await request.get<Country[]>(`countries`);
    return data;
  });
}
