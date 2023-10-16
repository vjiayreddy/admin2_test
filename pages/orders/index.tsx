import React, { useEffect, useState } from "react";
import OrderataGridComponent from "../../src/components/Ui/dataGrid/orderDataGrid";
import MainLayout from "../../src/components/layouts/mainLayout";
import { useRouter } from "next/router";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Grid, Tabs, Tab, Button, Box } from "@material-ui/core";
import { OrderStatus, RowTypeIndex } from "../../src/utils/enumType";
import { OrderGridRow } from "../../src/utils/interfaces";
import _ from "lodash";
import moment from "moment";
import { DialogModal } from "../../src/components/Ui/dialog/dialogModal";
import { DateRange } from "../../src/components/Ui/date-range";
import { startDateFIlter, endDateFIlter } from "../../src/utils/validations";
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import AdminLayoutComponent from "../../src/components/layouts/AdminLayout";

// Apollo

import { GET_ALL_STORE_ORDERS } from "../../src/apollo/queries/orders";
import { useLazyQuery } from "@apollo/client";

import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { getStudioName } from "../../src/utils/utils";

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

const Orders: React.FC = (props: any) => {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = useDebounce(1500, null);
  const { session } = props;
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabName, setTabName] = useState("all");
  const [getAllStoreOrders, { data: dataASO, loading: loadinASO }] =
    useLazyQuery(GET_ALL_STORE_ORDERS, {
      onCompleted() {
        setOpenDialogModal(false);
      },
    });
  const [rowsData, setRowsData] = useState<OrderGridRow[]>([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>(
    OrderStatus.AllOrders
  );

  const [eventDate, setEventDate] = useState<DateGroup>({
    dateA: null,
    dateB: null,
  });
  const [orderDate, setOrderDate] = useState<DateGroup>({
    dateA: null,
    dateB: null,
  });
  const [trialDate, setTrialDate] = useState<DateGroup>({
    dateA: null,
    dateB: null,
  });
  const [readyDate, setReadyDate] = useState<DateGroup>({
    dateA: null,
    dateB: null,
  });
  const [deliveryDate, setDeliveryDate] = useState<DateGroup>({
    dateA: null,
    dateB: null,
  });

  const getHeaderText = (tabIndex: number) => {
    switch (tabIndex) {
      case RowTypeIndex.AllOrders:
        return "All Orders";
      case RowTypeIndex.DraftOrders:
        return "Draft Orders";
      case RowTypeIndex.RunningOrders:
        return "Running Orders";
      case RowTypeIndex.UnconfirmedOrders:
        return "Unconfirmed Orders";
      case RowTypeIndex.HoldOrders:
        return "Hold Orders";
      case RowTypeIndex.DeliveredOrders:
        return "Delivered Orders";
      case RowTypeIndex.AlterationsOrders:
        return "Alteration Orders";
      case RowTypeIndex.ClosedOrders:
        return "Closed Orders";
      default:
        return "";
    }
  };

  const filterOrders = [
    "ALL",
    "DRAFT",
    "RUNNING",
    "UNCONFIRMED",
    "HOLD",
    "ALTERATIONS",
    "DELIVERED",
    "CLOSED",
  ];

  const findTabIndex = () => {
    const tabIndex = filterOrders.findIndex(
      (item) => item === router.query?.orderStatus
    );
    return tabIndex;
  };

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
        id: index,
        name: item.customerFirstName + " " + item.customerLastName,
        customerPhone: !_.isEmpty(item.customerCountryCode)
          ? `+${item.customerCountryCode} ${item.customerPhone}`
          : item.customerPhone,
        orderTotal: `Rs.${item.afterDeductionsTotal}/-`,
        customerId: item.customerId,
        orderNo: item.orderNo,
        orderStatus: item.orderStatus,
        studioId:getStudioName(item.studioId),
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
      });
    });
    return _data;
  };

  useEffect(() => {
    getOrderData();
  }, [session, router]);

  const onChangeTabs = async (tabName) => {
    router.push({
      pathname: "/orders",
      query: {
        ...router.query,
        p: 1,
        orderStatus: tabName,
      },
    });
  };

  const getOrderData = () => {
    getAllStoreOrders({
      variables: {
        params: {
          roleFilter: session.user.teams,
          orderStatus:
            router.query?.orderStatus == "ALL" ? "" : router.query?.orderStatus,
          startDeliveryDate: router.query?.startDeliveryDate
            ? startDateFIlter(router.query?.startDeliveryDate)
            : null,
          endDeliveryDate: router.query?.endDeliveryDate
            ? endDateFIlter(router.query?.endDeliveryDate)
            : null,
          startEventDate: router.query?.startEventDate
            ? startDateFIlter(router.query?.startEventDate)
            : null,
          endEventDate: router.query?.endEventDate
            ? endDateFIlter(router.query?.endEventDate)
            : null,
          startOrderDate: router.query?.startOrderDate
            ? startDateFIlter(router.query?.startOrderDate)
            : null,
          endOrderDate: router.query?.endOrderDate
            ? endDateFIlter(router.query?.endOrderDate)
            : null,
          startReadyDate: router.query?.startReadyDate
            ? startDateFIlter(router.query?.startReadyDate)
            : null,
          endReadyDate: router.query?.endReadyDate
            ? endDateFIlter(router.query?.endReadyDate)
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

  useEffect(() => {
    if (!_.isEmpty(dataASO)) {
      const { getAllStoreOrders } = dataASO;
      setRowsData(setDataPayload(getAllStoreOrders));
    }
  }, [dataASO]);

  const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase();
    const searchOrder = new RegExp(keyword);
    const searchPhone = new RegExp(keyword);
    const cusId = new RegExp(keyword);
    return array.filter((value) => {
      return (
        searchOrder.test(value.orderNo.toString()) ||
        value.name.toLowerCase().match(new RegExp(searchTerm, "g")) ||
        searchPhone.test(value.customerPhone) ||
        cusId.test(value.customerId)
      );
    });
  };

  const handleSearchInput = async (e) => {
    setValue(e.target.value);
    // let value = e.target.value;
    // if (value.length > 2) {
    //   let search = await arraySearch(rowsData, value);
    //   setRowsData(search);
    // } else {
    //   const { getAllStoreOrders } = dataASO;
    //   setRowsData(setDataPayload(getAllStoreOrders));
    // }
  };

  const onClear = () => {
    setOrderDate({ dateA: null, dateB: null });
    setEventDate({ dateA: null, dateB: null });
    setDeliveryDate({ dateA: null, dateB: null });
    setReadyDate({ dateA: null, dateB: null });
    setTrialDate({ dateA: null, dateB: null });
    router.push(
      {
        pathname: "/orders",
        query: {
          p: 1,
          orderStatus: router.query?.orderStatus || "",
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const onReset = () => {
    setOrderDate({
      dateA: moment(Date.now()).toISOString(),
      dateB: moment(Date.now()).toISOString(),
    });
    setEventDate({ dateA: null, dateB: null });
    setDeliveryDate({ dateA: null, dateB: null });
    setReadyDate({ dateA: null, dateB: null });
    setTrialDate({ dateA: null, dateB: null });
  };

  const onApply = () => {
    router.push(
      {
        pathname: "/orders",
        query: {
          p: 1,
          orderStatus: router.query?.orderStatus || "",
          startDeliveryDate: deliveryDate.dateA
            ? moment(deliveryDate.dateA).format()
            : router.query?.startDeliveryDate || null,
          endDeliveryDate: deliveryDate.dateB
            ? moment(deliveryDate.dateB).format()
            : router.query?.endDeliveryDate || null,
          startEventDate: eventDate.dateA
            ? moment(eventDate.dateA).format()
            : router.query?.startEventDate || null,
          endEventDate: eventDate.dateB
            ? moment(eventDate.dateB).format()
            : router.query?.endEventDate || null,
          startOrderDate: orderDate.dateA
            ? moment(orderDate.dateA).format()
            : router.query?.startOrderDate || null,
          endOrderDate: orderDate.dateB
            ? moment(orderDate.dateB).format()
            : router.query?.endOrderDate || null,
          startReadyDate: readyDate.dateA
            ? moment(readyDate.dateA).format()
            : router.query?.startReadyDate || null,
          endReadyDate: readyDate.dateB
            ? moment(readyDate.dateB).format()
            : router.query?.endReadyDate || null,
          startTrialDate: trialDate.dateA
            ? moment(trialDate.dateA).format()
            : router.query?.startTrialDate || null,
          endTrialDate: trialDate.dateB
            ? moment(trialDate.dateB).format()
            : router.query?.endTrialDate || null,
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
          pathname: "/orders",
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

  return (
    <AdminLayoutComponent session={session}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Tabs
            classes={{ root: classes.tabRoot }}
            indicatorColor="primary"
            value={findTabIndex()}
            onChange={(e, index) => {
              onChangeTabs(filterOrders[index]);
            }}
          >
            {filterOrders.map((item, index) => (
              <Tab key={index} label={item + " " + "Orders"} />
            ))}
          </Tabs>
        </Grid>
      </Grid>

      <MainLayout
        showSearch={true}
        showButton={true}
        showDropdown={false}
        showbtn2={true}
        defaultValue={router.query?.searchTerm as string}
        btnTitle2="Date Filter"
        onClickBt2={() => {
          setOpenDialogModal(true);
        }}
        selectedDropdownValue={selectedDropdownValue}
        onChange={handleSearchInput}
        onClickBtn={() => {
          router.push("/orders/new-orders-form");
        }}
        btnTitle="+ Add Order"
        pageTitle={getHeaderText(tabIndex)}
        showDivider={false}
      >
        <div
          style={{
            height: `calc(100vh - 170px)`,
            overflowY: "scroll",
            width: "100%",
          }}
        >
          <OrderataGridComponent
            rows={rowsData}
            loading={loadinASO}
            tabName={tabName}
            paginationMode="server"
            page={router.query?.p ? Number(router.query?.p) : 1}
            onPageChange={(nextPage) => {
              router.push(
                {
                  pathname: "/orders",
                  query: {
                    ...router.query,
                    p: nextPage.page == 0 ? 1 : nextPage.page,
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
          />
        </div>
      </MainLayout>

      <DialogModal
        open={openDialogModal}
        onCloseModel={() => setOpenDialogModal(false)}
      >
        <div style={{ paddingInline: "50px" }}>
          <DateRange
            dateType={"Order"}
            getStartDate={(date) =>
              setOrderDate({ dateA: date, dateB: orderDate.dateB })
            }
            getEndDate={(date) =>
              setOrderDate({ dateA: orderDate.dateA, dateB: date })
            }
            startDate={
              orderDate.dateA
                ? orderDate.dateA
                : router.query?.startOrderDate
                ? router.query?.startOrderDate
                : null
            }
            endDate={
              orderDate.dateB
                ? orderDate.dateB
                : router.query?.endOrderDate
                ? router.query?.endOrderDate
                : null
            }
          />
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
            dateType={"Event"}
            getStartDate={(date) =>
              setEventDate({ dateA: date, dateB: eventDate.dateB })
            }
            getEndDate={(date) =>
              setEventDate({ dateA: eventDate.dateA, dateB: date })
            }
            startDate={
              eventDate.dateA
                ? eventDate.dateA
                : router.query?.startEventDate
                ? router.query?.startEventDate
                : null
            }
            endDate={
              eventDate.dateB
                ? eventDate.dateB
                : router.query?.endEventDate
                ? router.query?.endEventDate
                : null
            }
          />
          <DateRange
            dateType={"Ready"}
            getStartDate={(date) =>
              setReadyDate({ dateA: date, dateB: readyDate.dateB })
            }
            getEndDate={(date) =>
              setReadyDate({ dateA: readyDate.dateA, dateB: date })
            }
            startDate={
              readyDate.dateA
                ? readyDate.dateA
                : router.query?.startReadyDate
                ? router.query?.startReadyDate
                : null
            }
            endDate={
              readyDate.dateB
                ? readyDate.dateB
                : router.query?.endReadyDate
                ? router.query?.endReadyDate
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

export default nonAuthenticated({ Component: Orders, baseUrl: "/orders" });
