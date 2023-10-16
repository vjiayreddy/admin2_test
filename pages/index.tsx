import React, { Fragment, useEffect, useState } from "react";
import { NextPage } from "next/types";
import _ from "lodash";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// Apollo Hooks
import { nonAuthenticated } from "../src/apollo/hoc/withAuthRedirect";
import {
  GET_ALL_USERS,
  USER_SIGN_UP,
  GET_ALL_USERS_BY_FILTER,
} from "../src/apollo/queries/user";
import { useMutation, useLazyQuery } from "@apollo/client";
// UI
import AdminLayoutComponent from "../src/components/layouts/AdminLayout";
import MainLayout from "../src/components/layouts/mainLayout";
import InfoDialogComponent from "../src/components/Ui/dialog/infoDialog";
import DataGridComponent from "../src/components/Ui/dataGrid";
import AdUserForm from "../src/components/forms/signup";
import moment from "moment";
import { NextRouter, useRouter } from "next/router";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

const useDebounce = (time, initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const [values] = useState(() => new Subject());
  useEffect(() => {
    const sub = values.pipe(debounceTime(time)).subscribe(setValue);
    return () => sub.unsubscribe();
  }, [time, values]);
  return [value, (v) => values.next(v)];
};
// const SortByEnum = {
//   REGISTERED_DATE: "REGISTERED_DATE",
//   LAST_UPDATED: "LAST_UPDATED",
//   CC_DUE_DATE: "CC_DUE_DATE",
// };

