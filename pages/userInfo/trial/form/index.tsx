import React, { useState } from "react";
import TrailForm from "../../../../src/components/forms/trailForm/basicForm";
import { nonAuthenticated } from "../../../../src/apollo/hoc/withAuthRedirect";
import AdminLayoutComponent from "../../../../src/components/layouts/AdminLayout";

const NewOrdersFormPage: React.FC = (props: any) => {
  const { session } = props;
  return (
    <AdminLayoutComponent session={session}>
      <TrailForm session={session} />
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: NewOrdersFormPage,
  baseUrl: "/orders",
});
