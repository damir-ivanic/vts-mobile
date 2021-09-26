import React, { ReactNode, useCallback } from "react";
import {
  Keyboard,
  RefreshControl,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";

type Props = {
  children: ReactNode;
};

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Container = ({ children }: Props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>{children}</View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});

export default Container;
