import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme: any) => ({
  mainFashionBox: {
    ...theme.utils.section,
  },
  sectionSubTitle: {
    fontSize: 18,
    lineHeight: "30px",
  },
}));

export default useStyles;
