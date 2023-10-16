import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import _ from "lodash";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Apollo
import { useLazyQuery, useQuery } from "@apollo/client";
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import {
  GET_USER_PERSONALIZE_CONFIG,
  GET_CURATED_PRODUCTS,
  GET_USER_LOOKS_RECO,
  GET_USER_BLOG_RECO,
  GET_USER_PRODUCT_RECO,
} from "../../src/apollo/queries/styleclub";

// UI

import LoadingIndicatorComponent from "../../src/components/Ui/loading";
import CuratedProductsComponent from "../../src/components/sections/recommendation/curated";
import LooksComponent from "../../src/components/sections/recommendation/looks";
import IntroSectionComponent from "../../src/components/sections/recommendation/intro";
import BlogSectionComponent from "../../src/components/sections/recommendation/blog";
import StyleSectionComponent from "../../src/components/sections/recommendation/styles";
import ProductsListTableComponent from "../../src/components/Ui/dataGrid/productsList";
import LooksListTableComponent from "../../src/components/Ui/dataGrid/looksRecommendations";
import EditRecommendations from "../../src/components/Ui/dataGrid/editRecommendations";
import UserLayoutComponent from "../../src/components/layouts/UserLayout";

const useStyles = makeStyles((theme: any) => ({
  tabRoot: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const CategoryPage = (props: any) => {
  const classes = useStyles();
  const { session, user } = props;

  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();
  const [personalizeConfig, setPersonalizeConfig] = useState(null);
  const [productRecAttr, setProductRecAttr] = useState([]);
  const [looks, setLooks] = useState([]);
  const [getUserProductReco, { data: dataRocAttrs }] = useLazyQuery(
    GET_USER_PRODUCT_RECO
  );

  const {
    data: { getPersonalizedProducts } = {},
    loading: personalizeLoading,
    error: personalizeError,
  } = useQuery(GET_CURATED_PRODUCTS, {
    variables: {
      params: {
        userId: router.query.uid,
        catId: router.query.catId,
        isAccessory: false,
      },
      page: 1,
      limit: 20,
    },
    skip: _.isEmpty(router.query.uid) || _.isEmpty(router.query.catId),
  });
  const { data: { getUserBlogRecommendation } = {}, loading: blogsLoading } =
    useQuery(GET_USER_BLOG_RECO, {
      variables: {
        filters: {
          catIds: [router.query.catId],
        },
      },
      skip: _.isEmpty(router.query.catId),
    });

  const {
    data: { getUserPersonalizePageConfig } = {},
    loading,
    error,
  } = useQuery(GET_USER_PERSONALIZE_CONFIG, {
    variables: { catId: router.query.catId },
    skip: _.isEmpty(router.query.catId) || _.isEmpty(router.query.uid),
  });

  const { data: { getPersonalizedLooksByProducts } = {}, loading: loadingGPL } =
    useQuery(GET_USER_LOOKS_RECO, {
      variables: {
        params: {
          userId: router.query.uid,
          catId: router.query.catId,
          isAccessory: false,
        },
      },
      skip: _.isEmpty(router.query.catId) || _.isEmpty(router.query.uid),
    });

  useEffect(() => {
    if (!_.isEmpty(getUserPersonalizePageConfig)) {
      setPersonalizeConfig(getUserPersonalizePageConfig);
      const { attributes } = getUserPersonalizePageConfig;
      let masterNames = [];
      attributes.map((item) => masterNames.push(item.master_name));
      getUserProductReco({
        variables: {
          filter: {
            userId: router.query.uid,
            master_name: masterNames,
            catId: router.query.catId,
          },
        },
      });
    }
  }, [getUserPersonalizePageConfig]);

  useEffect(() => {
    if (!_.isEmpty(dataRocAttrs)) {
      let sliderData = [];
      const { attributes } = getUserPersonalizePageConfig;
      const productsReco = _.groupBy(
        dataRocAttrs.getUserProductRecommendedAttributes,
        "master_name"
      );
      attributes.map((attribute, index) => {
        if (!_.isEmpty(productsReco[attribute.master_name])) {
          sliderData.push({
            id: `slider-${index}`,
            label: attribute.label,
            note: attribute.note,
            products: productsReco[attribute.master_name],
          });
        }
      });
      setProductRecAttr(sliderData);
    }
  }, [dataRocAttrs]);

  useEffect(() => {
    if (!_.isEmpty(getPersonalizedLooksByProducts)) {
      const { looks } = getPersonalizedLooksByProducts;
      setLooks(looks);
    }
  }, [getPersonalizedLooksByProducts]);

  return (
    <UserLayoutComponent session={session} user={user}>
      {user.loading || personalizeLoading || loading || loadingGPL ? (
        <LoadingIndicatorComponent height={null} />
      ) : (
        <Fragment>
          <Tabs
            classes={{ root: classes.tabRoot }}
            value={tabIndex}
            onChange={(e, index) => setTabIndex(index)}
          >
            <Tab label="RECOMMENDATIONS" />
            <Tab label="PRODUCTS" />
            <Tab label="LOOKS" />
            <Tab label="EDIT RECOMMENDATION" />
          </Tabs>

          {tabIndex === 0 && (
            <Fragment>
              {!_.isEmpty(personalizeConfig) && (
                <IntroSectionComponent
                  data={{
                    title: `${router.query.type} Recommendations`,
                    dec: personalizeConfig.note,
                  }}
                />
              )}
              {!_.isEmpty(personalizeConfig) && !_.isEmpty(productRecAttr) && (
                <StyleSectionComponent data={productRecAttr} />
              )}

              {!_.isEmpty(personalizeConfig) && !_.isEmpty(looks) && (
                <LooksComponent
                  data={{
                    title: personalizeConfig.looks.label,
                    dec: personalizeConfig.looks.description,
                    looks: looks,
                  }}
                />
              )}

              {!_.isEmpty(getPersonalizedProducts) &&
                !_.isEmpty(personalizeConfig) && (
                  <CuratedProductsComponent
                    data={{
                      products: getPersonalizedProducts.products,
                      title: personalizeConfig.curated_products.label,
                      dec: personalizeConfig.curated_products.description,
                    }}
                  />
                )}
              {!_.isEmpty(getUserBlogRecommendation) &&
                !_.isEmpty(personalizeConfig) && (
                  <BlogSectionComponent
                    data={{
                      blogs: getUserBlogRecommendation.blogs,
                      title: router.query.type,
                    }}
                  />
                )}
            </Fragment>
          )}
          {tabIndex === 1 && (
            <div style={{ height: `calc(100vh - 175px)` }}>
              <ProductsListTableComponent authData={user} />
            </div>
          )}
          {tabIndex === 2 && (
            <div style={{ height: `calc(100vh - 175px)` }}>
              <LooksListTableComponent authData={user} />
            </div>
          )}
          {tabIndex === 3 && (
            <div style={{ height: `calc(100vh - 175px)` }}>
              <EditRecommendations authData={user} />
            </div>
          )}
        </Fragment>
      )}
    </UserLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: CategoryPage,
  baseUrl: "/recommendation",
});
