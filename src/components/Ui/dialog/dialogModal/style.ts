// @ts-check
/** @type {{search: React.CSSProperties}} */

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme: any) => ({
  dialogModelRoot: {
    zIndex: 10000,
  },
  paperFullWidth: {
    margin: 0,
    position: "relative",
    minHeight:200,
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      height: "100vh",
      maxHeight: "100%",
    },
  },
  modelCloseIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

export default useStyles;
