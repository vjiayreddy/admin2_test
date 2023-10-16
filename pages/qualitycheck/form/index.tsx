import React from "react";
import { nonAuthenticated } from "../../../src/apollo/hoc/withAuthRedirect";
import AdminLayoutComponent from "../../../src/components/layouts/AdminLayout";
import QualityCheckForm from "../../../src/components/forms/qualityCheckForm";

const NewOrdersFormPage: React.FC = (props: any) => {
  const { session } = props;
  return (
    <AdminLayoutComponent session={session}>
      <QualityCheckForm />
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: NewOrdersFormPage,
  baseUrl: "/orders",
});
