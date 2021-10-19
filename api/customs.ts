import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../helpers/queryClient";
import { request } from "./api";

export type Customs = {
  id: number;
  address: string;
  warrant_id: number;
  customs_terminal: string | null;
  forwarding_agent: string | null;
  description: string | null;
  end_time: string | null;
  start_time: string | null;
};

type CustomsStart = {
  id: number;
  warrant_id: number;
  start_time: string;
};

type CustomsStop = {
  id: number;
  warrant_id: number;
  end_time: string;
};

export function useCustoms() {
  return useQuery("customs", async () => {
    const activeWarrant = await AsyncStorage.getItem("activeWarrant");
    const { data } = await request.post<Customs[]>(`customs`, {
      warrant_id: activeWarrant,
    });
    return data;
  });
}

export function useCustomsStart() {
  return useMutation((customsStart: CustomsStart) => {
    return request.post(`customs/start`, customsStart);
  });
}

export function useCustomsStop() {
  return useMutation(
    (customsStop: CustomsStop) => {
      return request.post(`customs/end`, customsStop);
    },
    {
      async onSuccess() {
        queryClient.invalidateQueries("customs");
      },
    }
  );
}
