import makeStyles from "@material-ui/core/styles/makeStyles";
import { colors } from "../../../../../settings/colors";
const useStyles = makeStyles((theme) => ({
  contactLbl: {
    fontSize: 13,
    lineHeight: "18px",
  },
  locationIcon: {
    width: 18,
    height: 18,
    color: colors.FONT_COLOT_LITE,
  },
}));
export default useStyles;
