import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import OrderTrackDataGrid from "../../../../src/components/Ui/dataGrid/orderTrackDataGrid";
import { DialogModal } from "../../../../src/components/Ui/dialog/dialogModal";
import MainLayout from "../../../../src/components/layouts/mainLayout";
import Moment from "moment";
import { Box, Button } from "@material-ui/core";
import { DateRange } from "../../../../src/components/Ui/date-range";
import { DateRangeType } from "../../../../src/utils/enumType";
import _ from "lodash";
import {
  GetAllStoreOrders,
  StoreProductOrderFilterInputParams,
  TrackOrderGridData,
} from "../../../../src/utils/interfaces";
import { useLazyGetAllStoreOrders } from ".../../../src/apollo/hooks/useGetAllStoreOrders";
import {
  extractDateFormate,
  startDateFIlter,
  endDateFIlter,
} from "../../../../src/utils/validations";
import LoadingIndicatorComponent from "../../../../src/components/Ui/loading";
import moment from "moment";
import useTrackOrderData from "../../../../src/apollo/hooks/hooks";
import { nonAuthenticated } from "../../../../src/apollo/hoc/withAuthRedirect";
import AdminLayoutComponent from "../../../../src/components/layouts/AdminLayout";
import { useRouter } from "next/router";
import UserLayoutComponent from "../../../../src/components/layouts/UserLayout";

// interface OrderTrackingPageProps {}

interface DateGroup {
  dateA: Moment.MomentInput;
  dateB: Moment.MomentInput;
}