const HomePage: NextPage = (props: any) => {
  const [users, setUsers] = useState([]);
  const router: NextRouter = useRouter();
  const [clientType, setClientType] = useState<any>(true);
  const [_sortByEnum, setSortByEnum] = useState<any>(null);

  const [value, setValue] = useDebounce(500, null);
  const [searchCustId, setSearchCustId] = useDebounce(500, null);

  // const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [getUserByFilter, { data: filterData, loading, error: errorData }] =
    useLazyQuery(GET_ALL_USERS_BY_FILTER);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const { session } = props;

  const [RregisterUser, { loading: loadingSignUp }] = useMutation(
    USER_SIGN_UP,
    {
      onCompleted(data) {
        if (!_.isEmpty(data)) {
          alert("User created successfully");
          setOpenModel(false);
        }
      },
      refetchQueries: [
        {
          query: GET_ALL_USERS,
        },
      ],
    }
  );

  const getAllUsersData = () => {
    const { getUsersByFilter } = filterData;
    let allusers = [];
    getUsersByFilter.map((user, index) => {
      allusers.push({
        userId: user._id,
        id: user._id,
        cno: user.customerSrNo || "-",
        fullName: `${user.firstName} ${user.lastName}`,
        phone: !_.isEmpty(user.countryCode)
          ? `+${user.countryCode.replace("+", "")} ${user.phone}`
          : user.phone,
        email: user.email,
        registred: moment(user.createdAt).format("MMM Do YYYY"),
        stylist: !_.isEmpty(user.stylist) ? user.stylist[0].name : "-",
        cityName: !_.isEmpty(user.cityName) ? user.cityName : "-",
        countryName: !_.isEmpty(user.countryName) ? user.countryName : "-",
        stateName: !_.isEmpty(user.stateName) ? user.stateName : "-",
        userStatus: !_.isEmpty(user.userStatus) ? user.userStatus : "-",
        customerType: !_.isEmpty(user.customerType) ? user.customerType : "-",
        isStyleClubMember: !_.isEmpty(user.isStyleClubMember)
          ? user.isStyleClubMember
          : "-",
        customerSegment: !_.isEmpty(user.customerSegment)
          ? user.customerSegment
          : "-",
        remarks: !_.isEmpty(user.remarks) ? user.remarks : "-",
        secondaryStylists: !_.isEmpty(user.secondaryStylists)
          ? _.map(user.secondaryStylists, "name").join(",")
          : "-",
        lastUpdatedAt: !_.isEmpty(user?.lastUpdatedAt?.timestamp)
          ? moment(user?.lastUpdatedAt?.timestamp).format("MMM Do YYYY")
          : "-",
        ccDueDate: !_.isEmpty(user?.ccDueDate?.timestamp)
          ? moment(user?.ccDueDate?.timestamp).format("MMM Do YYYY")
          : "-",
      });
    });
    return allusers;
  };

  const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase();
    const searchPhone = new RegExp(keyword);
    const cusId = new RegExp(keyword);
    return array.filter((value) => {
      return (
        value.fullName.toLowerCase().match(new RegExp(searchTerm, "g")) ||
        searchPhone.test(value.phone) ||
        cusId.test(value.cno)
      );
    });
  };

  const handleSearchInput = async (e) => {
    setValue(e.target.value);
  };

  // customerId

  const handleCustIdSearchInput = async (e) => {
    setSearchCustId(Number(e.target.value));
  };

  useEffect(() => {
    if (filterData) {
      setUsers(getAllUsersData());
    }
  }, [filterData]);

  useEffect(() => {
    if (session) {
      let _isClient = null;

      if (!_.isEmpty(router?.query?.isClient)) {
        if (router?.query?.isClient === "true") {
          setClientType(true);
          _isClient = true;
        } else {
          _isClient = false;
          setClientType(false);
        }
      }
      setSortByEnum(router?.query?.sortByEnum);
      getUserByFilter({
        variables: {
          limit: 100,
          page: router.query?.p ? Number(router.query?.p) : 1,
          filter: {
            roleFilter: session.user.teams,
            searchTerm: value,
            customerSrNo: searchCustId,
            isClient: _isClient !== null ? _isClient : true,
            sortByEnum: router?.query?.sortByEnum || null,
          },
        },
      });
    }
  }, [session, router]);

  useEffect(() => {
    if (value !== null) {
      getUserByFilter({
        variables: {
          limit: 100,
          page: 1,
          filter: {
            roleFilter: session.user.teams,
            customerSrNo: searchCustId,
            searchTerm: value,
            isClient: clientType,
          },
        },
      });
    }
  }, [value]);

  // for searching cust Id

  useEffect(() => {
    if (searchCustId !== null) {
      getUserByFilter({
        variables: {
          limit: 100,
          page: 1,
          filter: {
            roleFilter: session.user.teams,
            customerSrNo: searchCustId,
            searchTerm: value,
            isClient: clientType,
          },
        },
      });
    }
  }, [searchCustId]);

  return (
    <AdminLayoutComponent session={session}>
      <MainLayout
        showCoustmerIdSearch={true}
        defaultCustomerSearchValue={" "}
        onChaneCustomerSearch={handleCustIdSearchInput}
        showSearch={true}
        showDropdown={true}
        selectedDropdownValue={clientType}
        dropDownValues={[
          {
            name: "Client",
            value: true,
          },
          {
            name: "Non-Client",
            value: false,
          },
        ]}
        onChangeDropDown={(_value) => {
          router.push(
            {
              pathname: "/",
              query: {
                ...router.query,
                p: 1,
                isClient: _value,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
        showButton={true}
        defaultValue={router.query.search as string}
        onClickBtn={() => {
          setOpenModel(true);
        }}
        showDropdown2={true}
        dropDownValues2={[
          {
            name: "Sort By Registerd Date",
            value: "REGISTERED_DATE",
          },
          {
            name: "Sort By Last Updated",
            value: "LAST_UPDATED",
          },
          {
            name: "Sort By CC Due Date",
            value: "CC_DUE_DATE",
          },
        ]}
        selectedDropdownValue2={_sortByEnum}
        onChangeDropDown2={(_value: any) => {
          router.push(
            {
              pathname: "/",
              query: {
                ...router.query,
                p: 1,
                sortByEnum: _value,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
        btnTitle="+"
        pageTitle="All Users List"
        showDivider={false}
        onChange={handleSearchInput}
      >
        <div style={{ height: `calc(100vh - 120px)` }}>
          <DataGridComponent
            loading={loading}
            rows={users}
            page={router.query?.p ? Number(router.query?.p) : 1}
            onPageChange={(nextPage) => {
              setClientType(clientType);
              router.push(
                {
                  pathname: "/",
                  query: {
                    p: nextPage.page == 0 ? 1 : nextPage.page,
                    isClient: clientType,
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
          />
        </div>
      </MainLayout>
      <InfoDialogComponent
        onCloseModel={() => {
          setOpenModel(false);
        }}
        open={openModel}
      >
        <Box pt={3} pl={3} pr={3} pb={2}>
          <Typography variant="h6" component="h6">
            Create a New User
          </Typography>
        </Box>
        <Divider />
        <Box p={3}>
          <AdUserForm
            mobileNumber={null}
            cCode={null}
            onClickSubmit={async (data) => {
              await RregisterUser({
                variables: {
                  ...data,
                  fullName: `${data.firstName}${data.lastName}`,
                },
              });
            }}
            isSubmitting={loadingSignUp}
          />
        </Box>
      </InfoDialogComponent>
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({ Component: HomePage });
