import { useQuery } from "react-query";
import { request } from "./api";

export type SupplierType = {
  id: number;
  name: string;
  number: string;
  vehicle_id: number;
  country_id: number;
};

export function useSuppliers() {
  return useQuery("suppliers", async () => {
    const { data } = await request.get<SupplierType[]>(`suppliers`);
    return data;
  });
}
