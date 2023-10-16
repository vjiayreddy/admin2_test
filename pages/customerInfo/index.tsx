import React, { useEffect, useState } from "react";
import CustomerInfoFormGridComponent from "../../src/components/Ui/dataGrid/customerInfoFormGrid";
import MainLayout from "../../src/components/layouts/mainLayout";
import { useRouter } from "next/router";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { CustomerInfoFormGridRow } from "../../src/utils/interfaces";
import _ from "lodash";
import moment from "moment";
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import AdminLayoutComponent from "../../src/components/layouts/AdminLayout";
import { GET_ALL_CIF_LIST } from "../../src/apollo/queries/customerinfo";
import { useLazyQuery } from "@apollo/client";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

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

const CustomerForm: React.FC = (props: any) => {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = useDebounce(1500, null);
  const { session } = props;
  const [rowsData, setRowsData] = useState<CustomerInfoFormGridRow[]>([]);
  const [GetAllCustomerInformationList, { data, error, loading }] =
    useLazyQuery(GET_ALL_CIF_LIST);
 



  useEffect(() => {
    if (!_.isEmpty(data?.getAllCustomerInformationList)) {
      let _rowData = [];
      const { customers } = data?.getAllCustomerInformationList;
      if (customers?.length > 0) {
        customers.map((customer) => {
          _rowData.push({
            _id: customer._id,
            id: customer._id,
            firstName: customer.firstName,
            customerId: customer?.customerSerialNo,
            formNo: customer?.cifSerialNumber,
            lastName: customer.lastName,
            eventDate: !_.isEmpty(customer.eventDate)
              ? moment(customer.eventDate.timestamp).format("DD-MMM-YYYY")
              : "-",
            createdDate: !_.isEmpty(customer.createdDate)
              ? moment(customer.createdDate.timestamp).format("DD-MMM-YYYY")
              : "-",
            eventType: customer?.eventType,
            phone: `+${customer?.countryCode}-${customer.phone}`,
            lookingFor: customer.lookingFor,
            sourceCatId: customer.sourceCatId,
            sourceSubCatId: customer.sourceSubCatId,
            source: !_.isEmpty(customer.source)
              ? customer.source?.[0].name
              : "",
            stylist: !_.isEmpty(customer.stylist)
              ? customer.stylist[0].name
              : "-",
            customerInfoStatus: customer.customerInfoStatus,
            note: customer.note,
            serverData:customer
            
          });
        });
      }
      setRowsData(_rowData);
    }
  }, [data]);

 
  useEffect(() => {
    GetAllCustomerInformationList({
      variables: {
        filter: {
          searchTerm: router.query?.searchTerm || "",
        },
        page: router.query?.p ? Number(router.query?.p) : 1,
        limit: 200,
        
      },
    });
  }, [session, router]);


  const handleSearchInput = async (e) => {
    setValue(e.target.value);
    
  };
  useEffect(() => {
    if (value !== null) {
      router.push(
        {
          pathname: "/customerInfo",
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
        showDropdown={false}
        showButton={true}
        defaultValue={router.query?.searchTerm as string}
        btnTitle="+ Add Customer Info"
        pageTitle="Customer Information"
        onClickBtn={() => {
          router.push("/customerInfo/form");
        }}
        onChange={handleSearchInput}
        showDivider={false}
      >
        <div
          style={{
            height: `calc(100vh - 170px)`,
            overflowY: "scroll",
            width: "100%",
          }}
        >
          <CustomerInfoFormGridComponent
            rows={rowsData}
            loading={loading}
            paginationMode="server"
            page={router.query?.p ? Number(router.query?.p) : 1}
            onPageChange={(nextPage) => {
              router.push(
                {
                  pathname: "/customerInfo",
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
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: CustomerForm,
  baseUrl: "/orders",
});
