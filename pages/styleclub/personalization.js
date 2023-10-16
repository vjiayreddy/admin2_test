import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import _ from "lodash";
// Apollo
import { useQuery } from "@apollo/client";
import {
  GET_USER_PERSONALIZEFORM,
  GET_FORM_SUMMARY,
} from "../../src/apollo/queries/styleclub";
import { useRouter } from "next/router";
// Ui
import LoadingIndicatorComponent from "../../src/components/Ui/loading";
import PersonalizeFormComponent from "../../src/components/forms/personalize";
import UserLayoutComponent from "../../src/components/layouts/UserLayout";
// Styles

const PersonalizationFormPage = (props) => {
  const { session, user } = props;
  const router = useRouter();
  const { data: { getPersonalizeForm } = {} } = useQuery(
    GET_USER_PERSONALIZEFORM,
    {
      variables: {
        Id: router.query.formId,
        userId: router.query.uid,
        isEdit: true,
      },
      skip: _.isEmpty(router.query.formId) || _.isEmpty(router.query.uid),
    }
  );

  return (
    <UserLayoutComponent session={session} user={user}>
      {user.loading ? (
        <LoadingIndicatorComponent height={null} />
      ) : (
        <Fragment>
          {!_.isEmpty(user.data) && !_.isEmpty(session) ? (
            <Box p={1.5}>
              {!_.isEmpty(getPersonalizeForm) && (
                <PersonalizeFormComponent
                  user={user.data}
                  userInfo={{
                    qusIndex: router.query.formIndex,
                    userId: router.query.uid,
                    formId: router.query.formId,
                  }}
                  formData={getPersonalizeForm}
                />
              )}
            </Box>
          ) : (
            <div>No Data</div>
          )}
        </Fragment>
      )}
    </UserLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: PersonalizationFormPage,
  baseUrl: "/styleclub",
});
