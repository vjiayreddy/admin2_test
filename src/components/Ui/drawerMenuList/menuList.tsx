import React, { FC, Fragment, useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Shipping from "@material-ui/icons/LocalShipping";
import { useRouter } from "next/router";
import _ from "lodash";
import Tooltip from "@material-ui/core/Tooltip";
// Utils

// Styles
import useStyles from "./styles";
interface authData {
  currentUser?: any;
  stylist?: any;
}

interface props {
  authData?: authData;
  session?: any;
}
interface menuListProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  iconUrl: string;
}

const DrawerMenuListComponent: FC<props> = ({ authData, session }) => {
  const classes = useStyles();
  const router = useRouter();

  const MenuListItem: FC<menuListProps> = ({ title, onClick, iconUrl }) => {
    const classes = useStyles();
    return (
      <ListItem button onClick={onClick}>
        <ListItemIcon>
          <img width={30} src={iconUrl} />
        </ListItemIcon>
        <ListItemText
          primary={title}
          classes={{ primary: classes.primaryMenuListText }}
        />
      </ListItem>
    );
  };

  return (
    <List classes={{ root: classes.listRoot }}>
      {session && !_.isEmpty(authData) && (
        <Fragment>
          {/* Basic Info */}
          <ListItem
            button
            onClick={() => {
              router.push(`/userInfo?uid=${router.query.uid}`);
            }}
          >
            <Tooltip title="Basic Info" aria-label="basic-info">
              <ListItemIcon>
                <img width={30} src="/icons/basic_info.svg" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Basic Info"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Lead */}
          <ListItem
            button
            onClick={() => {
              router.push(`/userInfo/leads?uid=${router.query.uid}`);
            }}
          >
            <Tooltip title="Lead" aria-label="lead">
              <ListItemIcon>
                <img width={30} src="/icons/leads.svg" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Lead"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Appointments */}
          <ListItem
            button
            onClick={() => {
              router.push(`/userInfo/appointments?uid=${router.query.uid}`);
            }}
          >
            <Tooltip title="Appointments" aria-label="appointments">
              <ListItemIcon>
                <img width={30} src="/icons/appointments.svg" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Appointments"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Style Profile */}
          <ListItem
            button
            onClick={() => {
              router.push(`/styleclub?uid=${router.query.uid}`);
            }}
          >
            <Tooltip title="Style Profile" aria-label="style-profile">
              <ListItemIcon>
                <img width={30} src="/icons/style_profile.svg" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Style Profile"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Style Recommendation */}
          <ListItem
            button
            onClick={() => {
              router.push(`/recommendation?uid=${router.query.uid}`);
            }}
          >
            <Tooltip
              title="Style Recommendation"
              aria-label="style-recommendation"
            >
              <ListItemIcon>
                <img width={30} src="/icons/style_rec.svg" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Style Recommendation"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Orders */}
          <ListItem
            button
            onClick={() => {
              router.push(`/userInfo/orders?uid=${router.query.uid}`);
            }}
          >
            <Tooltip title="Orders" aria-label="orders">
              <ListItemIcon>
                <img width={30} src="/icons/orders.svg" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Orders"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Measurements */}
          <ListItem
            button
            onClick={() => {
              router.push(`/measurements?uid=${router.query.uid}`);
            }}
          >
            <Tooltip title="Measurements" aria-label="measurements">
              <ListItemIcon>
                <img width={30} src="/icons/measurments.svg" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Measurements"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Standard Size */}
          <ListItem
            button
            onClick={() => {
              router.push(`/standardsize?uid=${router.query.uid}`);
            }}
          >
            <Tooltip title="Standard Size" aria-label="standard-size">
              <ListItemIcon>
                <img width={32} src="/icons/sizing.png" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Standard Size"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Tracking*/}
          <ListItem
            button
            onClick={() => {
              router.push(
                `/userInfo/orders/track-order?uid=${router.query.uid}`
              );
            }}
          >
            <Tooltip title="Tracking" aria-label="tracking">
              <ListItemIcon>
                <img width={30} src="/icons/order_tracking.svg" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Tracking"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Quality Check*/}
          <ListItem
            button
            onClick={() => {
              router.push(`/userInfo/qualitycheck?uid=${router.query.uid}`);
            }}
          >
            <Tooltip title="Quality Check" aria-label="quality-check">
              <ListItemIcon>
                <img width={30} src="/icons/quality_check.svg" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Quality Check"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Trail*/}
          <ListItem
            button
            onClick={() => {
              router.push(`/userInfo/trial?uid=${router.query.uid}`);
            }}
          >
            <Tooltip title="Trail" aria-label="trail">
              <ListItemIcon>
                <img width={30} src="/icons/trail.svg" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Trail"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* <MenuListItem
            title="Trail"
            iconUrl="/icons/trail.svg"
            onClick={() => {
              router.push(`/userInfo/trial?uid=${router.query.uid}`);
            }}
          /> */}
        </Fragment>
      )}
    </List>
  );
};

export default DrawerMenuListComponent;
