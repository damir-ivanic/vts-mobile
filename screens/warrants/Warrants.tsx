import React from "react";
import { VirtualizedList } from "react-native";
import { useWarrants, Warrant } from "../../api/warrants";
import ErrorPage from "../../components/error/ErroPage";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { RootTabScreenProps } from "../../types";
import WarrantItem from "./WarrantItem";

const Warrants = ({ navigation }: RootTabScreenProps<"Warrants">) => {
  const { data, isLoading, isError } = useWarrants();

  const getItem = (data: Warrant[], index: number) => data[index];

  const getItemCount = () => data!.length;

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <VirtualizedList
      data={data}
      initialNumToRender={4}
      renderItem={({ item }) => (
        <WarrantItem warrant={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.id.toString()}
      getItemCount={getItemCount}
      getItem={getItem}
    />
  );
};

export default Warrants;
