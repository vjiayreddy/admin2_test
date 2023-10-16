import React, { useEffect, useState } from "react";
import MainLayout from "../../src/components/layouts/mainLayout";
import { Button, Box } from "@material-ui/core";
import LeadsDataGridComponent from "../../src/components/Ui/dataGrid/appointmenDataGrid";
import { useRouter } from "next/router";
import { GET_ALL_APPOINTMENTS } from "../../src/apollo/queries/appointment";
import { useLazyQuery } from "@apollo/client";
import { DateRange } from "../../src/components/Ui/date-range";
import { DateRangeType } from "../../src/utils/enumType";
import { DialogModal } from "../../src/components/Ui/dialog/dialogModal";
import Moment from "moment";

import _ from "lodash";
import moment from "moment";
import { endDateFIlter, startDateFIlter } from "../../src/utils/validations";
import AdminLayoutComponent from "../../src/components/layouts/AdminLayout";
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

const appointmentStatus = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Created",
    value: "created",
  },
  {
    name: "Unconfirmed",
    value: "unconfirmed",
  },
  {
    name: "Not Interested",
    value: "not_interested",
  },

  {
    name: "Follow Up ",
    value: "follow_up",
  },
  {
    name: "Ordered",
    value: "ordered",
  },

  {
    name: " Unsuccessful",
    value: "unsuccessful",
  },
];

interface DateGroup {
  dateA: Moment.MomentInput;
  dateB: Moment.MomentInput;
}

const useDebounce = (time, initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const [values] = useState(() => new Subject());
  useEffect(() => {
    const sub = values.pipe(debounceTime(time)).subscribe(setValue);
    return () => sub.unsubscribe();
  }, [time, values]);
  return [value, (v) => values.next(v)];
};

