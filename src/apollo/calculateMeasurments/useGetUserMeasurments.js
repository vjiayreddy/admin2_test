import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_MEASURMENTS } from "../../apollo/queries/measurments";
import _ from "lodash";
import { updateMeasurementForm } from "./service";

export const useGetUserMeasurments = () => {
  const [measurementsData, setMeasurementsData] = useState(null);
  const [isInitialMeasurments, setIsInitialMeasurments] = useState(false);
  const [getLastSavedMeasurments, setGetLastSavedMeasurments] = useState(null);
  const [getSavedUserMeasurments, { data: dataGSUM }] = useLazyQuery(
    GET_USER_MEASURMENTS,
    {
      fetchPolicy: "network-only",
    }
  );

  const getUserMeasurments = (productCatId, authToken, subCategory) => {
    getSavedUserMeasurments({
      variables: {
        page: 1,
        limit: 3,
        userId: authToken,
        subCatId: subCategory,
        catId: productCatId,
      },
    });
  };

  useEffect(() => {
    setMeasurementsData(null);
    if (dataGSUM) {
      const { getUserMeasurements } = dataGSUM;
      if (!_.isEmpty(getUserMeasurements[0])) {
        setMeasurementsData(updateMeasurementForm(getUserMeasurements).options);
        setGetLastSavedMeasurments(
          updateMeasurementForm(getUserMeasurements).lastSavedMeasurments
        );
      }

      if (!_.isEmpty(getUserMeasurements[0])) {
        if (getUserMeasurements.length === 1) {
          if (getUserMeasurements[0].catId === null) {
            setIsInitialMeasurments(true);
          } else {
            setIsInitialMeasurments(false);
          }
        }
      } else {
        setIsInitialMeasurments(false);
      }
    }
  }, [dataGSUM]);

  return {
    getUserMeasurments,
    measurementsData,
    getLastSavedMeasurments,
    isInitialMeasurments,
  };
};
