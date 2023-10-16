import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT_MEASURMENT_CONFIG } from "../queries/measurments";
import _ from "lodash";

const role = "personal_stylist";

export const useGetMeasurementsConfig = () => {
  const [productMeasurements, setProductMeasurements] = useState([]);
  const [subCatId, setSubCatId] = useState("half_shirt");

  const [
    getProductMeasurements,
    { loading: loadingPM, data: { getProductMeasurementConfig } = {} },
  ] = useLazyQuery(GET_PRODUCT_MEASURMENT_CONFIG);

  useEffect(() => {
    setProductMeasurements([]);
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
      setProductMeasurements(getUniqOptions);
      setSubCatId(getProductMeasurementConfig[0].subCat);
    }
  }, [getProductMeasurementConfig]);

  const getMeasurementsByCatId = async (productId) => {
    await getProductMeasurements({
      variables: {
        role: role,
        catId: productId,
      },
    });
  };

  return {
    getMeasurementsByCatId,
    loadingState: loadingPM,
    productMeasurements,
    subCatId,
  };
};
