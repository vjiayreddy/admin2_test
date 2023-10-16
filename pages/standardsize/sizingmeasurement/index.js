import React, { Fragment, useState, FC, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { NextPage } from "next";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/router";

// Apollo

import { nonAuthenticated } from "../../../src/apollo/hoc/withAuthRedirect";
import { useLazyQuery } from "@apollo/client";

import {
  GET_MEASURMENTS_CONFIG,
  GET_USER_MEASURMENTS_HISTORY,
} from "../../../src/apollo/queries/measurments";

// Componentsss
import LoadingIndicatorComponent from "../../../src/components/Ui/loading";
import MeasurmentsForm from "../../../src/components/forms/measurments";
import StandardMeasurmentsForm from "../../../src/components/forms/standardMeasurementForm";
import MeasurmentsDataGridComponent from "../../../src/components/Ui/dataGrid/measurments";
import StandardMeasurementsDataGridComponent from "../../../src/components/Ui/dataGrid/standardMeasurements";
import BodyProfileComponent from "../../../src/components/forms/measurments/bodyprofile";
import UploadImagesForm from "../../../src/components/forms/measurments/uploadForm";
import UserLayoutComponent from "../../../src/components/layouts/UserLayout";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  tabRoot: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const MeasurementsPage = (props) => {
  const classes = useStyles();
  // const { loading, authData } = props;
  // const { currentUser } = authData;
  const { session, user } = props;
  const [dataGrid, setDataGrid] = useState([]);
  const [tabdIndex, setTabIndex] = useState(0);
  const router = useRouter();

  const [
    getUserMeasurementFormulaConfig,
    { data: dataGUMF, loading: loadingGMFC },
  ] = useLazyQuery(GET_MEASURMENTS_CONFIG);

  const [
    getSavedUserMeasurments,
    { loading: loadingSUM, data: allMessurmentsData },
  ] = useLazyQuery(GET_USER_MEASURMENTS_HISTORY, {
    onCompleted(data) {},
  });

  const getMeasurmentDataAndTimeFormate = (data) => {
    if (!_.isEmpty(data)) {
      return `${moment(
        `${data.dateRecorded.year}/${data.dateRecorded.month}/${data.dateRecorded.day}`
      ).format("MMM D, YYYY")} - ${moment(
        `${data.dateRecorded.hour}:${data.dateRecorded.minute}:00`,
        "HH:mm"
      ).format("hh:mm A")}`;
    }
    return "";
  };

  useEffect(() => {
    if (!_.isEmpty(allMessurmentsData)) {
      const { getUserMeasurements } = allMessurmentsData;
      if (!_.isEmpty(getUserMeasurements)) {
        const _userMeasurments = [];
        getUserMeasurements.map((item) => {
          if (!_.isEmpty(item)) {
            _userMeasurments.push({
              id: item._id,
              name: item.category[0]["name"],
              date: getMeasurmentDataAndTimeFormate(item),
              measuredBy: !_.isEmpty(item.measuredBy)
                ? item.measuredBy
                : "Self",
              pdf: item.pdf,
              type: !_.isEmpty(item.type) ? item.type : "Alteration",
              options: item.options,
              remark: item.remarks,
              standardsize: !_.isEmpty(item?.standardSizing)
                ? item?.standardSizing?.[0]["size"]
                : "-",
            });
          }
        });
        setDataGrid(_userMeasurments);
      }
    }
  }, [allMessurmentsData]);

  useEffect(() => {
    getUserMeasurementFormulaConfig();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataGUMF)) {
      const { getMeasurementFormulaConfig } = dataGUMF;
      if (!_.isEmpty(getMeasurementFormulaConfig)) {
        localStorage.setItem(
          "mesurment_config",
          JSON.stringify(getMeasurementFormulaConfig)
        );
      }
    }
  }, [dataGUMF]);

  useEffect(() => {
    if (router.query.tabIndex) {
      setTabIndex(Number(router.query.tabIndex));
    }
  }, [router.query.tabIndex]);

  return (
    <UserLayoutComponent session={session} user={user}>
      {user.loading ? (
        <LoadingIndicatorComponent height={null} />
      ) : (
        <Fragment>
          {user.data ? (
            <Grid container direction="column">
              <Grid item xs={12}>
                <Tabs
                  classes={{ root: classes.tabRoot }}
                  indicatorColor="primary"
                  value={tabdIndex}
                  onChange={(e, index) => {
                    if (index === 1) {
                      getSavedUserMeasurments({
                        variables: {
                          userId: user.data._id,
                          catId: router?.query?.catId,
                          page: 1,
                          limit: 500,
                        },
                      });
                      setTabIndex(index);
                    } else {
                      setTabIndex(index);
                    }
                  }}
                >
                  <Tab label="Standard Measurements" />
                  <Tab label=" Standard Measurements History" />
                </Tabs>
              </Grid>
              {tabdIndex === 0 && (
                <Grid item xs={12}>
                  <StandardMeasurmentsForm
                    authToken={user.data ? user.data._id : null}
                    userInfo={user}
                    title=""
                    callBack={() => {}}
                  />
                </Grid>
              )}

              {tabdIndex == 1 && (
                <div style={{ height: `calc(100vh - 126px)` }}>
                  <StandardMeasurementsDataGridComponent
                    user={user.data}
                    loading={loadingSUM}
                    rows={dataGrid}
                  />
                </div>
              )}
            </Grid>
          ) : (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Something went wrong ....
            </Box>
          )}
        </Fragment>
      )}
    </UserLayoutComponent>
  );
};
export default nonAuthenticated({
  Component: MeasurementsPage,
  baseUrl: "/measurements",
});
