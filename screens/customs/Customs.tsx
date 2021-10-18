import React from "react";
import { VirtualizedList } from "react-native";
import { useCustoms, Customs as CustomsDto } from "../../api/customs";
import ErrorPage from "../../components/error/ErroPage";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { RootTabScreenProps } from "../../types";
import CustomsItem from "./CustomsItem";

const Customs = ({ navigation }: RootTabScreenProps<"Customs">) => {
  const { data, isLoading, isError } = useCustoms();

  const getItem = (data: CustomsDto[], index: number) => data[index];

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
        <CustomsItem navigation={navigation} customs={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      getItemCount={getItemCount}
      getItem={getItem}
    />
  );
};

export default Customs;
