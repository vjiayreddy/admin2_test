import React, { Fragment, useState, useEffect } from "react";
import _ from "lodash";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { Box, Button, Typography } from "@material-ui/core";
import Link from "next/link";
// Styles
import useStyles from "./styles";

// Apollo
import {
  GET_CURATED_PRODUCTS,
  DELETE_USER_PRODUCT_RECO,
  PRODUCT_FILTERS,
  ADD_PRODUCT_TO_RECO,
} from "../../../apollo/queries/styleclub";
import { useRouter } from "next/router";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";

// UI
import InfoDialogComponent from "../../Ui/dialog/infoDialog";
import SearchBarWithButton from "../searchbar-with-button";

const ProductsList = ({ authData }) => {
  const classes = useStyles();
  const router = useRouter();
  const [dataRow, setDataRow] = useState([]);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const { data: currentUser } = authData;

  const [addUserProductToRecommendation, { loading: loadingAUP }] = useMutation(
    ADD_PRODUCT_TO_RECO,
    {
      onCompleted() {
        alert("Product Added Successfully");
      },
      refetchQueries: [
        {
          query: GET_CURATED_PRODUCTS,
          variables: {
            params: {
              userId: currentUser._id,
              catId: router.query.catId,
              isAccessory: false,
            },
          },
        },
      ],
    }
  );

  const [productFilter, { loading: loadingProducts, data: dataProducts }] =
    useLazyQuery(PRODUCT_FILTERS, {
      onCompleted() {},
    });

  const [deleteUserRecommendedProduct, { loading: loadingDURP }] = useMutation(
    DELETE_USER_PRODUCT_RECO,
    {
      onCompleted() {
        alert("Deleted successfully");
      },
      refetchQueries: [
        {
          query: GET_CURATED_PRODUCTS,
          variables: {
            params: {
              userId: currentUser._id,
              catId: router.query.catId,
              isAccessory: false,
            },
          },
        },
      ],
    }
  );

  const {
    data: { getPersonalizedProducts } = {},
    loading: personalizeLoading,
    error: personalizeError,
  } = useQuery(GET_CURATED_PRODUCTS, {
    variables: {
      params: {
        userId: currentUser._id,
        catId: router.query.catId,
        isAccessory: false,
      },
    },
    skip: _.isEmpty(router.query.uid) || _.isEmpty(router.query.catId),
  });

  const columns: GridColDef[] = [
    { field: "id", hide: true },
    { field: "name", hide: true },
    {
      field: "pidSerial",
      width: 100,
      hide: false,
      headerName: "P.NO",
      sortable: false,
    },
    {
      field: "image",
      hide: false,
      headerName: "Image",
      sortable: false,
      width: 100,
      renderCell: (data) => {
        return (
          <Link href={`//myperfectfit.co.in/shop/${data.row.name}`}>
            <a target="_blank">
              <div
                style={{ backgroundImage: `url(${data.row.image})` }}
                className={classes.tableImageWrapper}
              ></div>
            </a>
          </Link>
        );
      },
    },
    {
      field: "title",
      hide: false,
      flex: 2,
      headerName: "Product",
      renderCell: (data) => {
        return (
          <Link href={`//myperfectfit.co.in/shop/${data.row.name}`}>
            <a target="_blank">{data.row.title}</a>
          </Link>
        );
      },
    },
    {
      field: "discPrice",
      headerName: "Price",
      hide: false,
      flex: 1,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (data) => {
        return (
          <Box>
            {isAddProduct ? (
              <Button
                onClick={async () => {
                  await addUserProductToRecommendation({
                    variables: {
                      productId: data.row.id,
                      userId: currentUser._id,
                      stylistId: "5de75fa5a72f8129f42bba2a",
                    },
                  });
                }}
                size="small"
                color="secondary"
              >
                Add
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setSelectedId(data.row.id);
                  setOpenModel(true);
                }}
                size="small"
                color="secondary"
              >
                Delete
              </Button>
            )}
          </Box>
        );
      },
    },
  ];

  const getAllRecProductsData = () => {
    if (isAddProduct) {
      if (!_.isEmpty(dataProducts)) {
        const { productsFilter } = dataProducts;
        let allProducts = [];
        if (!_.isEmpty(productsFilter)) {
          const { products } = productsFilter;
          products.map((item) => {
            allProducts.push({
              id: item._id,
              name: item.name,
              title: item.title,
              pidSerial: item.pidSerial,
              action: "",
              image: item.images[0],
              discPrice: `Rs ${item.discPrice}/-`,
            });
          });
        }
        return allProducts;
      }
    } else {
      if (!_.isEmpty(getPersonalizedProducts)) {
        const { products } = getPersonalizedProducts;
        let allProducts = [];
        if (!_.isEmpty(products)) {
          products.map((item) => {
            allProducts.push({
              id: item._id,
              name: item.name,
              title: item.title,
              pidSerial: item.pidSerial,
              action: "",
              image: item.images[0],
              discPrice: `Rs ${item.discPrice}/-`,
            });
          });
        }
        return allProducts;
      }
    }
  };

  const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase();
    const searchPrice = new RegExp(keyword);
    const searchPId = new RegExp(keyword);
    return array.filter((value) => {
      return (
        value.title.toLowerCase().match(new RegExp(searchTerm, "g")) ||
        searchPId.test(value.pidSerial) ||
        searchPrice.test(value.discPrice)
      );
    });
  };

  const handleSearchInput = async (e) => {
    let value = e.target.value;
    if (value.length > 2) {
      let search = await arraySearch(isAddProduct ? products : dataRow, value);
      if (isAddProduct) {
        setProducts(search);
      } else {
        setDataRow(search);
      }
    } else {
      if (isAddProduct) {
        setProducts(getAllRecProductsData());
      } else {
        setDataRow(getAllRecProductsData());
      }
    }
  };

  useEffect(() => {
    if (!_.isEmpty(getPersonalizedProducts)) {
      setDataRow(getAllRecProductsData());
    }
  }, [getPersonalizedProducts]);

  useEffect(() => {
    if (isAddProduct) {
      productFilter({
        variables: {
          params: {
            catIds: [router.query.catId],
            occasionId: "5fc2677bfa7ff20df01ab8ce",
          },
        },
      });
    }
  }, [isAddProduct]);

  useEffect(() => {
    if (!_.isEmpty(dataProducts)) {
      const { productsFilter } = dataProducts;
      if (!_.isEmpty(productsFilter)) {
        setProducts(getAllRecProductsData());
      }
    }
  }, [dataProducts]);

  return (
    <Fragment>
      {isAddProduct ? (
        <Fragment>
          <SearchBarWithButton
            onChange={handleSearchInput}
            onClickBtn={() => {
              setIsAddProduct(false);
            }}
            isShowBtn={true}
            pageTitle={`${router.query.type} category products list`}
            btnTitle="Cancel"
          />
          <DataGrid
            classes={{ root: classes.dataGridBoxRoot }}
            rows={products}
            autoPageSize={false}
            pageSize={100}
            hideFooterRowCount={true}
            loading={loadingProducts || loadingAUP}
            columns={columns}
          />
        </Fragment>
      ) : (
        <Fragment>
          <SearchBarWithButton
            onChange={handleSearchInput}
            onClickBtn={() => {
              setIsAddProduct(true);
            }}
            isShowBtn={true}
            pageTitle="Recommended Product List"
            btnTitle="+ Add Product"
          />
          <DataGrid
            classes={{ root: classes.dataGridBoxRoot }}
            rows={dataRow}
            autoPageSize={false}
            pageSize={100}
            hideFooterRowCount={true}
            loading={personalizeLoading || loadingDURP}
            columns={columns}
          />
        </Fragment>
      )}

      <InfoDialogComponent
        open={openModel}
        onCloseModel={() => setOpenModel(false)}
        maxWidth="xs"
      >
        <Box
          flexDirection="column"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Typography variant="h6" align="center">
            Are you sure you want to delete?
          </Typography>
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box pr={1}>
              <Button
                color="primary"
                onClick={() => {
                  deleteUserRecommendedProduct({
                    variables: {
                      userId: currentUser._id,
                      productId: selectedId,
                      stylistId: "5de75fa5a72f8129f42bba2a",
                    },
                  });
                  setOpenModel(false);
                }}
              >
                Yes
              </Button>
            </Box>
            <Box>
              <Button color="secondary" onClick={() => setOpenModel(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </InfoDialogComponent>
    </Fragment>
  );
};

export default ProductsList;
