import React from "react";
import BasicOrderForm from "../../../src/components/forms/orderForm/basicForm";
import { nonAuthenticated } from "../../../src/apollo/hoc/withAuthRedirect";
import AdminLayoutComponent from "../../../src/components/layouts/AdminLayout";

const NewOrdersFormPage: React.FC = (props: any) => {
  const { session } = props;
  return (
    <AdminLayoutComponent session={session}>
      <BasicOrderForm session={session} />
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: NewOrdersFormPage,
  baseUrl: "/orders",
});
