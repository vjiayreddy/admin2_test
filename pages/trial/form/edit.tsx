import React from "react";
import EditTrailForm from "../../../src/components/forms/trailForm/edit";
import { nonAuthenticated } from "../../../src/apollo/hoc/withAuthRedirect";
import AdminLayoutComponent from "../../../src/components/layouts/AdminLayout";

const NewOrdersFormPage: React.FC = (props: any) => {
  const { session } = props;
  return (
    <AdminLayoutComponent session={session}>
      <EditTrailForm session={session} />
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: NewOrdersFormPage,
  baseUrl: "/orders",
});
