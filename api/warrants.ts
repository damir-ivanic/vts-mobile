import { useQuery } from "react-query";
import { request } from "./api";

export type Warrant = {
  id: number;
  date: string;
  date_end: string;
  driver_info: string;
  warrant_start_time: Date | null;
};

export type DriverParser = {
  first_name: string;
  last_name: string;
  phone_number: number;
  personal_id: number;
  passports: string[];
};

export function useWarrants() {
  return useQuery("warrants", async () => {
    const { data } = await request.get<Warrant[]>(`get-warrants`);
    return data;
  });
}
