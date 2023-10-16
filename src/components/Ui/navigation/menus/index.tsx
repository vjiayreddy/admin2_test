import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { NextRouter, useRouter } from "next/router";

// Utils
import { NavgationMenu } from "../../../../utils/mockData";
import { getActiveMenu } from "../../../../utils/navigation";

interface props {}

const useStyles = makeStyles((theme: any) => ({
  muiTabRoot: {
    height: 70,
    fontWeight: 900,
  },
}));
const MenusComponent: React.FC<props> = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState<number | boolean>(false);
  const router: NextRouter = useRouter();

  useEffect(() => {
    setTabIndex(getActiveMenu());
  }, [router]);

  return (
    <Box
      pl={3}
      pr={3}
      flexGrow={1}
      component="section"
      id="mpf-app-user-actions"
    >
      <Tabs
        variant="standard"
        scrollButtons="auto"
        value={tabIndex}
        onChange={(e,index) => {
        }}
        aria-label="mpf-app-root-navigation"
      >
        {NavgationMenu.map((menu, index) => (
          <Tab
            key={index}
            classes={{ root: classes.muiTabRoot }}
            label={menu}
            id="tab-1"
          />
        ))}
      </Tabs>
    </Box>
  );
};
export default MenusComponent;
