import React, { Fragment, useState, useEffect } from "react";
import _ from "lodash";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { Box, Button, Typography } from "@material-ui/core";
import Link from "next/link";
// Styles
import useStyles from "./styles";

// Apollo
import {
  GET_USER_LOOKS_RECO,
  DELETE_RECOMMENED_LOOKS,
  GET_LOOKS_FILTER,
  GET_ADD_LOOKS_RECOMMENDATION,
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

  const [getUserLooksFilter, { data: looksData, loading: looksLoading }] =
    useLazyQuery(GET_LOOKS_FILTER);
  const { data: { getPersonalizedLooksByProducts } = {}, loading: loadingGPL } =
    useQuery(GET_USER_LOOKS_RECO, {
      variables: {
        params: {
          userId: currentUser._id,
          catId: router.query.catId,
          isAccessory: false,
        },
      },
      skip: _.isEmpty(router.query.catId) || _.isEmpty(router.query.uid),
    });

  const [getAddUserLookRecommendation, { loading: loadingUL }] = useMutation(
    GET_ADD_LOOKS_RECOMMENDATION,
    {
      onCompleted() {
        alert("Looks Added Successfully");
      },
      refetchQueries: [
        {
          query: GET_USER_LOOKS_RECO,
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

  const [userDeleteRecommendedLook, { loading: loadingDURL }] = useMutation(
    DELETE_RECOMMENED_LOOKS,
    {
      onError(error) {},
      onCompleted() {
        //alert("Deleted successfully");
      },
      refetchQueries: [
        {
          query: GET_USER_LOOKS_RECO,
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

  const columns: GridColDef[] = [
    { field: "id", hide: true },
    { field: "name", hide: true },
    {
      field: "lId",
      width: 100,
      hide: false,
      headerName: "LId",
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
      field: "price",
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
                  await getAddUserLookRecommendation({
                    variables: {
                      lookId: data.row.id,
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
      if (!_.isEmpty(looksData)) {
        const { looksFilter } = looksData;
        let allProducts = [];
        if (!_.isEmpty(looksFilter)) {
          looksFilter.map((item) => {
            allProducts.push({
              id: item._id,
              name: item.name,
              title: item.title,
              lId: item.lId,
              action: "",
              image: item.images[0],
              price: `Rs ${item.price}/-`,
            });
          });
        }
        return allProducts;
      }
    } else {
      if (!_.isEmpty(getPersonalizedLooksByProducts)) {
        const { looks } = getPersonalizedLooksByProducts;
        let allProducts = [];
        if (!_.isEmpty(looks)) {
          looks.map((item) => {
            allProducts.push({
              id: item._id,
              name: item.name,
              title: item.title,
              lId: item.lId,
              action: "",
              image: item.images[0],
              price: `Rs ${item.price}/-`,
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
    if (!_.isEmpty(getPersonalizedLooksByProducts)) {
      setDataRow(getAllRecProductsData());
    }
  }, [getPersonalizedLooksByProducts]);

  useEffect(() => {
    if (isAddProduct) {
      getUserLooksFilter({
        variables: {
          params: {},
        },
      });
    }
  }, [isAddProduct]);

  useEffect(() => {
    if (!_.isEmpty(looksData)) {
      const { looksFilter } = looksData;
      if (!_.isEmpty(looksFilter)) {
        setProducts(getAllRecProductsData());
      }
    }
  }, [looksData]);

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
            pageTitle={`${router.query.type} category Looks list`}
            btnTitle="Cancel"
          />
          <DataGrid
            classes={{ root: classes.dataGridBoxRoot }}
            rows={products}
            autoPageSize={false}
            pageSize={100}
            hideFooterRowCount={true}
            loading={looksLoading || loadingUL}
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
            pageTitle="Recommended Looks List"
            btnTitle="+ Add Looks"
          />
          <DataGrid
            classes={{ root: classes.dataGridBoxRoot }}
            rows={dataRow}
            autoPageSize={false}
            pageSize={100}
            hideFooterRowCount={true}
            loading={loadingGPL || loadingDURL}
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
                  userDeleteRecommendedLook({
                    variables: {
                      userId: currentUser._id,
                      lookId: selectedId,
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
