import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT_MEASURMENT_CONFIG } from "../queries/measurments";

export const useGetMeasurmentsAttributes = () => {
  const [measurementsAttributes, setMeasurementsAttributes] = useState(null);
  const [subCatId, setSubCatId] = useState(null);
  const [getProductMeasurements, { data: dataMA }] = useLazyQuery(
    GET_PRODUCT_MEASURMENT_CONFIG,
    {
      fetchPolicy:'network-only'
    }
  );

  useEffect(() => {
    setMeasurementsAttributes(null);
    if (!_.isEmpty(dataMA)) {
      const { getProductMeasurementConfig } = dataMA;
      if (!_.isEmpty(getProductMeasurementConfig)) {
        let extractOptions = [];
        getProductMeasurementConfig.map((item) => {
          item.options.map((option) => extractOptions.push(option));
        });
        const getUniqOptions = _.uniqBy(extractOptions, "label").map((item) => {
          return {
            ...item,
            size: "0",
          };
        });
        setMeasurementsAttributes(getUniqOptions);
        setSubCatId(getProductMeasurementConfig[0].subCat);
      }
    }
  }, [dataMA]);

  return {
    getProductMeasurements,
    measurementsAttributes,
    setMeasurementsAttributes,
    subCatId,
  };
};
