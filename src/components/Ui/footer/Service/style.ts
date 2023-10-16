import makeStyles from "@material-ui/core/styles/makeStyles";
import { colors } from "../../../../../settings/colors";

const useStyles = makeStyles((theme) => ({
  footerServiceTitle: {
    color: theme.palette.common.white,
  },
  footerServiceSubTitle: {
    color: colors.FOOTER_LINK_TITLE,
    fontSize: 13,
    lineHeight: "18px",
  },
}));
export default useStyles;
