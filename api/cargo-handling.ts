import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";
import { request } from "./api";

export type Cargo = {
  id: number;
  address: string;
};

export function useUnloadLocations() {
  return useQuery("unload-locations", async () => {
    const activeWarrant = await AsyncStorage.getItem("activeWarrant");
    const { data } = await request.post<Cargo[]>(`unloads-locations`, {
      warrant_id: activeWarrant,
    });
    return data;
  });
}

export function useLoadLocations() {
  return useQuery("load-locations", async () => {
    const activeWarrant = await AsyncStorage.getItem("activeWarrant");
    const { data } = await request.post<Cargo[]>(`loads-locations`, {
      warrant_id: activeWarrant,
    });
    return data;
  });
}
