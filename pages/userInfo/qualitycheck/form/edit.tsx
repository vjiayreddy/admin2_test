import React from "react";
import { nonAuthenticated } from "../../../../src/apollo/hoc/withAuthRedirect";
import AdminLayoutComponent from "../../../../src/components/layouts/AdminLayout";
import EditQualityCheckForm from "../../../../src/components/forms/qualityCheckForm/edit";

const NewOrdersFormPage: React.FC = (props: any) => {
  const { session } = props;
  return (
    <AdminLayoutComponent session={session}>
      <EditQualityCheckForm />
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: NewOrdersFormPage,
  baseUrl: "/orders",
});
