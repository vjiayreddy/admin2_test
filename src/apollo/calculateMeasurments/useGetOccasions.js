import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_OCCASIONS } from "../../apollo/queries/navigation";

export const useGetOccasions = () => {
  const [categories, setCategories] = useState();
  const { data: occasionsData } = useQuery(GET_ALL_OCCASIONS);
  useEffect(() => {
    if (!_.isEmpty(occasionsData)) {
      const { getAllOccasions } = occasionsData;
      const getAllProducts = _.filter(
        getAllOccasions,
        (item) => item.name === "products"
      );
      if (!_.isEmpty(getAllProducts)) {
        const getProductsMenu = [...getAllProducts[0].categories];
        const options = getProductsMenu.map((item) => {
          return {
            name: item.label,
            value: item._id,
          };
        });
        const otherCatrgories = [
          {
            value: "6036451627e32d7fd776a580",
            name: "Dhoti",
          },
          {
            value: "5da7220571762c2a58b27a72",
            name: "pagdi",
          },
          {
            value: "621a34485417ab1e143a5245",
            name: "patyala",
          },
          {
            value: "5da7220571762c2a58b27a73",
            name: "jootis",
          },
          {
            value: "6036446927e32d7fd776a57f",
            name: "chudidar",
          },
          {
            value: "5ebb993abcb3d23714b2ebf4",
            name: "shoes",
          },
        ];
        setCategories([...options, ...otherCatrgories]);
      }
    }
  }, [occasionsData]);
  return {
    categories,
  };
};
