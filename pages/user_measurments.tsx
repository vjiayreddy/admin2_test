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
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
// UI
import AdminLayoutComponent from "../src/components/layouts/AdminLayout";
import MainLayout from "../src/components/layouts/mainLayout";
import InfoDialogComponent from "../src/components/Ui/dialog/infoDialog";
import DataGridComponent from "../src/components/Ui/dataGrid/allUserMeasurmentsGrid";
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

const HomePage: NextPage = (props: any) => {
  const [users, setUsers] = useState([]);
  const router: NextRouter = useRouter();
  const [clientType, setClientType] = useState<any>("client");
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
        // city: !_.isEmpty(user.currentCityName) ? user.currentCityName : "-",
        // country: !_.isEmpty(user.currentCountryName)
        //   ? user.currentCountryName
        //   : "-",
        // state: !_.isEmpty(user.currentStateName) ? user.currentStateName : "-",
        userStatus: !_.isEmpty(user.userStatus) ? user.userStatus : "-",
        customerType: !_.isEmpty(user.customerType) ? user.customerType : "-",
        isStyleClubMember: !_.isEmpty(user.isStyleClubMember)
          ? user.isStyleClubMember
          : "-",
        remarks: !_.isEmpty(user.remarks) ? user.remarks : "-",
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
    // let value = e.target.value;
    // if (value.length > 2) {
    //   let search = await arraySearch(users, value);
    //   setUsers(search);
    // } else {
    //   setUsers(getAllUsersData());
    // }
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
      getUserByFilter({
        variables: {
          limit: 100,
          page: router.query?.p ? Number(router.query?.p) : 1,
          filter: {
            roleFilter: session.user.teams,
            searchTerm: value,
            customerSrNo: searchCustId,
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
            searchTerm: value,
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
          },
        },
      });
    }
  }, [searchCustId]);

  const fliterUsersByClientType = () => {
    let _users: any[] = [];
    if (users?.length > 0) {
      _users =
        clientType === "client"
          ? _.filter(users, (item) => item.customerSrNo !== "-")
          : _.filter(users, (item) => item.customerSrNo === "-");
    }
    return _users;
  };

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
            value: "client",
          },
          {
            name: "Non-Client",
            value: "non-client",
          },
        ]}
        onChangeDropDown={(value) => {
          setClientType(value);
        }}
        showButton={false}
        defaultValue={router.query.search as string}
        onClickBtn={() => {
          setOpenModel(true);
        }}
        btnTitle="+"
        pageTitle="User Measurements"
        showDivider={false}
        onChange={handleSearchInput}
      >
        <div style={{ height: `calc(100vh - 120px)` }}>
          <DataGridComponent
            loading={loading}
            rows={fliterUsersByClientType()}
            page={router.query?.p ? Number(router.query?.p) : 1}
            onPageChange={(nextPage) => {
              router.push(
                {
                  pathname: "/",
                  query: { p: nextPage.page == 0 ? 1 : nextPage.page },
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
