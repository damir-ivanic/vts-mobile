import { useEffect } from "react";
import { useImmer } from "use-immer";
import * as Location from "expo-location";

type LocationState = {
  lat?: number;
  long?: number;
  loading: boolean;
  error?: any;
};

export default function useGeoLocation() {
  const [state, updateState] = useImmer<LocationState>({
    loading: false,
  });

  useEffect(() => {
    const locationAsync = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
        updateState((draft) => {
          draft.loading = true;
        });

        const location = await Location.getCurrentPositionAsync({});
        updateState((draft) => {
          draft.loading = false;
          draft.lat = location.coords.latitude;
          draft.long = location.coords.longitude;
        });
      } catch (e) {
        updateState((draft) => {
          draft.loading = false;
          draft.error = e;
        });
      }
    };

    locationAsync();

    return () => {
      updateState((draft) => {
        draft.loading = false;
      });
    };
  }, []);

  return state;
}
