import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import _ from "lodash";
import {
  GET_COLORS,
  GET_MASTER_PERSONA,
  GET_STORE_PRODUCTS,
} from "../../apollo/queries/orders";
import { GET_ALL_STYLISTS } from "../../apollo/queries/user";

const MASTER_NAME = "master_store_category";

export const useGetOrderInitData = () => {
  const [storeProducts, setStoreProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [persona, setPersona] = useState([]);
  const [stylists, setStylists] = useState([]);

  const { loading: loadingColors } = useQuery(GET_COLORS, {
    onCompleted({ getAllSecondaryColors }) {
      let colors = [];
      if (!_.isEmpty(getAllSecondaryColors)) {
        getAllSecondaryColors.map((color) => {
          colors.push({
            color: color.colorname,
            value: color.color,
          });
        });
        setColors(colors);
      }
    },
  });

  const [getMasterPersona, { loading: loadingMP }] = useLazyQuery(
    GET_MASTER_PERSONA,
    {
      onCompleted({ getUserAttributeMaster }) {
        let data = [];
        if (!_.isEmpty(getUserAttributeMaster)) {
          getUserAttributeMaster.map((item) => {
            data.push({ name: item.name, value: item._id });
          });
        }
        setPersona(data);
      },
    }
  );

  const [getStoreProductAttributeMaster, { loading: loadingSPAM }] =
    useLazyQuery(GET_STORE_PRODUCTS, {
      onCompleted({ getProductAttributeMaster }) {
        let data = [];
        if (!_.isEmpty(getProductAttributeMaster)) {
          getProductAttributeMaster.map((item) => {
            data.push({
              name: item.name,
              value: item.name,
              catId: item.catId,
            });
          });
          setStoreProducts([
            ...data,
            { name: "style_club", value: "style_club" },
          ]);
        }
      },
    });

  const { loading: loadingStylists } = useQuery(GET_ALL_STYLISTS, {
    onCompleted({ getAllStylists }) {
      let tempData = [];
      getAllStylists.map((item) => {
        tempData.push({ name: item.name, value: item._id });
      });
      setStylists(tempData);
    },
  });

  const getInitialData = async () => {
    await getStoreProductAttributeMaster({
      variables: {
        filter: {
          masterName: MASTER_NAME,
        },
      },
    });
    await getMasterPersona({
      variables: {
        filter: {
          masterName: "master_persona",
        },
      },
    });
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return {
    loading: loadingSPAM || loadingColors || loadingMP || loadingStylists,
    storeProducts,
    colors,
    persona,
    stylists,
  };
};
