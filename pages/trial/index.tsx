import React, { useEffect, useState } from "react";
import TrialDataGridComponent from "../../src/components/Ui/dataGrid/trialDataGrid";
import SortDataGridComponent from "../../src/components/Ui/dataGrid/sortTrialGrid";

import MainLayout from "../../src/components/layouts/mainLayout";
import router from "next/router";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Grid, Tabs, Tab, Button, Box } from "@material-ui/core";
import { OrderStatus, RowTypeIndex } from "../../src/utils/enumType";
// import { OrderGridRow } from "../../src/utils/interfaces";
import { TrialGridRow } from "../../src/utils/interfaces";
import _ from "lodash";
import moment from "moment";
import { DialogModal } from "../../src/components/Ui/dialog/dialogModal";
import { DateRange } from "../../src/components/Ui/date-range";
import { startDateFIlter, endDateFIlter } from "../../src/utils/validations";
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import AdminLayoutComponent from "../../src/components/layouts/AdminLayout";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
// Apollo

import { GET_ALL_STORE_ORDERS } from "../../src/apollo/queries/orders";
import { GET_ALL_TRIALS } from "../../src/apollo/queries/trialForm";
import { useLazyQuery } from "@apollo/client";

interface DateGroup {
  dateA: moment.MomentInput;
  dateB: moment.MomentInput;
}

