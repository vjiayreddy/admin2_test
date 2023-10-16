import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EditRecommendations from "../../src/components/Ui/dataGrid/editGroomingRecommendations";

// Apollo
import { useLazyQuery, useQuery } from "@apollo/client";
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import {
  GET_GROOMING_RECOMMENDATIONS,
  GET_USER_GROOMING_RECOMMENDED_ATTRIBUTES,
  GET_USER_SELECTIONS,
  GET_GROOMING_PARTNERS,
} from "../../src/apollo/queries/grooming";

import LoadingIndicatorComponent from "../../src/components/Ui/loading";
import IntroSectionComponent from "../../src/components/sections/recommendation/intro";
import GroomingSlider from "../../src/components/Ui/sliders/grooming";
import PsgSlider from "../../src/components/Ui/sliders/grooming/slider";
import GroomingPartners from "../../src/components/Ui/sliders/grooming/partner";
import UserLayoutComponent from "../../src/components/layouts/UserLayout";

const useStyles = makeStyles((theme) => ({
  howToGroomeSection: {
    ...theme.typography.gridContainer,
    backgroundColor: theme.palette.secondary.main,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 30,
  },
  howToGroomeLabel: {
    color: theme.palette.common.white,
    fontSize: 32,
    textAlign: "center",
  },
  howToGroomeDivider: {
    height: 1,
    backgroundColor: "#A3A6B5",
    width: "80%",
    margin: "0 auto",
    mixBlendMode: `normal`,
    opacity: 0.5,
    marginTop: 20,
  },
  groomingCardBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  groomingCardImage: {
    height: 150,
    width: 150,
    borderRadius: "100%",
    backgroundSize: "top center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
  groominCardLbl: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  groomingCardSubTitle: {
    color: "#A3A6B5",
    textAlign: "center",
    fontSize: 14,
    lineHeight: "21px",
  },
  grooming_grid: {
    marginTop: 30,
  },

  tabRoot: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  sectionTopUserInfo: {
    paddingTop: 12,
    paddingBottom: 32,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: theme.palette.common.white,
    width: "100%",
    margin: 0,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
    },
  },
  faceTyHeadingLbl: {
    fontSize: 20,
    fontFamily: "MPF_HEAVY",
  },
  faceTypeLbl: {
    fontSize: 18,
    fontFamily: "MPF_HEAVY",
  },
  infoLabel: {
    fontSize: 16,
    lineHeight: "30px",
    fontWeight: 500,

    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
      marginTop: 30,
      fontSize: 15,
      lineHeight: "25px",
    },
  },
  sectionBodyElement: {
    paddingTop: 35,
    paddingBottom: 35,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  sectionBodyElementLbl: {
    fontSize: 30,
    lineHeight: "53px",
    [theme.breakpoints.only("xs")]: {
      padding: 0,
      fontSize: 25,
      lineHeight: "35px",
      marginBottom: 10,
    },
  },

  sectionBodyElementLblStyle: {
    fontSize: 40,
    lineHeight: "53px",
    fontFamily: "MPF_STYLE",
    fontWeight: 500,
    [theme.breakpoints.only("xs")]: {
      padding: 0,
      fontSize: 35,
    },
  },
  sectionBodyElementSubLbl: {
    fontSize: 18,
    lineHeight: "30px",
    fontWeight: 500,
    paddingLeft: 150,
    paddingRight: 150,
    [theme.breakpoints.only("xs")]: {
      padding: 0,
      fontSize: 15,
      paddingLeft: 10,
      paddingRight: 10,
      lineHeight: "20px",
    },
  },
  knowYourStyleWrapper: {
    width: "100%",
    margin: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    paddingTop: 50,
    backgroundColor: "#EEEEEE",
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 0,
      paddingTop: 20,
      fontSize: 16,
      paddingBottom: 0,
    },
  },
}));

const GroomingCard = ({ title, subTitle, imgUrl }) => {
  const classes = useStyles();
  return (
    <Box className={classes.groomingCardBox}>
      <Box
        mb={3}
        className={classes.groomingCardImage}
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></Box>
      <Box>
        <Typography
          variant="h2"
          component="h6"
          align="center"
          classes={{ root: classes.groominCardLbl }}
        >
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="body2"
          component="p"
          classes={{ root: classes.groomingCardSubTitle }}
        >
          {subTitle}
        </Typography>
      </Box>
    </Box>
  );
};

