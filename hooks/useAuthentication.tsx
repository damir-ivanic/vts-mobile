import React, { useContext, ReactNode, createContext, useEffect } from "react";
import { useImmer } from "use-immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setTokenHeader, clearTokenHeader } from "../api/api";
import { checkForActiveWarrant } from "../api/check";

type AuthState = {
  token: string | null;
  activeTravelWarrant: boolean;
  loadingFinished: boolean;
};

const initialState: AuthState = {
  token: null,
  activeTravelWarrant: false,
  loadingFinished: false,
};

type AuthContextValue = {
  state: AuthState;
  setToken: (token: string) => void;
  logOut: () => void;
};

const AuthenticationContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const [state, updateState] = useImmer<AuthState>(initialState);

  useEffect(() => {
    const tokenAsync = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const { data } = await checkForActiveWarrant(token);
          setTokenHeader(token);
          updateState((draft) => {
            draft.token = token;
            draft.activeTravelWarrant = data.active;
          });
        }
        updateState((draft) => {
          draft.loadingFinished = true;
        });
      } catch (e) {
        updateState((draft) => {
          draft.token = null;
          draft.loadingFinished = true;
          draft.activeTravelWarrant = false;
        });
      }
    };

    tokenAsync();
  }, []);

  const setToken = async (token: string) => {
    setTokenHeader(token);
    await AsyncStorage.setItem("token", token);
    updateState((draft) => {
      draft.token = token;
    });
  };

  const logOut = async () => {
    clearTokenHeader();
    await AsyncStorage.removeItem("token");
    updateState((draft) => {
      draft.token = null;
    });
  };

  const context = {
    state,
    setToken,
    logOut,
  };

  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
