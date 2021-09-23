import { AxiosError } from "axios";
import { useToast } from "native-base";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { request } from "./api";

type PaymentType = {
  id: number;
  name: "string";
};

export type FuelPaymentType = {
  fuel_type_id?: number;
  payment_type_id?: number;
  supplier?: string;
  mileage?: number;
  litres?: number;
  cost?: number;
  long?: string;
  lat?: string;
  image?: string;
};

export type TollType = {
  payment_type_id: number;
  entry_ramp_long: number;
  entry_ramp_lat: number;
  exit_ramp_long: number;
  exit_ramp_lat: number;
  cost: number;
  countryId: number;
};

export type VignetteType = {
  payment_type_id?: number;
  lat?: number;
  long?: number;
  cost?: number;
  days_of_validity?: number;
};

type CostType = FuelPaymentType | TollType | VignetteType;

export function usePaymentType() {
  return useQuery("payment-type", async () => {
    const { data } = await request.get<PaymentType[]>(`payment-types`);
    return data;
  });
}

export function useCosts(costType: string) {
  const toast = useToast();
  const { t } = useTranslation();
  return useMutation(
    (costForm: CostType) =>
      request.post<CostType>(`costs/add/${costType}`, costForm),
    {
      async onSuccess() {
        toast.show({
          status: "success",
          placement: "top",
        });
      },
      onError() {
        toast.show({
          placement: "top",
          status: "error",
        });
      },
    }
  );
}
