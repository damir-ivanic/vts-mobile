import React from "react";
import { VirtualizedList } from "react-native";
import { useLoadLocations } from "../../api/cargo-handling";
import ErrorPage from "../../components/error/ErroPage";
import LoadingScreen from "../../components/loading/LoadingScreen";
import TruckPayloadListItem from "../../components/truck-payload-list-item/TruckPayloadListItem";

const TruckLoadingList = ({ navigation }: any) => {
  const { data, isError, isLoading } = useLoadLocations();
  const getItem = (data: any[], index: number) => data[index];

  const getItemCount = () => data!.length;

  console.log(data, "DATA");

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <VirtualizedList
      data={data}
      initialNumToRender={7}
      renderItem={({ item }) => (
        <TruckPayloadListItem key={item.id} cargo={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      getItemCount={getItemCount}
      getItem={getItem}
    />
  );
};

export default TruckLoadingList;
