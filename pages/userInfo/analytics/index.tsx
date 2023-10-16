import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

// Apollo
import { nonAuthenticated } from "../../../src/apollo/hoc/withAuthRedirect";

// Ui Component
import UserLayoutComponent from "../../../src/components/layouts/UserLayout";
const useStyles = makeStyles((theme) => ({
  tabRoot: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const UserAnalytics = (props) => {
  const { session, user } = props;
  return (
    <UserLayoutComponent session={session} user={user}>
      <Box p={2}>
        <Typography variant="h6">Analytics</Typography>
        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Card>
                <CardContent>
                  <Grid container alignItems="center" direction="column" justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h6">No.Clients</Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="h1">1000</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button>View</Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card>
                <CardContent>
                  <Grid container alignItems="center" direction="column" justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h6">No.Non-Clients</Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="h1">1000</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button>View</Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card>
                <CardContent>
                  <Grid container alignItems="center" direction="column" justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h6">No.Orders</Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="h1">1000</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button>View</Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </UserLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: UserAnalytics,
  baseUrl: "/userInfo",
});
