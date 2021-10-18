/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Customs } from "./api/customs";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  LoginScreen: undefined;
  MainMenu: {
    id: number;
  };
  Fuel: {
    id: number;
  };
  Toll: {
    id: number;
  };
  Vignette: {
    id: number;
  };
  Load: {
    id: number;
  };
  TruckDetails: undefined;
  TrailerDetails: {
    id: number;
  };
  Inspection: { id: number };
  Start: { id: number };
  Warrants: undefined;
  Settings: undefined;
  Warrant: undefined;
  Customs: undefined;
  CustomsView: {
    customs: Customs;
  };
  Stop: {
    id: number;
  };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