const AppointmentPage = (props: any) => {
  const [dataRow, setDataRow] = useState([]);
  const router = useRouter();
  const [value, setValue] = useDebounce(1500, null);
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const { session } = props;
  const [appointmentDate, setAppointmentDate] = useState<DateGroup>({
    dateA: null,
    dateB: null,
  });

  const getLastArray = (arr, isItem) => {
    if (!_.isEmpty(arr)) {
      if (arr.length <= 1) {
        if (isItem) {
          return arr[0];
        } else {
          return arr[0].name;
        }
      } else {
        return isItem ? arr.slice(-1)[0] : arr.slice(-1)[0].name;
      }
    }
  };

  const getReason = (item) => {
    if (!_.isEmpty(item)) {
      return item.note;
    }
  };

  const [getAllAppointments, { data: dataGAP, loading: loadingLeads }] =
    useLazyQuery(GET_ALL_APPOINTMENTS, {
      onCompleted({}) {
        setOpenDialogModal(false);
      },
    });

  const dataLeadPayload = (lead) => {
    if (lead) {
      // console.log(lead.countryCode);  // To check country code
      return {
        id: lead._id,
        userId: lead.userId,
        leadDate: !_.isEmpty(lead.leadDate)
          ? moment(lead.leadDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        leadId: lead.leadId,
        creditTo: !_.isEmpty(lead.creditedSalesTeam)
          ? lead.creditedSalesTeam[0].name
          : "-",
        generatedBy: !_.isEmpty(lead.generatedSalesTeam)
          ? lead.generatedSalesTeam[0].name
          : "-",
        studioId: !_.isEmpty(lead.studio) ? lead.studio[0].name : "-",
        name: lead.firstName + " " + lead.lastName,
         phone: `+ ${lead.countryCode}${lead.phone}`,
        source: !_.isEmpty(lead.source) ? lead.source[0].name : "",
        persona: !_.isEmpty(lead.persona) ? lead.persona[0].name : "",
        estimatedValue: lead.estimatedValue,
        cityName: lead.cityName,
        status: !_.isEmpty(lead.status)
          ? getLastArray(lead.status, false)
          : "-",
        followUpDate: !_.isEmpty(lead.followUpDate)
          ? moment(lead.followUpDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        expClosureDate: !_.isEmpty(lead.expClosureDate)
          ? moment(lead.expClosureDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        eventDate: !_.isEmpty(lead.eventDate)
          ? moment(lead.eventDate.timestamp).format("DD-MMM-YYYY")
          : "-",
        remarks: lead.remarks,
        rating: lead.rating,
        _status: getLastArray(lead.status, true),
        _followUpDate: !_.isEmpty(lead.followUpDate)
          ? lead.followUpDate.timestamp
          : "-",
      };
    }
    return null;
  };

  const dataGridPayload = (data) => {
    let rowData = [];
    if (!_.isEmpty(data)) {
      data.map((item) => {
        rowData.push({
          lead: !_.isEmpty(item.lead) ? dataLeadPayload(item.lead[0]) : null,
          id: item._id,
          userId: item.userId,
          appointmentId: item.appointmentId,
          appointmentTime: !_.isEmpty(item.appointmentSelectedTimestamp)
            ? moment(item.appointmentSelectedTimestamp).format("hh:mm A")
            : moment(item.appointmentDate.timestamp).format("hh:mm A"),

          appointmentDate: !_.isEmpty(item.appointmentDate)
            ? moment(item.appointmentDate.timestamp).format("DD-MMM-YYYY")
            : null,
          _appointmentDate: !_.isEmpty(item.appointmentDate)
            ? item.appointmentDate.timestamp
            : null,
          _appointmentTime: item.appointmentSelectedTimestamp,
          _stylistIds: !_.isEmpty(item.stylist) ? item.stylist[0]._id : null,
          appointmentType: item.appointmentType,
          dateRecorded: !_.isEmpty(item.dateRecorded)
            ? moment(item.dateRecorded.timestamp).format("DD-MMM-YYYY")
            : null,
          name: item.firstName + " " + item.lastName,
          _leadId: item.leadId,
          creditTo: !_.isEmpty(item.lead)
            ? !_.isEmpty(item.lead[0].creditedSalesTeam)
              ? item.lead[0].creditedSalesTeam.name
              : null
            : null,
          source: !_.isEmpty(item.source) ? item.source[0].name : null,
          persona: !_.isEmpty(item.persona) ? item.persona[0].name : null,
          // phone: `${item.phone}`,
          phone: item.countryCode ? `${item.countryCode} ${item.phone}` : item.phone, // Modified line
          stylist: !_.isEmpty(item.stylist) ? item.stylist[0].name : null,
          status: !_.isEmpty(item.status)
            ? getLastArray(item.status, false)
            : null,

          followUpDate: !_.isEmpty(item.followUpDate)
            ? moment(item.followUpDate.timestamp).format("DD-MMM-YYYY")
            : null,
          expClosureDate: !_.isEmpty(item.lead)
            ? !_.isEmpty(item.lead[0].expClosureDate)
              ? moment(item.lead[0].expClosureDate.timestamp).format(
                  "DD-MMM-YYYY"
                )
              : null
            : null,
          eventDate: !_.isEmpty(item.lead)
            ? !_.isEmpty(item.lead[0].eventDate)
              ? moment(item.lead[0].eventDate.timestamp).format("DD-MMM-YYYY")
              : null
            : null,
          remarks: !_.isEmpty(item.lead) ? item.lead[0].remarks : null,
          reason: getReason(getLastArray(item.status, true)),
          _status: getLastArray(item.status, true),
          _followUpDate: !_.isEmpty(item.followUpDate)
            ? moment(item.followUpDate.timestamp).format("DD-MMM-YYYY")
            : null,
          _orderValue: item.orderValue,
        });
      });
    }
    setDataRow(rowData);
  };

  useEffect(() => {
    if (!_.isEmpty(dataGAP)) {
      dataGridPayload(dataGAP.getAllAppointments.appointments);
    }
  }, [dataGAP]);

  useEffect(() => {
    getAllAppointments({
      variables: {
        params: {
          searchTerm: router.query?.searchTerm || "",
          status: router.query?.status == "all" ? "" : router.query?.status,
          startDate: router.query?.startDate
            ? startDateFIlter(router.query?.startDate)
            : null,
          endDate: router.query?.endDate
            ? endDateFIlter(router.query?.endDate)
            : null,
          startAppointmentDate: router.query?.startAppointmentDate
            ? startDateFIlter(router.query?.startAppointmentDate)
            : null,
          endAppointmentDate: router.query?.endAppointmentDate
            ? endDateFIlter(router.query?.endAppointmentDate)
            : null,
        },
        page: router.query?.p ? Number(router.query?.p) : 1,
        limit: 50,
      },
    });
  }, [session, router]);

  const onApply = async () => {
    router.push(
      {
        pathname: "/appointment",
        query: {
          p: 1,
          searchTerm: router.query?.searchTerm || "",
          status: router.query?.status || "",
          startAppointmentDate: appointmentDate.dateA
            ? moment(appointmentDate.dateA).format()
            : router.query?.startAppointmentDate || null,
          endAppointmentDate: appointmentDate.dateB
            ? moment(appointmentDate.dateB).format()
            : router.query?.endAppointmentDate || null,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const onClear = () => {
    setAppointmentDate({ dateA: null, dateB: null });
  };

  const onReset = () => {
    setAppointmentDate({
      dateA: moment(Date.now()).toISOString(),
      dateB: moment(Date.now()).toISOString(),
    });
  };

  const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase();
    const apId = new RegExp(keyword);
    const searchPhone = new RegExp(keyword);
    return array.filter((value) => {
      return (
        value.name.toLowerCase().match(new RegExp(searchTerm, "g")) ||
        apId.test(value.appointmentId) ||
        searchPhone.test(value.phone)
      );
    });
  };

  const handleSearchInput = async (e) => {
    setValue(e.target.value);
    // let value = e.target.value;
    // if (value.length > 2) {
    //   let search = await arraySearch(dataRow, value);
    //   setDataRow(search);
    // } else {
    //   const { appointments } = dataGAP.getAllAppointments;
    //   dataGridPayload(appointments);
    // }
  };

  useEffect(() => {
    if (value !== null) {
      router.push(
        {
          pathname: "/appointment",
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
      <MainLayout
        showSearch={true}
        showButton={false}
        showDropdown={true}
        showbtn2={true}
        btnTitle2="Date Filter"
        defaultValue={router.query?.searchTerm as string}
        onChange={handleSearchInput}
        onClickBt2={() => {
          setOpenDialogModal(true);
        }}
        dropDownValues={appointmentStatus}
        selectedDropdownValue={(router.query?.searchTerm as string) || "all"}
        onClickBtn={() => {}}
        onChangeDropDown={(value: any) => {
          router.push(
            {
              pathname: "/appointment",
              query: {
                ...router.query,
                p: 1,
                status: value,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
        btnTitle=""
        pageTitle="Appointments"
        showDivider={false}
      >
        <div
          style={{
            height: `calc(100vh - 170px)`,
            overflowY: "scroll",
            width: "100%",
          }}
        >
          <LeadsDataGridComponent
            loading={loadingLeads}
            dataRow={dataRow}
            page={router.query?.p ? Number(router.query?.p) : 1}
            paginationMode="server"
            onPageChange={(nextPage) => {
              router.push(
                {
                  pathname: "/appointment",
                  query: {
                    ...router.query,
                    p: nextPage.page == 0 ? 1 : nextPage.page,
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
            onLoadAppointsData={async () => {
              router.push(
                {
                  pathname: "/appointment",
                  query: {
                    ...router.query,
                    p: 1,
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
          />
        </div>
        <DialogModal
          open={openDialogModal}
          onCloseModel={() => setOpenDialogModal(false)}
        >
          <div style={{ paddingInline: "50px" }}>
            <DateRange
              dateType={"Appointment"}
              getStartDate={(date) =>
                setAppointmentDate({
                  dateA: date,
                  dateB: appointmentDate.dateB,
                })
              }
              getEndDate={(date) =>
                setAppointmentDate({
                  dateA: appointmentDate.dateA,
                  dateB: date,
                })
              }
              startDate={appointmentDate.dateA}
              endDate={appointmentDate.dateB}
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
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: AppointmentPage,
  baseUrl: "/appointment",
});
