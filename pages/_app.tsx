import React from "react";

// Utils
import theme from "../settings/theme";
import "../styles/globals.scss";
import "@fontsource/roboto";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//MIUI
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

// Apollo Client
import { ApolloProvider, useQuery } from "@apollo/client";
import { apolloClient } from "../src/apollo/withApollo";
import { useSession } from "next-auth/client";

// Hooks
import useRouterScroll from "../src/utils/hooks/useRouterScroll";

// Components
import DrawerLayoutComponent from "../src/components/layouts/DrawerLayout";

const MyApp = ({ Component }) => {
  useRouterScroll();
  const [session, loading] = useSession();
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          {/* <DrawerLayoutComponent session={session}> */}
          <Component session={session} loading={loading} />
          {/* </DrawerLayoutComponent> */}
        </ApolloProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default MyApp;