const CategoryPage = (props) => {
  const classes = useStyles();
  const { session, user } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [groomingConfig, setGroomingConfig] = useState(null);
  const [sliderData, setSliderData] = useState([]);
  const router = useRouter();
  const [faceTypeId, setFaceTypeId] = useState(null);
  const [groomingTips, setGroomingTips] = useState(null);

  const { loading: loadingGP, data: { getAllGroomingPartners } = {} } =
    useQuery(GET_GROOMING_PARTNERS);

  const [
    getUserGroomingRecommendedAttributes,
    { data: dataUGRA, loading: UGRA },
  ] = useLazyQuery(GET_USER_GROOMING_RECOMMENDED_ATTRIBUTES);

  const [
    getUserPersonalizeGroomingPageConfig,
    { data: dataPGP, loading: loadingPGP },
  ] = useLazyQuery(GET_GROOMING_RECOMMENDATIONS);

  const [getUserSelections, { data: dataUS, loading: loadingUS }] =
    useLazyQuery(GET_USER_SELECTIONS);

  useEffect(() => {
    getUserPersonalizeGroomingPageConfig({
      variables: {
        gcatId: router.query.catId,
      },
    });
    getUserGroomingRecommendedAttributes({
      variables: {
        filter: {
          userId: router.query.uid,
          catId: router.query.catId,
        },
      },
    });
  }, [router]);

  useEffect(() => {
    if (!_.isEmpty(dataPGP)) {
      const { getUserPersonalizeGroomingPageConfig } = dataPGP;
      setGroomingTips(getUserPersonalizeGroomingPageConfig.grooming_tips);
    }
    if (!_.isEmpty(dataPGP)) {
      const { getUserPersonalizeGroomingPageConfig } = dataPGP;
      setGroomingConfig(getUserPersonalizeGroomingPageConfig);

      getUserSelections({
        variables: {
          filter: {
            userId: router.query.uid,
            master_name:
              getUserPersonalizeGroomingPageConfig.user_attributes[0]
                .master_name,
          },
        },
      });
    }
  }, [dataPGP]);

  useEffect(() => {
    if (!_.isEmpty(dataUS)) {
      if (!_.isEmpty(dataUS.getUserSelections)) {
        setFaceTypeId(dataUS.getUserSelections[0].value);
      }
    }
  }, [dataUS]);

  useEffect(() => {
    if (!_.isEmpty(dataUGRA)) {
      const { getUserGroomingRecommendedAttributes } = dataUGRA;
      let data = [];
      if (!_.isEmpty(getUserGroomingRecommendedAttributes)) {
        getUserGroomingRecommendedAttributes.map((item, index) => {
          data.push({
            id: `slider-${index}`,
            itemId: item.value,
            label: item.name,
            note: !_.isEmpty(item.note)
              ? item.note
              : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",`,
            products: !_.isEmpty(item.personalizeImage)
              ? [item.personalizeImage]
              : ["/images/no-image.png"],
            filterProducts: [],
          });
        });
        setSliderData(data);
      }
    }
  }, [dataUGRA]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <UserLayoutComponent session={session} user={user}>
      {user.loading || loadingPGP || loadingUS || UGRA || loadingGP ? (
        <LoadingIndicatorComponent height={null} />
      ) : (
        <Fragment>
          <Tabs
            classes={{ root: classes.tabRoot }}
            value={tabIndex}
            onChange={(e, index) => setTabIndex(index)}
          >
            <Tab label="RECOMMENDATIONS" />
            <Tab label="EDIT RECOMMENDATION" />
            {/* <Tab label="PRODUCTS" />
            <Tab label="LOOKS" />
            <Tab label="EDIT RECOMMENDATION" /> */}
          </Tabs>

          {tabIndex === 0 && (
            <Fragment>
              {!_.isEmpty(groomingConfig) && (
                <IntroSectionComponent
                  data={{
                    title: `${capitalizeFirstLetter(
                      router.query.type
                    )} Recommendations`,
                    dec: groomingConfig.note,
                  }}
                />
              )}

              {dataUS && !_.isEmpty(dataUS.getUserSelections) && (
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  classes={{ root: classes.sectionTopUserInfo }}
                  style={{ backgroundColor: "#e1f4fe" }}
                  direction="column"
                >
                  <Grid item container>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      item
                      direction="column"
                      xs={12}
                      md={3}
                      lg={3}
                      xl={3}
                    >
                      <Grid item>
                        <Box pt={1}>
                          <Typography
                            className={classes.faceTyHeadingLbl}
                            variant="h2"
                            component="h6"
                          >
                            {groomingConfig &&
                              `Your ${groomingConfig.user_attributes[0].label}`}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box pt={2}>
                          <img
                            width={150}
                            src={dataUS.getUserSelections[0].image}
                          />
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box pt={2}>
                          <Typography
                            variant="h2"
                            className={classes.faceTypeLbl}
                            component="h6"
                          >
                            {dataUS.getUserSelections[0].name}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      alignItems="center"
                      justify="center"
                      direction="column"
                      item
                      xs={12}
                      md={9}
                      lg={9}
                      xl={9}
                    >
                      <Grid item>
                        <Typography
                          variant="h3"
                          component="p"
                          className={classes.infoLabel}
                        >
                          {dataUS.getUserSelections[0].note}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {!_.isEmpty(faceTypeId) && (
                <GroomingSlider
                  title="Celebs You Resemble With"
                  faceTypeId={faceTypeId}
                  bgColor="#FFFFFF"
                />
              )}
              <Grid
                classes={{ root: classes.sectionBodyElement }}
                container
                direction="column"
              >
                <Grid item xs={12}>
                  <Typography
                    classes={{ root: classes.sectionBodyElementLbl }}
                    variant="h3"
                    component="h3"
                    align="center"
                  >
                    Your recommended {router.query.type}styles
                  </Typography>
                  <Typography
                    variant="h3"
                    component="p"
                    align="center"
                    classes={{ root: classes.sectionBodyElementSubLbl }}
                  >
                    Your Personal Stylist has recommended you these{" "}
                    {router.query.type}styles according to your face shape.
                  </Typography>
                </Grid>
              </Grid>
              <div>
                {sliderData.map((item, index) => (
                  <section key={index} id={item.id}>
                    <PsgSlider
                      item={item}
                      left={(index + 1) % 2 === 0 ? false : true}
                      index={index}
                    />
                    <Box>
                      <GroomingSlider
                        title="Matching Celebrity Looks"
                        bgColor="#FFFFFF"
                        catId={router.query.catId}
                        faceTypeId={faceTypeId}
                        styleIds={[item.itemId]}
                      />
                    </Box>
                  </section>
                ))}
              </div>
              {groomingTips && (
                <Box className={classes.howToGroomeSection}>
                  <Box p={2}>
                    <Typography
                      variant="h3"
                      component="h3"
                      className={classes.howToGroomeLabel}
                    >
                      {groomingTips.label}
                    </Typography>
                  </Box>
                  <Box className={classes.howToGroomeDivider}></Box>
                  <Box mt={7}>
                    <Grid container spacing={2}>
                      {groomingTips.tips.map((item, index) => (
                        <Grid
                          key={index}
                          item
                          xs={12}
                          md={3}
                          lg={3}
                          xl={3}
                          sm={6}
                        >
                          <GroomingCard
                            imgUrl={item.image}
                            title={item.title}
                            subTitle={item.note}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              )}

              <Grid
                classes={{ root: classes.knowYourStyleWrapper }}
                container
                justify="center"
                alignItems="center"
                spacing={2}
              >
                {!_.isEmpty(getAllGroomingPartners) && (
                  <Grid item xs={12}>
                    <Typography
                      classes={{ root: classes.knowYourStyleLbl }}
                      variant="h3"
                      component="h3"
                      align="left"
                    >
                      {!_.isEmpty(groomingConfig) &&
                        groomingConfig.curated_products.label}
                    </Typography>
                    <GroomingPartners data={getAllGroomingPartners} />
                  </Grid>
                )}
              </Grid>
            </Fragment>
          )}
          {tabIndex === 1 && (
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
  baseUrl: "/grooming",
});
