import React from "react";
import BasicCustomerForm from "../../../src/components/forms/customerForm/cifForm";
import { nonAuthenticated } from "../../../src/apollo/hoc/withAuthRedirect";
import AdminLayoutComponent from "../../../src/components/layouts/AdminLayout";

const NewCustomerFormPage: React.FC = (props: any) => {
  const { session } = props;
  return (
    <AdminLayoutComponent session={session}>
      <BasicCustomerForm session={session} />
    </AdminLayoutComponent>
  );
};
 
export default nonAuthenticated({
  Component: NewCustomerFormPage,
  baseUrl: "/orders",
});
