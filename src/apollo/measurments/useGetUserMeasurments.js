import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_MEASURMENTS } from "../queries/measurments";
import { updateMeasurementForm } from "./service";
import _ from "lodash";

export const useGetUserSavedMeasurements = (
  authToken,
  subCatId,
  selectProduct
) => {
  const [userMeasurements, setUserMeasurements] = useState(null);
  

  const [getSavedUserMeasurments, { loading: loadingGSUM, data: dataGSUM }] =
    useLazyQuery(GET_USER_MEASURMENTS, {
      fetchPolicy: "network-only",
    });

  const gqlGetSavedMeasurements = () => {
    getSavedUserMeasurments({
      variables: {
        page: 1,
        limit: 3,
        userId: authToken,
        subCatId: subCatId,
        catId: selectProduct,
      },
    });
  };

  useEffect(() => {
    if (!_.isEmpty(dataGSUM)) {
      const { getUserMeasurements } = dataGSUM;
      if (!_.isEmpty(getUserMeasurements)) {
        setUserMeasurements(updateMeasurementForm(getUserMeasurements));
      }
    }
  }, [dataGSUM]);

  return {
    gqlGetSavedMeasurements,
    userMeasurements,
    loadingGSUM,
  };
};
