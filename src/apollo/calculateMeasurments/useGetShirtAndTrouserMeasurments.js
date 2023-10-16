import { useEffect, useState } from "react";
import {
  GET_SHIRT_CATEGORY_MEASURMENTS,
  GET_TROUSER_CATEGORY_MEASURMENTS,
} from "../queries/measurments";
import { useLazyQuery } from "@apollo/client";
import { CAT_IDS } from "./utils";

const useGetShirtAndTrouserMeasurements = (authToken) => {
  const [userShirtMeasurments, setUserShirtMeasurments] = useState(null);
  const [userTrouserMeasurments, setTrouserMeasurments] = useState(null);
  const [getUserShirtMeasurments, { data: dataUSM }] = useLazyQuery(
    GET_SHIRT_CATEGORY_MEASURMENTS,
    {
      fetchPolicy: "network-only",
    }
  );
  const [getUserTrouserMeasurments, { data: dataUTM }] = useLazyQuery(
    GET_TROUSER_CATEGORY_MEASURMENTS,
    {
      fetchPolicy: "network-only",
    }
  );

  const getShirtAndTrouserMeasurments = () => {
    getUserShirtMeasurments({
      variables: {
        userId: authToken,
        limit: 3,
        page: 1,
        subCatId: "half_shirt",
        catId: CAT_IDS.SHIRT_CAT_ID,
      },
    });
  };

  useEffect(() => {
    if (!_.isEmpty(dataUTM)) {
      const { getUserMeasurements } = dataUTM;
      if (!_.isEmpty(getUserMeasurements)) {
        const options = !_.isEmpty(getUserMeasurements[0].options)
          ? getUserMeasurements[0].options
          : getUserMeasurements[1].options;
        setTrouserMeasurments([...options]);
      }
    }
  }, [dataUTM]);

  useEffect(() => {
    if (!_.isEmpty(dataUSM)) {
      const { getUserMeasurements } = dataUSM;
      if (!_.isEmpty(getUserMeasurements)) {
        const options = !_.isEmpty(getUserMeasurements[0].options)
          ? getUserMeasurements[0].options
          : getUserMeasurements[1].options;
        setUserShirtMeasurments([...options]);
        getUserTrouserMeasurments({
          variables: {
            userId: authToken,
            limit: 3,
            page: 1,
            subCatId: "trouser",
            catId: CAT_IDS.TROUSER_CAT_ID,
          },
        });
      }
    }
  }, [dataUSM]);

  return {
    getShirtAndTrouserMeasurments,
    userShirtMeasurments,
    userTrouserMeasurments,
  };
};

export default useGetShirtAndTrouserMeasurements;
