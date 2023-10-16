import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";

// Apollo
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import { useLazyQuery } from "@apollo/client";

// Ui Component
import AdminLayoutComponent from "../../src/components/layouts/AdminLayout";
import {
  GET_DASHBOARD_DATA,
  GET_APPOINTMENTS_DASHBOARD_DATA,
  GET_ORDER_DASHBOARD_DATA,
  GET_LEADS_DASHBOARD_DATA,
} from "../../src/apollo/queries/user";
import LoadingIndicatorComponent from "../../src/components/Ui/loading";
import MainLayout from "../../src/components/layouts/mainLayout";
import { DialogModal } from "../../src/components/Ui/dialog/dialogModal";
import { DateRange } from "../../src/components/Ui/date-range";
import moment from "moment";
import { extractDateFormateForAnalytics } from "../../src/utils/validations";

interface DateGroup {
  dateA: moment.MomentInput;
  dateB: moment.MomentInput;
}

const UserAnalytics = (props) => {
  const { session } = props;
  const [filter, setFilter] = useState("day");
  const [getDashboardData, { data, error, loading }] =
    useLazyQuery(GET_DASHBOARD_DATA);
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateGroup>({
    dateA: moment().startOf("day"),
    dateB: moment().endOf("day"),
  });

  const [
    getAppointmentDashboardData,
    {
      data: dataAppointments,
      error: errorAppointments,
      loading: loadingAppointments,
    },
  ] = useLazyQuery(GET_APPOINTMENTS_DASHBOARD_DATA);
  const [
    getStoreOrderDashboardData,
    { data: dataOrders, error: errorOrders, loading: loadingOrders },
  ] = useLazyQuery(GET_ORDER_DASHBOARD_DATA);

  const [
    getLeadsDashboardData,
    { data: dataLeads, error: errorLeads, loading: loadingLeads },
  ] = useLazyQuery(GET_LEADS_DASHBOARD_DATA);

  const onApply = () => {
    getDashboardData({
      variables: {
        startDate: extractDateFormateForAnalytics(
          dateFilter.dateA,
          "START_DATE"
        ),
        endDate: extractDateFormateForAnalytics(dateFilter.dateB, "END_DATE"),
      },
    });

    getAppointmentDashboardData({
      variables: {
        startDate: extractDateFormateForAnalytics(
          dateFilter.dateA,
          "START_DATE"
        ),
        endDate: extractDateFormateForAnalytics(dateFilter.dateB, "END_DATE"),
      },
    });
    getStoreOrderDashboardData({
      variables: {
        startDate: extractDateFormateForAnalytics(
          dateFilter.dateA,
          "START_DATE"
        ),
        endDate: extractDateFormateForAnalytics(dateFilter.dateB, "END_DATE"),
      },
    });
    getLeadsDashboardData({
      variables: {
        startDate: extractDateFormateForAnalytics(
          dateFilter.dateA,
          "START_DATE"
        ),
        endDate: extractDateFormateForAnalytics(dateFilter.dateB, "END_DATE"),
      },
    });
  };
  const onClear = () => {
    setDateFilter({ dateA: null, dateB: null });
  };

  const onReset = () => {
    setDateFilter({
      dateA: moment(Date.now()).toISOString(),
      dateB: moment(Date.now()).toISOString(),
    });
  };

  const filterAnlyticsData = () => {
    getDashboardData({
      variables: {
        startDate: extractDateFormateForAnalytics(
          dateFilter.dateA,
          "START_DATE"
        ),
        endDate: extractDateFormateForAnalytics(dateFilter.dateB, "END_DATE"),
      },
    });

    getAppointmentDashboardData({
      variables: {
        startDate: extractDateFormateForAnalytics(
          dateFilter.dateA,
          "START_DATE"
        ),
        endDate: extractDateFormateForAnalytics(dateFilter.dateB, "END_DATE"),
      },
    });
    getStoreOrderDashboardData({
      variables: {
        startDate: extractDateFormateForAnalytics(
          dateFilter.dateA,
          "START_DATE"
        ),
        endDate: extractDateFormateForAnalytics(dateFilter.dateB, "END_DATE"),
      },
    });
    getLeadsDashboardData({
      variables: {
        startDate: extractDateFormateForAnalytics(
          dateFilter.dateA,
          "START_DATE"
        ),
        endDate: extractDateFormateForAnalytics(dateFilter.dateB, "END_DATE"),
      },
    });
  };

  useEffect(() => {
    filterAnlyticsData();
  }, [filter]);

  return (
    <AdminLayoutComponent session={session}>
      <MainLayout
        pageTitle="User Analytics"
        showDropdown={true}
        showButton={true}
        btnIcon1={<DateRangeIcon style={{ color: "white" }} />}
        btnTitle="Date Filter"
        onClickBtn={() => {
          setOpenDialogModal(true);
        }}
        onChangeDropDown={(_value) => {
          let thisMoment = moment();
          setDateFilter({
            dateA: moment(thisMoment).startOf(_value),
            dateB: moment(thisMoment).endOf(_value),
          });

          setFilter(_value);
        }}
        selectedDropdownValue={filter}
        dropDownValues={[
          {
            name: "Today",
            value: "day",
          },
          {
            name: "This Week",
            value: "week",
          },
          {
            name: "This Month",
            value: "month",
          },
          {
            name: "This Year",
            value: "year",
          },
        ]}
      >
        <Box p={3}>
          {loading || loadingAppointments || loadingOrders || loadingLeads ? (
            <Box pt={10}>
              <Grid container alignItems="center" justify="center">
                <LoadingIndicatorComponent height={200} />
              </Grid>
            </Box>
          ) : (
            <>
              <Box>
                {data && !error && (
                  <Grid container spacing={3}>
                    {data?.getDashboardData?.analytics?.map((item, index) => (
                      <Grid key={index} item xs={6} md={4}>
                        <Card>
                          <CardContent>
                            <Typography
                              color="primary"
                              align="center"
                              variant="h1"
                            >
                              {item?.value}
                            </Typography>
                            <Box>
                              <Typography
                                color="secondary"
                                align="center"
                                variant="h6"
                              >
                                {item?.label}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
              <Box>
                {dataLeads && !errorLeads && (
                  <Box>
                    <Box mt={4} mb={4}>
                      <Typography variant="h6">Leads Analytics</Typography>
                    </Box>
                    <Grid container spacing={3}>
                      {dataLeads?.getLeadsDashboardData?.analytics?.map(
                        (item, index) => (
                          <Grid key={index} item xs={6} md={4}>
                            <Card>
                              <CardContent>
                                <Typography
                                  color="primary"
                                  align="center"
                                  variant="h1"
                                >
                                  {item?.value}
                                </Typography>
                                <Box>
                                  <Typography
                                    color="secondary"
                                    align="center"
                                    variant="h6"
                                  >
                                    {item?.label}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Box>
                )}
              </Box>
              <Box>
                {dataAppointments && !errorAppointments && (
                  <Box>
                    <Box mt={4} mb={4}>
                      <Typography variant="h6">
                        Appointments Analytics
                      </Typography>
                    </Box>
                    <Grid container spacing={3}>
                      {dataAppointments?.getAppointmentDashboardData?.analytics?.map(
                        (item, index) => (
                          <Grid key={index} item xs={6} md={4}>
                            <Card>
                              <CardContent>
                                <Typography
                                  color="primary"
                                  align="center"
                                  variant="h1"
                                >
                                  {item?.value}
                                </Typography>
                                <Box>
                                  <Typography
                                    color="secondary"
                                    align="center"
                                    variant="h6"
                                  >
                                    {item?.label}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Box>
                )}
              </Box>
              <Box>
                {dataOrders && !errorOrders && (
                  <Box>
                    <Box mt={4} mb={4}>
                      <Typography variant="h6">Order Analytics</Typography>
                    </Box>
                    <Grid container spacing={3}>
                      {dataOrders?.getStoreOrderDashboardData?.analytics?.map(
                        (item, index) => (
                          <Grid key={index} item xs={6} md={4}>
                            <Card>
                              <CardContent>
                                <Typography
                                  color="primary"
                                  align="center"
                                  variant="h1"
                                >
                                  {item?.value}
                                </Typography>
                                <Box>
                                  <Typography
                                    color="secondary"
                                    align="center"
                                    variant="h6"
                                  >
                                    {item?.label}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Box>
                )}
              </Box>
            </>
          )}
        </Box>
      </MainLayout>

      <DialogModal
        open={openDialogModal}
        onCloseModel={() => setOpenDialogModal(false)}
      >
        <div style={{ paddingInline: "50px" }}>
          <DateRange
            dateType={"Order"}
            getStartDate={(date) =>
              setDateFilter({ dateA: date, dateB: dateFilter.dateB })
            }
            getEndDate={(date) =>
              setDateFilter({ dateA: dateFilter.dateA, dateB: date })
            }
            startDate={dateFilter.dateA}
            endDate={dateFilter.dateB}
          />

          <Box style={{ display: "flex", flexDirection: "row" }}>
            <Box mr={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onApply()}
              >
                {"Apply"}
              </Button>
            </Box>
            <Box mr={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onClear()}
              >
                {"Clear"}
              </Button>
            </Box>
            <Box mr={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onReset()}
              >
                {"Reset"}
              </Button>
            </Box>
          </Box>
        </div>
      </DialogModal>
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: UserAnalytics,
  baseUrl: "/",
});
