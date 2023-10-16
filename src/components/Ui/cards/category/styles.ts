import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  categoryCard: {
    width: "100%",
    minHeight: 250,
    backgroundColor: theme.palette.common.white,
    padding: 10,
    border: `1px solid #eeeeee`,
  },
  categoryCardImage: {
    minHeight: 200,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryCardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: 15,
  },
  categoryCardTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  categoryButton: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 0,
    marginTop: 0,
    fontSize: 12,
  },
}));

export default useStyles;
