import React, { Fragment, useEffect, useState } from "react";
import { NextPage } from "next/types";
import _ from "lodash";
// Apollo Hooks
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import {
  GET_ALL_USERS,
  USER_SIGN_UP,
  GET_ALL_USERS_BY_FILTER,
} from "../../src/apollo/queries/user";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
// UI
import MainLayout from "../../src/components/layouts/mainLayout";
import AdminLayoutComponent from "../../src/components/layouts/AdminLayout";
import DataGridComponent from "../../src/components/Ui/dataGrid/index";
import moment from "moment";
import { Grid, Tabs, Tab, makeStyles } from "@material-ui/core";
import {
  getAllUsersData,
  getAllRegistreUserdData,
  getPaidUserData,
} from "../../src/services/users";

const useStyles = makeStyles((theme) => ({
  tabRoot: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const HomePage: NextPage = (props: any) => {
  const [users, setUsers] = useState([]);
  const { session } = props;
  // const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [getUserByFilter, { data, loading, error: errorData }] = useLazyQuery(
    GET_ALL_USERS_BY_FILTER
  );
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();

  const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase();
    const searchPhone = new RegExp(keyword);
    const cusId = new RegExp(keyword);

    return array.filter((value) => {
      return (
        value.fullName.toLowerCase().match(new RegExp(searchTerm, "g")) ||
        searchPhone.test(value.phone) ||
        cusId.test(value.cno) ||
        value.email.toLowerCase().match(new RegExp(searchTerm, "g"))
      );
    });
  };

  const handleSearchInput = async (e) => {
    let value = e.target.value;
    if (value.length > 2) {
      let search = await arraySearch(users, value);
      setUsers(search);
    } else {
      if (tabIndex === 0) {
        setUsers(getAllUsersData(data));
      } else if (tabIndex === 1) {
        setUsers(getAllRegistreUserdData(data));
      } else {
        setUsers(getPaidUserData(data));
      }
    }
  };

  useEffect(() => {
    if (data) {
      setUsers(getAllUsersData(data));
    }
  }, [data]);

  useEffect(() => {
    if (session) {
      getUserByFilter({
        variables: {
          filter: {
            roleFilter: session.user.teams,
          },
        },
      });
    }
  }, []);

  return (
    <AdminLayoutComponent session={session}>
      <MainLayout
        showSearch={true}
        pageTitle="Styleclub Users"
        showDivider={false}
        onChange={handleSearchInput}
      >
        <div style={{ height: `calc(100vh - 120px)` }}>
          <Tabs
            classes={{ root: classes.tabRoot }}
            indicatorColor="primary"
            value={tabIndex}
            onChange={(e, index) => {
              if (index === 0) {
                setUsers(getAllUsersData(data));
              } else if (index === 1) {
                setUsers(getAllRegistreUserdData(data));
              } else {
                setUsers(getPaidUserData(data));
              }
              setTabIndex(index);
            }}
          >
            <Tab label="All Users" />
            <Tab label="Registered" />
            <Tab label="Paid" />
          </Tabs>
          {tabIndex === 0 && (
            <DataGridComponent loading={loading} rows={users} />
          )}
          {tabIndex === 1 && (
            <DataGridComponent loading={loading} rows={users} />
          )}
          {tabIndex === 2 && (
            <DataGridComponent loading={loading} rows={users} />
          )}
        </div>
      </MainLayout>
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({ Component: HomePage, baseUrl: "/styleclub" });
