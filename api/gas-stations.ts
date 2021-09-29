import { useQuery } from "react-query";
import { request } from "./api";

type Pump = {
  id: number;
  name: string;
  iso: string;
  currency: string;
};

export function useGasStations() {
  return useQuery("gas-stations", async () => {
    const { data } = await request.get<Pump[]>(`gas-stations`);
    return data;
  });
}
