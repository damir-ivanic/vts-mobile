import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { Button, CheckIcon, FormControl, Input, Select } from "native-base";
import { useTranslation } from "react-i18next";
import { Stop, useStopReasons } from "../../api/stop";
import useGeoLocation from "../../hooks/useGeoLocation";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { format } from "date-fns";
import { FontAwesome5 } from "@expo/vector-icons";

const StopForm = () => {
  const { values, errors, submitForm, setFieldValue } =
    useFormikContext<Stop>();
  const { loading, lat, long } = useGeoLocation();
  const { data, isError, isLoading } = useStopReasons();
  const { t } = useTranslation();

  console.log(errors, lat, long);

  useEffect(() => {
    setFieldValue("lat", lat, false);
    setFieldValue("long", long, false);
  }, [lat, long]);

  const addStartTime = () => {
    setFieldValue("start", format(new Date(), "yyyy-MM-dd hh:mm"), false);
  };

  const addEndTime = () => {
    setFieldValue("end", format(new Date(), "yyyy-MM-dd hh:mm"), false);
  };

  if (loading || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <FormControl isInvalid={"stop_reason_id" in errors}>
        <FormControl.Label>{t("general.selectItem")}</FormControl.Label>
        {data ? (
          <Select
            isDisabled={isError}
            selectedValue={values.stop_reason_id?.toString()}
            accessibilityLabel={t("stop.stopReason")}
            placeholder={t("stop.stopReason")}
            onValueChange={(itemValue) => {
              setFieldValue(
                "stop_reason_id",
                Number.parseInt(itemValue),
                false
              );
            }}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt={1}
          >
            {data?.map((stopReason) => (
              <Select.Item
                key={stopReason.id}
                label={stopReason.name}
                value={stopReason.id.toString()}
              />
            ))}
          </Select>
        ) : null}

        <FormControl.ErrorMessage>
          {errors.stop_reason_id}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={"start" in errors}>
        {values.start ? (
          <Button width="100%" marginTop={2} isDisabled colorScheme="vtsGreen">
            <FontAwesome5 name="check" size={25} color="#16a06e" />
          </Button>
        ) : (
          <Button
            width="100%"
            marginTop={2}
            onPress={addStartTime}
            colorScheme="vtsGreen"
            _text={{ color: "white" }}
          >
            {t("stop.start")}
          </Button>
        )}
        <FormControl.ErrorMessage>{errors.start}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={"end" in errors}>
        {values.end ? (
          <Button width="100%" marginTop={2} isDisabled colorScheme="vtsGreen">
            <FontAwesome5 name="check" size={25} color="#16a06e" />
          </Button>
        ) : (
          <Button
            width="100%"
            marginTop={2}
            onPress={addEndTime}
            colorScheme="vtsGreen"
            _text={{ color: "white" }}
          >
            {t("stop.end")}
          </Button>
        )}
        <FormControl.ErrorMessage>{errors.end}</FormControl.ErrorMessage>
      </FormControl>

      <Button
        width="100%"
        marginTop={2}
        onPress={submitForm}
        colorScheme="vtsBlue"
        _text={{ color: "white" }}
      >
        {t("general.save")}
      </Button>
    </>
  );
};

export default StopForm;
