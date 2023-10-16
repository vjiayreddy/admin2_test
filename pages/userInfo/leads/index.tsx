import React, { useEffect, useState } from "react";
import MainLayout from "../../../src/components/layouts/mainLayout";
import { Button, Box } from "@material-ui/core";
import LeadsDataGridComponent from "../../../src/components/Ui/dataGrid/leadDataGrid";
import { useRouter } from "next/router";
import { GET_ALL_LEADS } from "../../../src/apollo/queries/leads";
import { useLazyQuery } from "@apollo/client";
import { DateRange } from "../../../src/components/Ui/date-range";
import { DialogModal } from "../../../src/components/Ui/dialog/dialogModal";
import Moment from "moment";
import AdminLayoutComponent from "../../../src/components/layouts/AdminLayout";
import { nonAuthenticated } from "../../../src/apollo/hoc/withAuthRedirect";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import _ from "lodash";
import moment from "moment";
import { startDateFIlter, endDateFIlter } from "../../../src/utils/validations";
import UserLayoutComponent from "../../../src/components/layouts/UserLayout";

const leadStatus = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Created",
    value: "created",
  },
  {
    name: "Follow Up",
    value: "follow_up",
  },

  {
    name: "Appointment",
    value: "appointment",
  },
  {
    name: "Order Closed",
    value: "order_closed",
  },

  {
    name: " Unsuccessful",
    value: "unsuccessful",
  },
];

const source = [
  { name: "All", value: "all" },
  {
    name: "Goodwill",
    value: "61c551e8429a4414e8755e6a",
  },
  {
    name: "Google",
    value: "61c55232429a4414e8755e6b",
  },
  {
    name: "Website",
    value: "61c55265429a4414e8755e6c",
  },
  {
    name: "Instagram",
    value: "61c5565e429a4414e8755e6d",
  },
  {
    name: "Facebook",
    value: "61c55c7df8bb211910d8813d",
  },
  {
    name: "BNI & BO",
    value: "61c55c9af8bb211910d8813e",
  },
  {
    name: "CEO Database",
    value: "61c55d03f8bb211910d8813f",
  },
  {
    name: "Wedding PF",
    value: "61c55d2af8bb211910d88140",
  },
  {
    name: "Friends & Family",
    value: "61c55d49f8bb211910d88141",
  },
  {
    name: "RAs",
    value: "61c55d60f8bb211910d88142",
  },
  {
    name: "Style Club",
    value: "61c55d6ef8bb211910d88143",
  },
  {
    name: "Walkin",
    value: "61c55d8ff8bb211910d88144",
  },
  {
    name: "Others",
    value: "61c55d9bf8bb211910d88145",
  },

  {
    name: "CEP",
    value: "630cbe84fe714c1b44fd777f",
  },
  {
    name: "Grooms Week",
    value: "630cbe84fe714c1b44fd7780",
  },
  {
    name: "Event",
    value: "630cbe84fe714c1b44fd7781",
  },
  {
    name: "Collaborations",
    value: "630cbe84fe714c1b44fd7782",
  },
];

const useDebounce = (time, initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const [values] = useState(() => new Subject());
  useEffect(() => {
    const sub = values.pipe(debounceTime(time)).subscribe(setValue);
    return () => sub.unsubscribe();
  }, [time, values]);
  return [value, (v) => values.next(v)];
};

interface DateGroup {
  dateA: Moment.MomentInput;
  dateB: Moment.MomentInput;
}

