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
}

const AdminMenuList: FC<props> = ({ session }) => {
  const classes = useStyles();
  const router = useRouter();

  const MenuListItem: FC<menuListProps> = ({ title, onClick }) => {
    const classes = useStyles();
    return (
      <ListItem button onClick={onClick}>
        <ListItemText
          primary={title}
          classes={{ primary: classes.primaryMenuListText }}
        />
      </ListItem>
    );
  };

  return (
    <List classes={{ root: classes.listRoot }}>
      {session && (
        <Fragment>

          {/* All Users */}
          <ListItem
            button
            onClick={() => {
              router.push("/");
            }}
          >
              <Tooltip title=" All Users" aria-label="all-users">
            <ListItemIcon>
              <img width={30} src="/icons/all_users.svg" />
            </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="All Users"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Leads */}
          <ListItem
            button
            onClick={() => {
              router.push("/leads");
            }}
          >
             <Tooltip title="Leads" aria-label="leads">
            <ListItemIcon>
              <img width={30} src="/icons/leads.svg" />
            </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Leads"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

      

           {/* Appointments */}
          <ListItem
            button
            onClick={() => {
              router.push("/appointment");
            }}
          >
             <Tooltip title=" Appointments" aria-label="appointments">
            <ListItemIcon>
              <img width={30} src="/icons/appointments.svg" />
            </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Appointments"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

              
          {/* Customer Info Form */}
          <ListItem
            button
            onClick={() => {
              router.push("/customerInfo");
            }}
          >
             <Tooltip title=" Customer Info Form" aria-label="customer-info-form">
            <ListItemIcon>
              <img width={30} src="/icons/CIF.png" />
            </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Customer Info Form"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

           {/* Orders */}
          <ListItem
            button
            onClick={() => {
              router.push("/orders");
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
              router.push("/user_measurments");
            }}
          >
             <Tooltip title=" Measurements" aria-label="measurements">
            <ListItemIcon>
              <img width={30} src="/icons/measurments.svg" />
            </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Measurements"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          
         {/* Tracking */}
          <ListItem
            button
            onClick={() => {
              router.push("/orders/track-order");
            }}
          > 
          <Tooltip title=" Tracking" aria-label="tracking">
            <ListItemIcon>
              <img width={30} src="/icons/order_tracking.svg" />
            </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Tracking"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

  
         {/* Quality Check */}
          <ListItem
            button
            onClick={() => {
              router.push("/qualitycheck");
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

 {/* Trail */}
          <ListItem
            button
            onClick={() => {
              router.push("/trial");
            }}
          >
             <Tooltip title=" Trail" aria-label="trail">
            <ListItemIcon>
              <img width={30} src="/icons/trail.svg" />
            </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Trail"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>

          {/* Analytics */}
          <ListItem
            button
            onClick={() => {
              router.push("/analytics");
            }}
          >
             <Tooltip title="Analytics" aria-label="analytics">
            <ListItemIcon>
              <img width={30} src="/icons/anylaitics.svg" />
            </ListItemIcon>
            </Tooltip>
            <ListItemText
              primary="Analytics"
              classes={{ primary: classes.primaryMenuListText }}
            />
          </ListItem>
        
        </Fragment>
      )}
    </List>
  );
};

export default AdminMenuList;
