import React, { useState, useEffect, Fragment } from "react";
import { NextPage } from "next";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

import _ from "lodash";
// Apollo
import { useLazyQuery, useQuery } from "@apollo/client";
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import { GET_ALL_OCCASIONS } from "../../src/apollo/queries/navigation";
import { GET_PRODUCT_ATTRIBUTES } from "../../src/apollo/queries/grooming";
import UserLayoutComponent from "../../src/components/layouts/UserLayout";

// Ui
import LoadingIndicatorComponent from "../../src/components/Ui/loading";
import CategoryCardComponent from "../../src/components/Ui/cards/category";

const useStyles = makeStyles((theme) => ({
  categorySectionMainTitle: {
    fontSize: 25,
  },

  categoryCard: {
    width: "100%",
    minHeight: 250,
    backgroundColor: theme.palette.common.white,
    padding: 10,
    border: `1px solid #eeeeee`,
  },
  categoryCardImage: {
    minHeight: 200,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryCardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: 15,
  },
  categoryCardTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  categoryButton: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 0,
    marginTop: 0,
    fontSize: 12,
  },
}));

const RecommendationPage: NextPage = (props: any) => {
  const {
    data: { getAllOccasions } = {},
    error: allOccasionsDataError,
    loading: allOccasionsLoading,
  } = useQuery(GET_ALL_OCCASIONS);

  const [
    getGroomingProductAttributeMaster,
    { data: dataGPA, loading: loadingGPA, error: errorGPA },
  ] = useLazyQuery(GET_PRODUCT_ATTRIBUTES);

  // State
  const { session, user } = props;
  const [categories, setCategories] = useState([]);
  const [groomingCat, setGroomingCat] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (!_.isEmpty(getAllOccasions)) {
      const extractCategories = _.find(
        getAllOccasions,
        (occasion) => occasion.name === "products"
      );
      if (!_.isEmpty(extractCategories)) {
        setCategories(extractCategories.categories);
      }
      const _accessories = _.find(
        getAllOccasions,
        (occasion) => occasion.name === "accessories"
      );
      if (!_.isEmpty(_accessories)) {
        setAccessories(_accessories.categories);
      }
    }
  }, [getAllOccasions]);

  useEffect(() => {
    getGroomingProductAttributeMaster({
      variables: {
        filter: {
          masterName: "master_grooming_categories",
        },
      },
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataGPA)) {
      const { getProductAttributeMaster } = dataGPA;
      setGroomingCat(getProductAttributeMaster);
    }
  }, [dataGPA]);

  console.log(getAllOccasions);

  return (
    <UserLayoutComponent session={session} user={user}>
      <Box component="div" p={3} id="style-recommendation-section">
        {allOccasionsLoading ? (
          <LoadingIndicatorComponent height={null} />
        ) : (
          <Fragment>
            {!_.isEmpty(user.data) ? (
              <Fragment>
                <Box mb={2} component="div">
                  <Typography
                    className={classes.categorySectionMainTitle}
                    variant="h3"
                    component="h6"
                  >
                    Style Recommendations
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  {categories.map((category, index) => (
                    <Fragment key={index}>
                      {category.isEnabledForPersonalize && (
                        <CategoryCardComponent
                          data={category}
                          route="/recommendation/category"
                        />
                      )}
                    </Fragment>
                  ))}
                </Grid>

                {!_.isEmpty(groomingCat) && (
                  <Fragment>
                    <Box mt={2} mb={2} component="div">
                      <Typography
                        className={classes.categorySectionMainTitle}
                        variant="h3"
                        component="h6"
                      >
                        Grooming Recommendations
                      </Typography>
                    </Box>

                    <Grid container spacing={2}>
                      {groomingCat.map((category, index) => (
                        <CategoryCardComponent
                          key={index}
                          data={category}
                          route="/grooming/category"
                        />
                      ))}
                    </Grid>
                  </Fragment>
                )}

                {!_.isEmpty(accessories) && (
                  <Fragment>
                    <Box mb={2} mt={2} component="div">
                      <Typography
                        className={classes.categorySectionMainTitle}
                        variant="h3"
                        component="h6"
                      >
                        Style Recommendations
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      {accessories.map((item, index) => (
                        <Fragment key={index}>
                          {item.isEnabledForPersonalize && (
                            <CategoryCardComponent
                              data={item}
                              route="/recommendation/category"
                            />
                          )}
                        </Fragment>
                      ))}
                    </Grid>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <div> Something went wrong .... </div>
            )}
          </Fragment>
        )}
      </Box>
    </UserLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: RecommendationPage,
  baseUrl: "/recommendation",
});