const useStyles = makeStyles((theme) => ({
  tabRoot: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const useDebounce = (time, initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const [values] = useState(() => new Subject());
  useEffect(() => {
    const sub = values.pipe(debounceTime(time)).subscribe(setValue);
    return () => sub.unsubscribe();
  }, [time, values]);
  return [value, (v) => values.next(v)];
};

const Trial: React.FC = (props: any) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  const [value, setValue] = useDebounce(1500, null);
  const { session } = props;
  const [openDialogModal, setOpenDialogModal] = useState(false);

  const [getAllStoreOrders, { data: dataASO, loading: loadinASO }] =
    useLazyQuery(GET_ALL_STORE_ORDERS, {
      onCompleted() {
        setOpenDialogModal(false);
      },
    });

  const [GetOrderTrialByFilter, { data: dataOTF, loading: loadinOTF }] =
    useLazyQuery(GET_ALL_TRIALS);
  const [rowsData, setRowsData] = useState<TrialGridRow[]>([]);
  const [sortDataRow, setSortDataRow] = useState<any>([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>(
    OrderStatus.AllOrders
  );

  const [trialDate, setTrialDate] = useState<DateGroup>({
    dateA: null,
    dateB: null,
  });

  const [deliveryDate, setDeliveryDate] = useState<DateGroup>({
    dateA: null,
    dateB: null,
  });

  const getProdutName = (orderItems) => {
    let data = [];
    orderItems.map((itm) => {
      data.push(itm.itemName);
    });
    return data.join(",");
  };

  const setDataPayload = (filterItems) => {
    let _data = [];
    filterItems.map((item, index) => {
      _data.push({
        serverData: item,
        id: item._id,
        name: item.customerFirstName + " " + item.customerLastName,
        customerPhone: !_.isEmpty(item.customerCountryCode)
          ? `+${item.customerCountryCode} ${item.customerPhone}`
          : item.customerPhone,
        orderTotal: `Rs.${item.afterDeductionsTotal}/-`,
        customerId: item.customerId,
        orderNo: item.orderNo,
        notes: item.orderTrial ? item.orderTrial.note : "",
        orderStatus: item.orderStatus,
        stylist: !_.isEmpty(item.stylist) ? item.stylist[0].name : "-",
        orderItems: !_.isEmpty(item.orderItems)
          ? getProdutName(item.orderItems)
          : "-",
        orderDate: !_.isEmpty(item.orderDate)
          ? moment(item.orderDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        readyDate: !_.isEmpty(item.readyDate)
          ? moment(item.readyDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        trialDate: !_.isEmpty(item.trialDate)
          ? moment(item.trialDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        actualTrialDate: !_.isEmpty(item.orderTrial)
          ? moment(item.orderTrial.trialDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        finalDeliveryDate: !_.isEmpty(item.orderTrial)
          ? moment(item.orderTrial.deliveryDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        deliveryDate: !_.isEmpty(item.deliveryDate)
          ? moment(item.deliveryDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        eventDate: !_.isEmpty(item.eventDate)
          ? moment(item.eventDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        balanceAmount: item.balanceAmount
          ? `Rs.${item.balanceAmount}/-`
          : "Rs.0/-",
        otherCharges: item.otherCharges ? item.otherCharges : 0,
        trialStatus: item.orderTrial?.trialStatus || null,
        trialRating: item.orderTrial?.trialRating || null,
        trialDecision: item.orderTrial?.trialDecision || null,
        measurementStatus: item.orderTrial?.measurementStatus || null,
      });
    });

    return _data;
  };

  const setTrialDataPayload = (filterItems) => {
    let _data = [];
    filterItems.map((item, index) => {
      _data.push({
        serverData: item,
        id: index,
        _id: item._id,
        name:
          item.storeProductOrder.customerFirstName +
          " " +
          item.storeProductOrder.customerLastName,
        customerPhone: !_.isEmpty(item.storeProductOrder.customerCountryCode)
          ? `+${item.storeProductOrder.customerCountryCode} ${item.storeProductOrder.customerPhone}`
          : item.storeProductOrder.customerPhone,
        customerId: item.storeProductOrder.customerId,
        orderNo: item.storeProductOrder.orderNo,
        notes: item.note ? item.note : "",
        orderStatus: item.storeProductOrder.orderStatus,
        stylist: !_.isEmpty(item.stylist)
          ? item.stylist.name
          : "-",
        trialDate: !_.isEmpty(item.trialDate)
          ? moment(item.trialDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        actualTrialDate: !_.isEmpty(item.trialDate)
          ? moment(item.trialDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        finalDeliveryDate: !_.isEmpty(item.deliveryDate)
          ? moment(item.deliveryDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        trialStatus: item?.trialStatus || null,
        trialRating: item?.trialRating || null,
        trialDecision: item?.trialDecision || null,
        measurementStatus: item?.measurementStatus || null,
        products:item.products
      });
    });
    return _data;
  };

  useEffect(() => {
    if (router?.query?.tabIndex === "1") {
      getAllSortTrailsData();
    } else {
      getOrderData();
    }
    setTabIndex(router?.query.tabIndex ? Number(router?.query.tabIndex) : 0);
  }, [session]);

  const getOrderData = () => {
    getAllStoreOrders({
      variables: {
        params: {
          roleFilter: session.user.teams,
          startDeliveryDate: router.query?.startDeliveryDate
            ? startDateFIlter(router.query?.startDeliveryDate)
            : null,
          endDeliveryDate: router.query?.endDeliveryDate
            ? endDateFIlter(router.query?.endDeliveryDate)
            : null,

          startTrialDate: router.query?.startTrialDate
            ? startDateFIlter(router.query?.startTrialDate)
            : null,
          endTrialDate: router.query?.endTrialDate
            ? endDateFIlter(router.query?.endTrialDate)
            : null,
          searchTerm: router.query?.searchTerm || "",
        },
        page: router.query?.p ? Number(router.query?.p) : 1,
        limit: 100,
      },
    });
  };

  const getAllSortTrailsData = () => {
    GetOrderTrialByFilter({
      variables: {
        page: router.query?.p ? Number(router.query?.p) : 1,
        limit: 100,
      },
    });
  };

  useEffect(() => {
    if (!_.isEmpty(dataASO)) {
      const { getAllStoreOrders } = dataASO;
      setRowsData(setDataPayload(getAllStoreOrders));
    }
  }, [dataASO]);

  useEffect(() => {
    if (!_.isEmpty(dataOTF)) {
      console.log(dataOTF);
    }
  }, [dataOTF]);

  const handleSearchInput = async (e) => {
    if (tabIndex === 0) {
      setValue(e.target.value);
    }
  };

  const onClear = () => {
    setDeliveryDate({ dateA: null, dateB: null });
    setTrialDate({ dateA: null, dateB: null });
  };

  const onReset = () => {
    setDeliveryDate({ dateA: null, dateB: null });
    setTrialDate({ dateA: null, dateB: null });
    router.push(
      {
        pathname: "/trial",
        query: {
          p: 1,
          tabIndex: router.query?.tabIndex || 0,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const onApply = () => {
    router.push(
      {
        pathname: "/trial",
        query: {
          p: 1,
          startDeliveryDate: deliveryDate.dateA
            ? moment(deliveryDate.dateA).format()
            : router.query?.startDeliveryDate || null,
          endDeliveryDate: deliveryDate.dateB
            ? moment(deliveryDate.dateB).format()
            : router.query?.endDeliveryDate || null,
          startTrialDate: trialDate.dateA
            ? moment(trialDate.dateA).format()
            : router.query?.startTrialDate || null,
          endTrialDate: trialDate.dateB
            ? moment(trialDate.dateB).format()
            : router.query?.endTrialDate || null,
          searchTerm: router.query?.searchTerm || "",
          tabIndex: tabIndex,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (value !== null) {
      router.push(
        {
          pathname: "/trial",
          query: {
            ...router.query,
            p: 1,
            searchTerm: value,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [value]);

  useEffect(() => {
    if (dataOTF?.getOrderTrialByFilter) {
      const { getOrderTrialByFilter } = dataOTF;
      setSortDataRow(setTrialDataPayload(getOrderTrialByFilter));
    }
  }, [dataOTF]); 

  return (
    <AdminLayoutComponent session={session}>
      <MainLayout
        showSearch={true}
        showDropdown={false}
        showbtn2={true}
        btnTitle2="Date Filter"
        defaultValue={router.query?.searchTerm as string}
        onClickBt2={() => {
          if (tabIndex === 1) {
            alert("Filters not enabled for this data grid");
          } else {
            setOpenDialogModal(true);
          }
        }}
        selectedDropdownValue={selectedDropdownValue}
        onChange={handleSearchInput}
        pageTitle="Trials"
        onClickBtn={() => {
          //router.push("/orders/new-orders-form");
        }}
        showDivider={false}
      >
        <div
          style={{
            height: `calc(100vh - 170px)`,
            overflowY: "scroll",
            width: "100%",
          }}
        >
          <Tabs
            classes={{ root: classes.tabRoot }}
            indicatorColor="primary"
            value={tabIndex}
            onChange={(e, index) => {
              router.push(
                {
                  pathname: "/trial",
                  query: {
                    ...router.query,
                    tabIndex: index,
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
          >
            <Tab label="All Store Orders" />
            <Tab label="All Trials" />
          </Tabs>

          {tabIndex === 0 && (
            <TrialDataGridComponent
              rows={rowsData}
              paginationMode="server"
              loading={loadinASO}
              page={router.query?.p ? Number(router.query?.p) : 1}
              onPageChange={(nextPage) => {
                router.push(
                  {
                    pathname: "/trial",
                    query: {
                      ...router.query,
                      tabIndex: router?.query.tabIndex || 0,
                      p: nextPage.page == 0 ? 1 : nextPage.page,
                    },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
            />
          )}
          {tabIndex === 1 && (
            <SortDataGridComponent
              rows={sortDataRow}
              paginationMode="server"
              loading={loadinOTF}
              page={router.query?.p ? Number(router.query?.p) : 1}
              onPageChange={(nextPage) => {
                router.push(
                  {
                    pathname: "/trial",
                    query: {
                      ...router.query,
                      tabIndex: router?.query.tabIndex || 0,
                      p: nextPage.page == 0 ? 1 : nextPage.page,
                    },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
            />
          )}
        </div>
      </MainLayout>

      <DialogModal
        open={openDialogModal}
        onCloseModel={() => setOpenDialogModal(false)}
      >
        <div style={{ paddingInline: "50px" }}>
          <DateRange
            dateType={"Trial"}
            getStartDate={(date) =>
              setTrialDate({ dateA: date, dateB: trialDate.dateB })
            }
            getEndDate={(date) =>
              setTrialDate({ dateA: trialDate.dateA, dateB: date })
            }
            startDate={
              trialDate.dateA
                ? trialDate.dateA
                : router.query?.startTrialDate
                ? router.query?.startTrialDate
                : null
            }
            endDate={
              trialDate.dateB
                ? trialDate.dateB
                : router.query?.endTrialDate
                ? router.query?.endTrialDate
                : null
            }
          />

          <DateRange
            dateType={"Delivery"}
            getStartDate={(date) =>
              setDeliveryDate({ dateA: date, dateB: deliveryDate.dateB })
            }
            getEndDate={(date) =>
              setDeliveryDate({ dateA: deliveryDate.dateA, dateB: date })
            }
            startDate={
              deliveryDate.dateA
                ? deliveryDate.dateA
                : router.query?.startDeliveryDate
                ? router.query?.startDeliveryDate
                : null
            }
            endDate={
              deliveryDate.dateB
                ? deliveryDate.dateB
                : router.query?.endDeliveryDate
                ? router.query?.endDeliveryDate
                : null
            }
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

export default nonAuthenticated({ Component: Trial, baseUrl: "/trial" });
