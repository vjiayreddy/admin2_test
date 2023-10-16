import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  mainServiceCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
  },
  footerAnchorLink: {
    ...theme.typography.subtitle2,
    color: theme.palette.common.white,
    fontSize: 13,
    lineHeight: "25px",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));
export default useStyles;
