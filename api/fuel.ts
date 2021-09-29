import { useQuery } from "react-query";
import { request } from "./api";

type FuelType = {
  id: number;
  fuel_type: string;
};

export function useFuelType() {
  return useQuery("fuel-type", async () => {
    const { data } = await request.get<FuelType[]>(`fuel-type`);
    return data;
  });
}
