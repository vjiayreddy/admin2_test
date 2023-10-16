import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CATEGORY_MEASURMENTS } from "../queries/measurments";

export const useGetDependencyMeasurments = (productCatId, authToken) => {
  const [dependentMeasurements, setDependentMeasurements] = useState(null);
  const [getCategoryMeasurments, { data: dataUCM }] = useLazyQuery(
    GET_CATEGORY_MEASURMENTS,
    {
      fetchPolicy: "network-only",
    }
  );

  const fetchDependencyMeasurements = async () => {
    let variables = { page: 1, limit: 3, userId: authToken };
    if (
      productCatId === "5da7220571762c2a58b27a65" ||
      productCatId === "5da7220571762c2a58b27a67"
    ) {
      return;
    } else {
      if (productCatId === "5da7220571762c2a58b27a6b") {
        variables["subCatId"] = "trouser";
        variables["catId"] = "5da7220571762c2a58b27a67";
        await getCategoryMeasurments({ variables: variables });
      } else {
        variables["subCatId"] = "half_shirt";
        variables["catId"] = "5da7220571762c2a58b27a65";
        await getCategoryMeasurments({ variables: variables });
      }
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataUCM)) {
      const { getUserMeasurements } = dataUCM;
      if (!_.isEmpty(dataUCM)) {
        const options = !_.isEmpty(getUserMeasurements[0].options)
          ? getUserMeasurements[0].options
          : getUserMeasurements[1].options;
        setDependentMeasurements(options);
      }
    }
  }, [dataUCM]);

  return {
    dependentMeasurements,
    fetchDependencyMeasurements,
  };
};
