import { useQuery } from "react-query";
import { request } from "./api";

type Truck = {
  data: {
    image: string;
    mileage: number;
    model: string;
    registration_expires: string;
    registration_number: string;
    service_date_next: string;
    service_mileage: number;
    service_mileage_next: number;
    vehicle_id: number;
  };
};

type Trailer = {
  data: {
    image: string;
    model: string;
    registration_expires: string;
    registration_number: string;
    service_date_next: string | null;
    service_mileage_date: string | null;
    vehicle_id: number;
  };
};

export function useTruck() {
  return useQuery("truck", async () => {
    const { data } = await request.get<Truck>(`truck`);
    return data.data;
  });
}

export function useTrailer() {
  return useQuery("trailer", async () => {
    const { data } = await request.get<Trailer>(`trailer`);
    return data.data!;
  });
}