const LeadsPage = (props: any) => {
  const [value, setValue] = useDebounce(1500, null);

  const router = useRouter();
  const { session,user } = props;
  const [dataRow, setDataRow] = useState<any>([]);
  const [openDialogModal, setOpenDialogModal] = useState(false);

  const [leadDate, setLeadDate] = useState<DateGroup>({
    dateA: null,
    dateB: null,
  });
  const [followUp, setFollowUp] = useState<DateGroup>({
    dateA: null,
    dateB: null,
  });

  const [getAllLeads, { data: dataLeads, loading: loadingLeads }] =
    useLazyQuery(GET_ALL_LEADS, {
      onCompleted({}) {
        setOpenDialogModal(false);
      },
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

  const dataGridPayload = (leads) => {
    let rowData: any[] = [];
    if (!_.isEmpty(leads)) {
      leads.map((lead, index) => {
        const payload = {
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
          phone: `+${lead.countryCode} ${lead.phone}`,
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
        rowData.push(payload);
      });
    }

    setDataRow(rowData);
  };

  useEffect(() => {
    if (!_.isEmpty(dataLeads)) {
      const { getAllLeads } = dataLeads;
      if (getAllLeads) {
        const { leads } = getAllLeads;
        dataGridPayload(leads);
      }
    }
  }, [dataLeads]);

  useEffect(() => {
    getAllLeads({
      variables: {
        params: {
          userId: router?.query?.uid,
          searchTerm: router.query?.searchTerm || null,
          startLeadDate: router.query?.startLeadDate
            ? startDateFIlter(router.query?.startLeadDate)
            : null,
          endLeadDate: router.query?.endLeadDate
            ? endDateFIlter(router.query?.endLeadDate)
            : null,
          startFollowUpDate: router.query?.startFollowUpDate
            ? startDateFIlter(router.query?.startFollowUpDate)
            : null,
          endFollowUpDate: router.query?.endFollowUpDate
            ? endDateFIlter(router.query?.endFollowUpDate)
            : null,
          sourceCatId: router.query?.sourceCatId || null,
          status: router.query?.status
            ? router.query?.status == "all"
              ? null
              : router.query?.status
            : null,
        },
        limit: 50,
        page: router.query?.p ? Number(router.query?.p) : 1,
      },
    });
  }, [session, router]);

  const onApply = async () => {
    router.push(
      {
        pathname: "/userInfo/leads",
        query: {
          ...router?.query,
          p: 1,
          searchTerm: router.query?.searchTerm || null,
          startLeadDate: leadDate.dateA
            ? moment(leadDate.dateA).format()
            : router.query?.startLeadDate || null,
          endLeadDate: leadDate.dateB
            ? moment(leadDate.dateB).format()
            : router.query?.endLeadDate || null,
          startFollowUpDate: followUp.dateA
            ? moment(followUp.dateA).format()
            : router.query?.startFollowUpDate || null,
          endFollowUpDate: followUp.dateB
            ? moment(followUp.dateB).format()
            : router.query?.endFollowUpDate || null,
          //sourceCatId: router.query?.sourceCatId || null,
          sourceCatId: router.query?.sourceCatId
            ? router.query?.status == "all"
              ? null
              : router.query?.sourceCatId
            : null,
          status: router.query?.status
            ? router.query?.status == "all"
              ? null
              : router.query?.status
            : null,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const onClear = () => {
    setLeadDate({ dateA: null, dateB: null });
    setFollowUp({ dateA: null, dateB: null });
    router.push(
      {
        pathname: "/userInfo/leads",
        query: {
          p: 1,
          uid: router?.query?.uid,
          searchTerm: router.query?.searchTerm || null,
          sourceCatId: router.query?.sourceCatId || null,
          status: router.query?.status
            ? router.query?.status == "all"
              ? null
              : router.query?.status
            : null,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const onReset = () => {
    setLeadDate({
      dateA: moment(Date.now()).toISOString(),
      dateB: moment(Date.now()).toISOString(),
    });
    setFollowUp({
      dateA: moment(Date.now()).toISOString(),
      dateB: moment(Date.now()).toISOString(),
    });
    router.push(
      {
        pathname: "/userInfo/leads",
        query: {
          p: 1,
          uid: router?.query?.uid,
          searchTerm: router.query?.searchTerm || null,
          sourceCatId: router.query?.sourceCatId || null,
          status: router.query?.status
            ? router.query?.status == "all"
              ? null
              : router.query?.status
            : null,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSearchInput = async (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value !== null) {
      router.push(
        {
          pathname: "/userInfo/leads",
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
    <UserLayoutComponent session={session} user={user}>
      <MainLayout
        showSearch={false}
        showButton={false}
        showDropdown={false}
        showbtn2={false}
        defaultValue={router.query?.searchTerm as string}
        showDropdown2={false}
        onChange={handleSearchInput}
        btnTitle2="Date Filter"
        onClickBt2={() => {
          setOpenDialogModal(true);
        }}
        dropDownValues2={source}
        dropDownValues={leadStatus}
        selectedDropdownValue={(router.query?.status as string) || "all"}
        selectedDropdownValue2={(router.query?.sourceCatId as string) || "all"}
        onClickBtn={() => {
          //router.push("/leads/addLeads");
        }}
        onChangeDropDown2={(value: any) => {
          router.push(
            {
              pathname: "/userInfo/leads",
              query: {
                ...router.query,
                p: 1,
                sourceCatId: value,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
        onChangeDropDown={(value: any) => {
          router.push(
            {
              pathname: "/userInfo/leads",
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
        btnTitle="+ Add Leads"
        pageTitle="Leads"
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
            onLoadLeadsData={async () => {
              router.push(
                {
                  pathname: "/userInfo/leads",
                  query: {
                    ...router.query,
                    p: 1,
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
            loading={loadingLeads}
            dataRow={dataRow}
            page={router.query?.p ? Number(router.query?.p) : 1}
            onPageChange={(nextPage) => {
              router.push(
                {
                  pathname: "/userInfo/leads",
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

        <DialogModal
          open={openDialogModal}
          onCloseModel={() => setOpenDialogModal(false)}
        >
          <div style={{ paddingInline: "50px" }}>
            <DateRange
              dateType={"User Lead"}
              getStartDate={(date) =>
                setLeadDate({ dateA: date, dateB: leadDate.dateB })
              }
              getEndDate={(date) =>
                setLeadDate({ dateA: leadDate.dateA, dateB: date })
              }
              startDate={
                leadDate.dateA
                  ? leadDate.dateA
                  : router.query?.startLeadDate
                  ? router.query?.startLeadDate
                  : null
              }
              endDate={
                leadDate.dateB
                  ? leadDate.dateB
                  : router.query?.endLeadDate
                  ? router.query?.endLeadDate
                  : null
              }
            />
            <DateRange
              dateType={"Follow up"}
              getStartDate={(date) =>
                setFollowUp({ dateA: date, dateB: followUp.dateB })
              }
              getEndDate={(date) =>
                setFollowUp({ dateA: followUp.dateA, dateB: date })
              }
              startDate={
                followUp.dateA
                  ? followUp.dateA
                  : router.query?.startFollowUpDate
                  ? router.query?.startFollowUpDate
                  : null
              }
              endDate={
                followUp.dateB
                  ? followUp.dateB
                  : router.query?.endFollowUpDate
                  ? router.query?.endFollowUpDate
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
      </MainLayout>
    </UserLayoutComponent>
  );
};

export default nonAuthenticated({ Component: LeadsPage, baseUrl: "/leads" });
