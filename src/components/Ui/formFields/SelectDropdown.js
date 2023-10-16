import React from "react";
import { makeStyles, InputBase, Select, MenuItem } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

const SelectDropDown = ({
  id,
  value,
  onChange,
  options,
  width,
  height,
  disabled,
  isError
}) => {
  const useStyles = makeStyles((theme) => ({
    selectIcon: {
      marginRight: 5,
    },
    inputBaseRoot: {
      height: height ? height : 40,
      width: width ? width : "100%",
      ...theme.typography.h3,
      borderRadius: 4,
      // borderTopRightRadius: 2,
      // borderBottomRightRadius: 2,
      position: "relative",
      border: `1px solid #D4D9E5`,
      backgroundColor: theme.palette.background.paper,
      // borderTop: `1px solid ${theme.palette.common.COLOR_D4D9E5}`,
      // borderBottom: `1px solid ${theme.palette.common.COLOR_D4D9E5}`,
      // borderRight: `1px solid ${theme.palette.common.COLOR_D4D9E5}`,
      fontSize: 14,
      fontWeight: 900,
      padding: "10px",
      [theme.breakpoints.only("xs")]: {
        padding: "5px",
        //fontSize:10
      },
      "&:focus": {
        borderRadius: 2,
        borderColor: "#D4D9E5",
        backgroundColor: theme.palette.background.paper,
      },
    },
    muiMenuPaper: {
      backgroundColor: theme.palette.common.white,
      //minHeight: 100,
      boxShadow: `0 9px 19px 0 rgba(84,103,166,0.23)`,
      borderRadius: `2px 2px 4px 4px`,
      border: `1px solid #D4D9E5`,
      marginTop: 1,
    },
    muiMenuItem: {
      ...theme.typography.h3,
      fontSize: 14,
      fontWeight: 500,
      color: `#686868`,
      minHeight: 35,
    },
    muiMenuSelected: {
      backgroundColor: `${fade("#91A1C6", 0.2)}!important`,
    },
  }));

  const classes = useStyles();

  return (
    <Select
      id={id}
      value={value}
      classes={{ icon: classes.selectIcon }}
      onChange={onChange}
      disabled={disabled}
      style={{ border: isError ? "1px solid red" : "" }}
      MenuProps={{
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        classes: {
          paper: classes.muiMenuPaper,
          list: classes.muiMenulist,
        },
      }}
      input={<InputBase classes={{ root: classes.inputBaseRoot }} />}
    >
      {options.map((item, index) => (
        <MenuItem
          key={index}
          classes={{
            root: classes.muiMenuItem,
            selected: classes.muiMenuSelected,
          }}
          dense={false}
          value={item.value}
        >
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectDropDown;
