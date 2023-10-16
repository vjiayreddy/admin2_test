import React from "react";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";

interface props {
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const useStyles = makeStyles((theme) => ({
  mainSearchBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: 70,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIconBox: {
    padding: theme.spacing(0, 1),
    height: "100%",
    // position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {},
  muiInputBaseRoot: { color: "inherit" },
  muiInputBaseInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    //paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "8ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const SearchComponent: React.FC<props> = ({ onFocus, onBlur, placeholder }) => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.mainSearchBox}>
      <Box component="div" className={classes.searchIconBox}>
        <img
          alt="asset_search_icon"
          src="/icons/search.svg"
          className={classes.searchIcon}
        />
      </Box>
      <Box component="div">
        <InputBase
          placeholder={placeholder ? placeholder : "Search..."}
          classes={{
            root: classes.muiInputBaseRoot,
            input: classes.muiInputBaseInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Box>
    </Box>
  );
};

export default SearchComponent;