const OrderTrackingPage: NextPage = (props: any) => {
  const router = useRouter();
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const { session, user } = props;
  const { getProcessedTableData, filterDropdownValues } = useTrackOrderData();
  const [eventDate, setEventDate] = useState<DateGroup>({
    dateA: null,
    dateB: null,
  });
  const [orderDate, setOrderDate] = useState<DateGroup>({
    dateA: moment(Date.now()).toISOString(),
    dateB: moment(Date.now()).toISOString(),
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
  const [selectedFilterValue, setSelectedFilterValue] = useState("All");
  const [trackOrderGridRows, setTrackOrderGridRows] = useState<
    TrackOrderGridData[]
  >([]);
  const [originalTrackOrderGridData, setOriginalTrackOrderGridData] = useState<
    TrackOrderGridData[]
  >([]);
  const dateList = [eventDate, orderDate, trialDate, readyDate, deliveryDate];
  const [
    getAllStoreOrders,
    { data: itemData, error: itemError, loading: itemLoading },
  ] = useLazyGetAllStoreOrders({});

  const onApply = () => {
    const params: StoreProductOrderFilterInputParams = {
      userId: "",
      orderStatus: "",
      startDeliveryDate: deliveryDate.dateA
        ? startDateFIlter(deliveryDate.dateA)
        : null,
      endDeliveryDate: deliveryDate.dateB
        ? endDateFIlter(deliveryDate.dateB)
        : null,
      startEventDate: eventDate.dateA ? startDateFIlter(eventDate.dateA) : null,
      endEventDate: eventDate.dateB ? endDateFIlter(eventDate.dateB) : null,
      startOrderDate: orderDate.dateA ? startDateFIlter(orderDate.dateA) : null,
      endOrderDate: orderDate.dateB ? endDateFIlter(orderDate.dateB) : null,
      startReadyDate: readyDate.dateA ? startDateFIlter(readyDate.dateA) : null,
      endReadyDate: readyDate.dateB ? endDateFIlter(readyDate.dateB) : null,
      startTrialDate: trialDate.dateA ? startDateFIlter(trialDate.dateA) : null,
      endTrialDate: trialDate.dateB ? endDateFIlter(trialDate.dateB) : null,
    };

    getAllStoreOrders({
      variables: {
        params: params,
        page: 1,
        limit: 1000,
      },
    });
  };

  const onClear = () => {
    setOrderDate({ dateA: null, dateB: null });
    setEventDate({ dateA: null, dateB: null });
    setDeliveryDate({ dateA: null, dateB: null });
    setReadyDate({ dateA: null, dateB: null });
    setTrialDate({ dateA: null, dateB: null });
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

  const getFilteredData = () => {
    if (selectedFilterValue !== "All") {
      if (!_.isEmpty(trackOrderGridRows)) {
        const filteredGridData = trackOrderGridRows.filter(
          (value) => value.outfitStatus === selectedFilterValue
        );
        setTrackOrderGridRows(filteredGridData);
      }
    } else {
      setTrackOrderGridRows(originalTrackOrderGridData);
    }
  };

  useEffect(() => {
    const processedTableData = getProcessedTableData(itemData);
    if (!_.isEmpty(processedTableData)) {
      setTrackOrderGridRows(processedTableData);
      setOriginalTrackOrderGridData(processedTableData);
    }
  }, [itemData, itemLoading]);

  useEffect(() => {
    getFilteredData();
  }, [selectedFilterValue]);

  useEffect(() => {
    getAllStoreOrders({
      variables: {
        params: {
          userId: router?.query?.uid,
        },
        page: 1,
        limit: 1000,
      },
    });
  }, []);

  const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase();
    const searchOrder = new RegExp(keyword);
    const cusId = new RegExp(keyword);
    return array.filter((value) => {
      return (
        searchOrder.test(value.orderNo.toString()) ||
        value.customerFirstName
          .toLowerCase()
          .match(new RegExp(searchTerm, "g")) ||
        value.itemNumber.toLowerCase().match(new RegExp(searchTerm, "g")) ||
        cusId.test(value.customerId)
      );
    });
  };

  const handleSearchInput = async (e) => {
    let value = e.target.value;
    if (value.length > 2) {
      let search = await arraySearch(trackOrderGridRows, value);
      setTrackOrderGridRows(search);
    } else {
      const processedTableData = getProcessedTableData(itemData);
      setTrackOrderGridRows(processedTableData);
      setOriginalTrackOrderGridData(processedTableData);
    }
  };

  return (
    <UserLayoutComponent session={session} user={user}>
      <MainLayout
        showSearch={false}
        showButton={false}
        showDropdown={false}
        dropDownValues={filterDropdownValues}
        selectedDropdownValue={selectedFilterValue}
        onClickBtn={() => {
          setOpenDialogModal(true);
        }}
        btnTitle="Date Filters"
        pageTitle="Track Orders"
        showDivider={false}
        onChange={handleSearchInput}
        onChangeDropDown={(value: any) => {
          setSelectedFilterValue(value);
        }}
      >
        {itemLoading ? (
          <LoadingIndicatorComponent height={10} />
        ) : (
          <div
            style={{
              height: `calc(100vh - 100px)`,
              overflowY: "scroll",
              width: "100%",
            }}
          >
            <OrderTrackDataGrid rows={trackOrderGridRows} loading={false} />)
          </div>
        )}

        <DialogModal
          open={openDialogModal}
          onCloseModel={() => setOpenDialogModal(false)}
        >
          <div style={{ paddingInline: "50px" }}>
            <DateRange
              dateType={DateRangeType.ORDER}
              getStartDate={(date) =>
                setOrderDate({ dateA: date, dateB: orderDate.dateB })
              }
              getEndDate={(date) =>
                setOrderDate({ dateA: orderDate.dateA, dateB: date })
              }
              startDate={orderDate.dateA}
              endDate={orderDate.dateB}
            />
            <DateRange
              dateType={DateRangeType.TRIAL}
              getStartDate={(date) =>
                setTrialDate({ dateA: date, dateB: trialDate.dateB })
              }
              getEndDate={(date) =>
                setTrialDate({ dateA: trialDate.dateA, dateB: date })
              }
              startDate={trialDate.dateA}
              endDate={trialDate.dateB}
            />
            <DateRange
              dateType={DateRangeType.EVENT}
              getStartDate={(date) =>
                setEventDate({ dateA: date, dateB: eventDate.dateB })
              }
              getEndDate={(date) =>
                setEventDate({ dateA: eventDate.dateA, dateB: date })
              }
              startDate={eventDate.dateA}
              endDate={eventDate.dateB}
            />
            <DateRange
              dateType={DateRangeType.READY}
              getStartDate={(date) =>
                setReadyDate({ dateA: date, dateB: readyDate.dateB })
              }
              getEndDate={(date) =>
                setReadyDate({ dateA: readyDate.dateA, dateB: date })
              }
              startDate={readyDate.dateA}
              endDate={readyDate.dateB}
            />
            <DateRange
              dateType={DateRangeType.DELIVERY}
              getStartDate={(date) =>
                setDeliveryDate({ dateA: date, dateB: deliveryDate.dateB })
              }
              getEndDate={(date) =>
                setDeliveryDate({ dateA: deliveryDate.dateA, dateB: date })
              }
              startDate={deliveryDate.dateA}
              endDate={deliveryDate.dateB}
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
      </MainLayout>
    </UserLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: OrderTrackingPage,
  baseUrl: "/orders",
});
