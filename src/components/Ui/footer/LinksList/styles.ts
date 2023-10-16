import makeStyles from "@material-ui/core/styles/makeStyles";
import { colors } from "../../../../../settings/colors";

const useStyles = makeStyles((theme) => ({
  footerLinksTitle: {
    color: colors.FOOTER_LINK_TITLE,
    marginBottom: 10,
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
